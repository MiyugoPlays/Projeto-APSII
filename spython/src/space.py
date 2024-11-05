import aiomysql
from typing import List
from config import db_config


class Space:
    def __init__(self, id_space: int, id_usr: int, id_local: int, price: float, space_name: str, space_desc: str, space_photo: str, rooms: int, max_people: int, area: float, address: str, latitude: float, longitude: float):
        self.id_space = None
        self.id_usr = id_usr
        self.id_local = id_local
        self.price = price
        self.space_name = space_name
        self.space_desc = space_desc
        self.space_photo = space_photo
        self.rooms = rooms
        self.max_people = max_people
        self.area = area
        self.address = address
        self.latitude = latitude
        self.longitude = longitude
        self.reviews = []
        self._insert()

    async def _insert(self) -> bool:
        """Insert space into the database."""
        query = """
        INSERT INTO spaces (id_usr, id_local, price, space_name, space_desc, space_photo, rooms, max_people, area, address, latitude, longitude)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
        """

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (self.id_usr, self.id_local, self.price, self.space_name, self.space_desc, self.space_photo, self.rooms, self.max_people, self.area, self.address, self.latitude, self.longitude))
                    if cursor.lastrowid:
                        self.id_space = cursor.lastrowid
                        return True
                    return False

    @staticmethod
    async def view_spaces_by_user(id_usr: int) -> List['Space']:
        """View all spaces by a specific user."""
        query = "SELECT * FROM spaces WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query, (id_usr,))
                    spaces_data = await cursor.fetchall()
                    return [Space(**space) for space in spaces_data]

    async def update_space(self) -> bool:
        """Update space information."""
        query = """
        UPDATE spaces
        SET price = %s, space_name = %s, space_desc = %s, space_photo = %s, rooms = %s, max_people = %s, area = %s, address = %s, latitude = %s, longitude = %s
        WHERE id_space = %s;
        """

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (self.price, self.space_name, self.space_desc, self.space_photo, self.rooms, self.max_people, self.area, self.address, self.latitude, self.longitude, self.id_space))
                    return True

    @staticmethod
    async def view_all_spaces() -> List['Space']:
        """View all spaces available in the database."""
        query = "SELECT * FROM spaces;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query)
                    spaces_data = await cursor.fetchall()
                    return [Space(**space) for space in spaces_data]
