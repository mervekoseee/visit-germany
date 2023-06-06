const express = require('express'),
    { isLoggedIn, isReviewAuthor } = require('../middlewares/index'),
    { hotelReviewPost, hotelReviewDelete } = require('../controllers/reviews-controllers');

const router = express.Router();

router.post('/hotels/:id/reviews', isLoggedIn, hotelReviewPost)

router.delete('/hotels/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, hotelReviewDelete)

module.exports = router;