import React, { useState, useEffect, useCallback } from 'react';
import { CourseReviewCard } from '../cards/course-review-card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import '../../styles/components/review-list.css'
import { useAuth0 } from '@auth0/auth0-react';


export const CourseReviewsList = ({ endpoint, course_code }) => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth0();

  const fetchReviews = useCallback(async () => {
    try {
      let response;
      if (endpoint === "recent_course_reviews") {
        response = await fetch(`/reviews/recent_course_reviews`);
      } else if (endpoint === "coursesPage") {
        response = await fetch(`/reviews/coursesPage/${course_code}`);
      }
      if (response.ok) {
        const fetchedReviews = await response.json();
        setReviews(fetchedReviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  },  [endpoint, course_code]); ;

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleVoteUpdate = (_id, newUpVotes, newDownVotes) => {
    const reviewIndex = reviews.findIndex((review) => review._id === _id);
    
    setReviews((prevReviews) => {
      const updatedReviews = [...prevReviews];
      updatedReviews[reviewIndex].UpVotes = newUpVotes;
      updatedReviews[reviewIndex].DownVotes = newDownVotes;
      return updatedReviews;
    });
  };

  const handleVote = async (_id, action) => {
    try {
      const response = await fetch(`/reviews/${_id}/vote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ _id, action, reviewer: (user.nickname), review_type: ('course') }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        handleVoteUpdate(_id, result.upVotes, result.downVotes);
      } else {
        console.error('Failed to update votes:', result.message);
      } fetchReviews();
    } catch (error) {
      console.error('Failed to update votes:', error);
    }
  };

  const handleCommentUpdate = (_id, newComments) => {
    const reviewIndex = reviews.findIndex((review) => review._id === _id);
  
    setReviews((prevReviews) => {
      const updatedReviews = [...prevReviews];
      updatedReviews[reviewIndex].comments = newComments;
      return updatedReviews;
    });
  };

  const handleCommentSubmit = async (_id, newComment) => {
    try {
      const response = await fetch(`/reviews/${_id}/comment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id, comment: (newComment), user: (user.nickname), review_type: ('course') }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        handleCommentUpdate(_id, result.comments);
      } else {
        console.error('Failed to submit comment:', result.message);
      } fetchReviews();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };
  
  
  

  return (
    <div>
      <Typography margin={2} variant="h4" color="primary">Course Reviews</Typography>
      <Grid container spacing={3}>
        {reviews.map((review, index) => {
          console.log('Review JSON:', JSON.stringify(review));
          // if (!review.CourseName) return null;
          return (
            <Grid padding={2} margin={2} item xs={12} key={index}>
              <CourseReviewCard
                _id={review._id}
                term={review.Term}
                year={review.Year}
                rating={review.Rating}
                reviewer={review.Reviewer}
                course_code={review.course_code}
                reviewText={review.ReviewText}
                workload={review.Workload}
                organization={review.Organization}
                usefulness={review.Usefulness}
                interest={review.Interest}
                difficulty={review.Difficulty}
                UpVotes={review.UpVotes}
                DownVotes={review.DownVotes}
                onVote={handleVote} 
                Comments={review.Comments}
                onCommentSubmit={handleCommentSubmit}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};


