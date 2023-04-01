import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseReviewCard from '../review-card/review-card';


const CourseReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { course_id } = useParams();

  useEffect(() => {
    const fetchCourseReviews = async () => {
      try {
        const response = await fetch(`http://localhost:6060/api/courses/${course_id}/reviews`);
        if (response.ok) {
          const reviewsData = await response.json();
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error('Error fetching course reviews:', error);
      }
    };

    fetchCourseReviews();
  }, [course_id]);

  return (
    <div>
      {reviews.map((review) => (
        <CourseReviewCard
          key={review._id}
          term={review.term}
          year={review.year}
          reviewText={review.reviewText}
          workload={review.workload}
          organization={review.organization}
          usefulness={review.usefulness}
          interest={review.interest}
          difficulty={review.difficulty}
        />
      ))}
    </div>
  );
};

export default CourseReviews;
