import api from 'services/Api';

function postReview(review) {
    return api.post('/review', review);
}

function getReviewRating(userId, reviewerId) {
    return api.get(`/review?user=${userId}&reviewer=${reviewerId}`);
}

const ReviewService = {
    postReview,
    getReviewRating
};

export default ReviewService;