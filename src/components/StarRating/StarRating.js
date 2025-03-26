import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ initialRating = 0, readOnly = false, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const totalStars = 10;

  const handleRatingChange = (newRating) => {
    if (!readOnly) {
      setRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating);
      }
    }
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        
        return (
          <span
            key={index}
            className={`star ${starValue <= (hover || rating) ? "filled" : "empty"} ${readOnly ? "readonly" : ""}`}
            onClick={() => handleRatingChange(starValue)}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
