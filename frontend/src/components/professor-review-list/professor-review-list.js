import React, { useState, useEffect, useCallback } from 'react';
import { ProfessorReviewCard } from '../professor-review-card/professor-review-card';
import '../../styles/components/review-list.css'

import Grid from '@mui/material/Grid';

export const ProfessorReviewsList = ({ endpoint, professor }) => {
  const [reviews, setReviews] = useState([]);

  const fetchProfessorReviews = useCallback(async () => {
    try {
      let response = { ok: false };
      if (endpoint === "recent_professor_reviews") {
        response = await fetch(`http://localhost:6060/api/reviews/recent_professor_reviews`);
      } else if (endpoint === "professorsPage") {
        response = await fetch(`http://localhost:6060/api/reviews/professorsPage/${professor}`);
      }
      if (response.ok) {
        const fetchedProfessorReviews = await response.json();
        setReviews(fetchedProfessorReviews);
      }
    } catch (error) {
      console.error('Failed to fetch professor reviews:', error);
    }
  },  [endpoint, professor]); ;

  useEffect(() => {
    fetchProfessorReviews();
  }, [fetchProfessorReviews]);

  return (
    <div>
      <h1 className='header'>Professor Reviews</h1>
      <Grid container spacing={1}>
        {reviews.map((review, index) => {
          console.log('Review JSON:', JSON.stringify(review));
          // if (!review.CourseName) return null;
          return (
            <Grid item xs={12} sm={6} key={index}>
              <ProfessorReviewCard
                professor={review.professor}
                reviewText={review.ReviewText}
                communication={review.Communication}
                organization={review.Organization}
                availability={review.Availability}
                grading={review.Grading}
                competency={review.Competency}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
