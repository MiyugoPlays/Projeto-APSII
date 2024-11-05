import aiomysql
from typing import List
from config import db_config
from user import User


class Administrator:
    def __init__(self, user: 'User'):
        self.user = user

    async def view_user(self, usr_id: int, db_config: dict) -> 'User':
        """View user by ID."""
        query = "SELECT * FROM users WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query, (usr_id,))
                    user_data = await cursor.fetchone()
                    return User(**user_data)

    async def suspend_user(self, usr_id: int, reason: str, db_config: dict) -> bool:
        """Suspend user."""
        query = "UPDATE users SET suspended = 1, suspension_reason = %s WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (reason, usr_id))
                    return True

    async def delete_user(self, usr_id: int, reason: str, db_config: dict) -> bool:
        """Delete user."""
        query = "DELETE FROM users WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (usr_id,))
                    return True

    async def search_user(self, usr_name: str) -> List['User']:
        """Search for users by name."""
        query = "SELECT * FROM users WHERE username LIKE %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query, (f"%{usr_name}%",))
                    users_data = await cursor.fetchall()
                    return [User(**user) for user in users_data]
