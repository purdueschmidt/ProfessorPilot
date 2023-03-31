import React, { useState, useEffect } from 'react';
import CourseReviewCard from "../review-card/review-card";
import Grid from '@mui/material/Grid';

export const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  const fetchRecentReviews = async () => {
    try {
      const response = await fetch(`http://localhost:6060/api/messages/recent_reviews`);
      if (response.ok) {
        const recentReviews = await response.json();
        setReviews(recentReviews);
      }
    } catch (error) {
      console.error('Failed to fetch recent reviews:', error);
    }
  };

  useEffect(() => {
    fetchRecentReviews();
  }, []);

  return (
    <div>
      <h1>Recent Reviews</h1>
      <Grid container spacing={1}>
        {reviews.map((review, index) => {
          console.log('Review JSON:', JSON.stringify(review));
          if (!review.CourseName) return null;
          return (
            <Grid item xs={12} sm={6} key={index}>
              <CourseReviewCard
                courseName={review.CourseName}
                courseCode={review.CourseCode}
                term={review.Term}
                year={review.Year}
                reviewText={review.ReviewText}
                workload={review.Workload}
                organization={review.Organization}
                usefulness={review.Usefulness}
                interest={review.Interest}
                difficulty={review.Difficulty}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}