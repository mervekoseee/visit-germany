const Review = require('../models/review')
const Hotel = require('../models/hotel')

// authentication
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        // console.log('req.isAuthenticated():', req.isAuthenticated());
        // console.log('req.session:', req.session);
        // console.log('isLoggedIn middleware called with req.originalUrl:', req.originalUrl);
        if (req.isAuthenticated()) {
            next();
        } else {
            req.session.originalUrl = req.originalUrl;
            req.session.save()
            req.flash('error', 'Önce giriş yapın');
            console.log("giriş yapılmadı");
            res.redirect('/login');
        }
    }
};

// authorization
const isReviewAuthor = async (req, res, next) => {
    let { reviewId } = req.params;
    let review = await Review.findById(reviewId).populate('author');
    if (review.author._id.equals(req.user._id)) {
        next();
    } else {
        req.flash('error', 'izin yok')
        res.redirect('back');
    }
}

const isHotelAuthor = async (req, res, next) => {
    let { id } = req.params;
    let hotel = await Hotel.findById(id).populate('author')
    if (hotel.author._id.equals(req.user._id)) {
        next();
    } else {
        req.flash('error', 'izin yok')
        res.redirect('back');
    }
}

module.exports = {
    isLoggedIn,
    isReviewAuthor,
    isHotelAuthor
}