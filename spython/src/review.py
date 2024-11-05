import aiomysql
from config import db_config


class Review:
    def __init__(self, review_text: str):
        self.review_text = review_text
        self.id_review = None
        self._insert()

    async def _insert(self) -> bool:
        query = """
        INSERT INTO reviews (review_text)
        VALUES (%s);
        """

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    await cursor.execute(query, (self.review_text,))
                    if cursor.lastrowid:
                        self.id_review = cursor.lastrowid
                        return True
                    return False

    @staticmethod
    async def view_reviews() -> list:
        """Fetch all reviews from the database."""
        query = "SELECT * FROM reviews;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query)
                    reviews_data = await cursor.fetchall()
                    return reviews_data

    @staticmethod
    async def get_review_by_id(review_id: int) -> dict:
        """Fetch a review by its ID."""
        query = "SELECT * FROM reviews WHERE id_review = %s;"

        async with aiomysql.create_pool(**db_config) as pool:
            async with pool.acquire() as conn:
                async with conn.cursor(aiomysql.DictCursor) as cursor:
                    await cursor.execute(query, (review_id,))
                    review = await cursor.fetchone()
                    return review if review else None
