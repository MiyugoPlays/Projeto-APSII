const reviewService = require('../services/reviewService');

exports.addReview = async (req, res) => {
    try {
        const { review_text } = req.body;
        const newReview = await reviewService.addReview(review_text);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await reviewService.getReviewById(id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
