import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { submitReview } from './api';
import Header from './Header';
import '../styles/Review.css';

const Review = () => {
  const { packageId } = useParams();
  const [reviewData, setReviewData] = useState({
    user_id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null,
    package_id: packageId,
    rating: 5, // Default rating
    comment: '', // Default comment
  });
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReview(reviewData);
      setMessage('Review submitted successfully!');
      // Clear the form after submission
      setReviewData({
        ...reviewData,
        rating: 5,
        comment: '',
      });
    } catch (err) {
      setMessage('Failed to submit review. Please try again.');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="review-page">
      <Header />
      <div className="review-container">
        <h2>Write a Review</h2>
        {message && <p className="message">{message}</p>}
        <form className="review-form" onSubmit={handleSubmit}>
          {/* Rating Input */}
          <div className="form-group">
            <label>Rating</label>
            <select
              name="rating"
              value={reviewData.rating}
              onChange={handleChange}
              className="rating-select"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>

          {/* Comment Input */}
          <div className="form-group">
            <label>Your Review</label>
            <textarea
              name="comment"
              value={reviewData.comment}
              onChange={handleChange}
              placeholder="Share your experience..."
              rows="5"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-review">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;