import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { CourseReviewCard } from '../cards/course-review-card';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useAuth0 } from '@auth0/auth0-react';
import "../../styles/components/review-form.css"


const fetchCoursesAndMajors = async () => {
    try {
      const response = await fetch("http://localhost:6060/api/reviews/courses");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    return [];
  };

export const SearchBar = () => {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState('');
  const [sort_by, setSort_By] = useState('');
  const [courses, setCourses] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await fetchCoursesAndMajors();
      setCourses(courses);
    }
    fetchCourses();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:6060/api/reviews/search?query=${query}&sort_by=${sort_by}`);
      if (response.ok) {
        const fetchedReviews = await response.json();
        console.log('Fetched reviews:', fetchedReviews);
        setReviews(fetchedReviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  
  const handleVoteUpdate = (_id, newUpVotes, newDownVotes) => {
    setReviews((prevReviews) => {
      const updatedReviews = prevReviews.map((review) => {
        if (review._id === _id) {
          return {
            ...review,
            UpVotes: newUpVotes,
            DownVotes: newDownVotes,
          };
        }
        return review;
      });
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
        
        body: JSON.stringify({ _id, action, reviewer: (user.nickname), review_type: ('course') }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        handleVoteUpdate(_id, result.upVotes, result.downVotes);
      } else {
        console.error('Failed to update votes:', result.message);
      } handleSearch();
    } catch (error) {
      console.error('Failed to update votes:', error);
    }
  };

  const handleCommentUpdate = (_id, newComments) => {
    setReviews((prevReviews) => {
      const updatedReviews = prevReviews.map((review) => {
        if (review._id === _id) {
          return {
            ...review,
            comments: newComments,
          };
        }
        return review;
      });
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
        body: JSON.stringify({ _id, comment: (newComment), user: (user.nickname), review_type: ('course') }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        handleCommentUpdate(_id, result.comments);
      } else {
        console.error('Failed to submit comment:', result.message);
      } handleSearch();
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };


  const uniqueMajors = Array.from(new Set(courses.map((course) => course.major)));

return (
  <div>
    <h1 className='header'>Search Course Reviews</h1>
    <div className='search-bar'>
      {/* <TextField label='Search by course code' value={query} onChange={(event) => setQuery(event.target.value)} /> */}
      <form id="courseReviewForm">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ minWidth: 120}}>
              <InputLabel  htmlFor="grouped-native-select">Course Code</InputLabel>
              <Select name="course_code" onChange={(event) => setQuery(event.target.value)} value={query} className="review-form-fieldd" native defaultValue="" id="grouped-native-select" label="Grouping"   inputProps={{id: "grouped-native-select"}}>
                <option className="" aria-label="None" value="" />
                {uniqueMajors.map((major, index) => (
                  <optgroup key={index} label={major}>
                    {courses
                      .filter((course) => course.major === major)
                      .map((course) => (
                        <option className="review-form-fieldd" key={course.course_code} value={course.course_code}>
                          {course.course_code}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </Select>
            </FormControl>
          </Grid>    
          <Grid item xs={12} sm={6}>      
            <FormControl sx={{ minWidth: 120}}>          
              <TextField
                label='Sort by'
                value={sort_by}
                onChange={(event) => setSort_By(event.target.value)}
                select
                >
              
                <MenuItem value='Year'>Year</MenuItem>
                <MenuItem value='Term'>Term</MenuItem>
                <MenuItem value='Difficulty'>Difficulty</MenuItem>
                <MenuItem value='Interest'>Interest</MenuItem>
                <MenuItem value='Usefulness'>Usefulness</MenuItem>
                <MenuItem value='Organization'>Organization</MenuItem>
                <MenuItem value='Workload'>Workload</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant='contained' onClick={handleSearch}>Search</Button>
          </Grid>
        </Grid>
      </form>
    </div>
    <Grid container spacing={1}>
      {reviews.map((review, index) => {
        console.log('Review JSON:', JSON.stringify(review));
        // if (!review.CourseName) return null;
        return (
          <Grid item xs={12} sm={6} key={index}>
            <CourseReviewCard
              _id={review._id}
              rating={review.Rating}
              term={review.Term}
              year={review.Year}
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
