import aiomysql
from typing import List
from config import db_config


class Booking:
    def __init__(self, id_booking: int, id_space: int, id_usr: int, start_date: str, end_date: str):
        self.id_booking = id_booking
        self.id_space = id_space
        self.id_usr = id_usr
        self.start_date = start_date
        self.end_date = end_date

    @staticmethod
    async def view_bookings(usr_id: int) -> List['Booking']:
        """View all bookings for a specific user."""
        query = "SELECT * FROM bookings WHERE id_usr = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query, (usr_id,))
                    bookings_data = await cursor.fetchall()
                    return [Booking(**booking) for booking in bookings_data]
