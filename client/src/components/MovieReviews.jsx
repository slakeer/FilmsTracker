import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';
import { fetchMovieReviews, postMovieReview } from '../api/reviews';
import '../styles/MovieReviews.css';

const MovieReviews = ({ movieId }) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    loadReviews();
  }, [movieId]);

  const handleSubmitReview = async e => {
    e.preventDefault();
    if (!newReview.trim() || rating === 0) return;

    try {
      const newReviewData = await postMovieReview({
        movie_id: movieId,
        user_id: user.id,
        review_text: newReview,
        rating,
        review_date: new Date().toISOString().split('T')[0]
      });
      setReviews(prev => [newReviewData, ...prev]);
      setNewReview('');
      setRating(0);
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2 className="reviews-title">Movie Reviews</h2>
      </div>

      {isLoggedIn ? (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <div className="rating-container">
            <label className="rating-label">Your Rating</label>
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= (hoveredStar || rating) ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                >
                  <svg className="star-icon" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="review-textarea"
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            placeholder="Share your thoughts about the movie..."
          />
          <button
            className="submit-button"
            type="submit"
            disabled={!newReview.trim() || rating === 0}
          >
            Post Review
          </button>
        </form>
      ) : (
        <div className="login-prompt">
          <p className="login-message">Please log in to leave a review</p>
        </div>
      )}

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <img
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqdbyPHzVsKST5c13LZteoLb-mIrVyD7FK7Q&s'
                }
                alt="Reviewer Avatar"
                className="reviewer-avatar"
              />
              <div className="reviewer-details">
                <h4 className="reviewer-name">John Doe</h4>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`review-star ${i < review.rating ? 'filled' : ''}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="review-content">{review.review_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

MovieReviews.propTypes = {
  movieId: PropTypes.string.isRequired
};

export default MovieReviews;
