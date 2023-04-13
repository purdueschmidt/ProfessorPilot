// import React, { useState, useEffect } from 'react';
// import CourseReviewCard from "../review-card/review-card";
// import Grid from '@mui/material/Grid';

// export const ReviewsList = () => {
//   const [reviews, setReviews] = useState([]);

//   const fetchRecentReviews = async () => {
//     try {
//       const response = await fetch(`http://localhost:6060/api/reviews/recent_course_reviews`);
//       if (response.ok) {
//         const recentReviews = await response.json();
//         setReviews(recentReviews);
//       }
//     } catch (error) {
//       console.error('Failed to fetch recent reviews:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRecentReviews();
//   }, []);

//   return (
//     <div>
//       <h1></h1>
//       <Grid container spacing={1}>
//         {reviews.map((review, index) => {
//           console.log('Review JSON:', JSON.stringify(review));
//           // if (!review.CourseName) return null;
//           return (
//             <Grid item xs={12} sm={6} key={index}>
//               <CourseReviewCard
//                 term={review.Term}
//                 year={review.Year}
//                 reviewText={review.ReviewText}
//                 workload={review.Workload}
//                 organization={review.Organization}
//                 usefulness={review.Usefulness}
//                 interest={review.Interest}
//                 difficulty={review.Difficulty}
//               />
//             </Grid>
//           );
//         })}
//       </Grid>
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from 'react';
import { CourseReviewCard } from '../course-review-card/course-review-card';
import Grid from '@mui/material/Grid';
import '../../styles/components/review-list.css'

export const CourseReviewsList = ({ endpoint, course_code }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = useCallback(async () => {
    try {
      let response;
      if (endpoint === "recent_course_reviews") {
        response = await fetch(`http://localhost:6060/api/reviews/recent_course_reviews`);
      } else if (endpoint === "coursesPage") {
        response = await fetch(`http://localhost:6060/api/reviews/coursesPage/${course_code}`);
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

  return (
    <div>
      <h1 className='header'>Course Reviews</h1>
      <Grid container spacing={1}>
        {reviews.map((review, index) => {
          console.log('Review JSON:', JSON.stringify(review));
          // if (!review.CourseName) return null;
          return (
            <Grid item xs={12} sm={6} key={index}>
              <CourseReviewCard
                _id={review._id}
                term={review.Term}
                year={review.Year}
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
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};


