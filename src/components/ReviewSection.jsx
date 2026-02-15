import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { pgAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ReviewSection({ pgId, reviews = [], rating, onReviewAdded }) {
  const { user, isAuthenticated } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please login to add a review');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await pgAPI.addReview(pgId, {
        user: user.name,
        rating: reviewData.rating,
        comment: reviewData.comment
      });

      setReviewData({ rating: 5, comment: '' });
      setShowReviewForm(false);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count, interactive = false, onSelect = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => onSelect(star) : undefined}
            disabled={!interactive}
            className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
          >
            <Star
              className={`h-5 w-5 ${
                star <= count
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const hasReviews = reviews && reviews.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          {hasReviews ? 'Ratings & Reviews' : 'Be the First to Review!'}
        </h2>
        {!showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Overall Rating - Only show if there are reviews */}
      {hasReviews && (
        <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900">{rating?.toFixed(1)}</div>
            <div className="flex items-center gap-1 mt-2">
              {renderStars(Math.round(rating))}
            </div>
            <div className="text-sm text-gray-600 mt-1">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-lg mb-4">Write Your Review</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Your Rating
            </label>
            {renderStars(reviewData.rating, true, (rating) => 
              setReviewData(prev => ({ ...prev, rating }))
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Your Review
            </label>
            <textarea
              value={reviewData.comment}
              onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
              required
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              placeholder="Share your experience with this PG..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Review
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowReviewForm(false);
                setError('');
              }}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {hasReviews ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.user?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.user || 'Anonymous'}</p>
                      <p className="text-sm text-gray-500">
                        {review.date ? new Date(review.date).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : !showReviewForm ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-4">No reviews yet</p>
          <p className="text-sm text-gray-500">Be the first to share your experience!</p>
        </div>
      ) : null}
    </div>
  );
}
