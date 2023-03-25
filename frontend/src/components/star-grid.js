import React from 'react';
import "../styles/components/grids/star-grid.css";
import StarRating from './star-rating';


const StarGrid = ({ onRatingChange }) => {
    const criteria = [    'difficulty',    'interest',    'usefulness',    'organization',    'workload',    'rating',  ];
  
    return (
      <div className="star-grid">
        {criteria.map((criterion) => (
          <div key={criterion} className="rating-container">
            <div className="key-index">
              {criterion}:
            </div>
            <StarRating
              onRatingChange={(rating) => onRatingChange(criterion, rating)}
            />
          </div>
        ))}
      </div>
    );
  };

export default StarGrid;
