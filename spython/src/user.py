import aiomysql
from typing import Optional
from config import db_config


class User:
    def __init__(self, username: str, pfp: str, email: str, password: str, id_local: Optional[int] = None):
        self.username = username
        self.pfp = pfp
        self.email = email
        self.password = password
        self.id_local = id_local
        self.id_usr = None
        self._insert()

    async def _insert(self) -> bool:
        """Insert the user into the database."""
        query = """
        INSERT INTO users (username, pfp, email, password, id_local)
        VALUES (%s, %s, %s, %s, %s);
        """

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (self.username, self.pfp, self.email, self.password, self.id_local))
                    if cursor.lastrowid:
                        self.id_usr = cursor.lastrowid
                        return True
                    return False

    @staticmethod
    async def login(email: str, password: str) -> 'User':
        """Login using email and password."""
        query = "SELECT * FROM users WHERE email = %s AND password = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query, (email, password))
                    user_data = await cursor.fetchone()
                    if user_data:
                        return User(**user_data)
                    raise ValueError("Invalid credentials.")

    async def change_username(self, new_username: str) -> bool:
        """Change the username of the user."""
        self.username = new_username
        query = "UPDATE users SET username = %s WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (new_username, self.id_usr))
                    return True

    async def change_profile_picture(self, new_pfp: str) -> bool:
        """Change the profile picture of the user."""
        self.pfp = new_pfp
        query = "UPDATE users SET pfp = %s WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (new_pfp, self.id_usr))
                    return True

    async def change_password(self, old_pass: str, new_pass: str) -> bool:
        """Change the password of the user."""
        if self.password != old_pass:
            raise ValueError("Old password is incorrect.")

        self.password = new_pass
        query = "UPDATE users SET password = %s WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (new_pass, self.id_usr))
                    return True

    async def set_location(self, location: 'Location') -> bool:
        """Assign a location to the user."""
        self.id_local = location.id_local
        query = "UPDATE users SET id_local = %s WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (location.id_local, self.id_usr))
                    return True
