const db = require('../db.js');

// Add a new review
async function adicionarReview(reviewText) {
    try {
        const query = `INSERT INTO reviews (review_text) VALUES (?);`;
        const [result] = await db.query(query, [reviewText]);
        return { id_review: result.insertId, review_text: reviewText };
    } catch (err) {
        console.error('Erro ao adicionar review:', err);
        throw new Error('Erro ao adicionar review no banco de dados');
    }
}

// Fetch all reviews
async function obterReviews() {
    try {
        const [results] = await db.query('SELECT * FROM reviews;');
        return results;
    } catch (err) {
        console.error('Erro ao obter reviews:', err);
        throw new Error('Erro ao obter reviews');
    }
}

// Fetch a review by ID
async function buscarReviewPorId(reviewId) {
    try {
        const [result] = await db.query('SELECT * FROM reviews WHERE id_review = ?;', [reviewId]);
        return result.length ? result[0] : null;
    } catch (err) {
        console.error('Erro ao buscar review por ID:', err);
        throw new Error('Erro ao buscar review');
    }
}

module.exports = {
    adicionarReview,
    obterReviews,
    buscarReviewPorId
};
