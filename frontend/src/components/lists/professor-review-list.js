import React, { useState, useEffect, useCallback } from 'react';
import { ProfessorReviewCard } from '../cards/professor-review-card';
import '../../styles/components/review-list.css'

import Grid from '@mui/material/Grid';
import { useAuth0 } from '@auth0/auth0-react';

export const ProfessorReviewsList = ({ endpoint, professor }) => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth0();

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
      const response = await fetch(`http://localhost:6060/api/reviews/${_id}/vote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ _id, action, reviewer: (user.nickname), review_type: ('professor') }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        handleVoteUpdate(_id, result.upVotes, result.downVotes);
      } else {
        console.error('Failed to update votes:', result.message);
      } fetchProfessorReviews();
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
      const response = await fetch(`http://localhost:6060/api/reviews/${_id}/comment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id, comment: (newComment), user: (user.nickname), review_type: ('professor') }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        handleCommentUpdate(_id, result.comments);
      } else {
        console.error('Failed to submit comment:', result.message);
      } fetchProfessorReviews();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

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
                _id={review._id}
                rating={review.Rating}
                professor={review.professor}
                reviewText={review.ReviewText}
                communication={review.Communication}
                organization={review.Organization}
                availability={review.Availability}
                grading={review.Grading}
                competency={review.Competency}
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
