import React, { useState } from 'react';
import "../../styles/components/star-review.css";


const StarRating = ({ onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
  
    const handleMouseEnter = (rating) => {
      setHoverRating(rating);
    };
  
    const handleMouseLeave = () => {
      setHoverRating(0);
    };
  
    const handleClick = (rating) => {
      setSelectedRating(rating);
      onRatingChange(rating);
    };
  
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((rating) => (
          <span
            key={rating}
            className={`star ${hoverRating >= rating ? 'hover' : ''} ${selectedRating >= rating ? 'selected' : ''}`}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(rating)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
export default StarRating;