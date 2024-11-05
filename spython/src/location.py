import aiomysql
from config import db_config


class Location:
    @staticmethod
    async def view_locals():
        query = "SELECT * FROM locations;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query)
                    locations = await cursor.fetchall()
                    return [Location(**loc) for loc in locations]

    @staticmethod
    async def get_location_by_id(id_local: int) -> 'Location':
        query = "SELECT * FROM locations WHERE id_local = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query, (id_local,))
                    location = await cursor.fetchone()
                    if location:
                        return Location(**location)
                    return None
