const reviewModel = require('../models/reviewModel');

async function addReview(reviewText) {
    return await reviewModel.adicionarReview(reviewText);
}

async function getAllReviews() {
    return await reviewModel.obterReviews();
}

async function getReviewById(id) {
    return await reviewModel.buscarReviewPorId(id);
}

module.exports = {
    addReview,
    getAllReviews,
    getReviewById
};
