import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CourseReviewCard from '../course-review-card/course-review-card';
import "../../styles/components/review-list.css"
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";


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
  };

export const SearchBar = () => {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState('');
  const [sort_by, setSort_By] = useState('');
  const [courses, setCourses] = useState([]);

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
        setReviews(fetchedReviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const uniqueMajors = Array.from(new Set(courses.map((course) => course.major)));

return (
  <div>
    <h1 className='header'>Search Course Reviews</h1>
    <div className='search-bar'>
      {/* <TextField label='Search by course code' value={query} onChange={(event) => setQuery(event.target.value)} /> */}

      <FormControl sx={{ minWidth: 120}}>
            <InputLabel className="review-form-field" htmlFor="grouped-native-select">Course Code</InputLabel>
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
      <Button variant='contained' onClick={handleSearch}>Search</Button>
    </div>
    <Grid container spacing={1}>
      {reviews.map((review, index) => {
        console.log('Review JSON:', JSON.stringify(review));
        // if (!review.CourseName) return null;
        return (
          <Grid item xs={12} sm={6} key={index}>
            <CourseReviewCard
              term={review.Term}
              year={review.Year}
              course_code={review.course_code}
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
};
