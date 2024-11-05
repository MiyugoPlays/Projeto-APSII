import aiomysql
from typing import List
from config import db_config
from user import User
from space import Space
from review import Review
from booking import Booking


class Client:
    def __init__(self, user: 'User', description: str):
        self.user = user
        self.description = description
        self.spaces: List[Space] = []
        self.reviews: List[Review] = []
        self._insert()

    async def _insert(self) -> bool:
        """Insert client into the database."""
        query = "INSERT INTO clients (id_usr, description) VALUES (%s, %s);"
        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (self.user.id_usr, self.description))
                    return cursor.rowcount == 1
    async def create_space(self, space: 'Space') -> bool:
        self.spaces.append(space)
        await space.insert(db_config)
        return True

    async def change_description(self, new_description: str):
        self.description = new_description
        query = "UPDATE users SET description = %s WHERE id_usr = %s;"
        async with aiomysql.connect(**db_config) as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, (new_description, self.user.id_usr))
                await conn.commit()

    async def view_bookings(self) -> List['Booking']:
        return await Booking.view_bookings(self.user.id_usr, db_config)

    async def add_review(self, review: 'Review') -> bool:
        self.reviews.append(review)
        await review.create_review(db_config)
        return True
