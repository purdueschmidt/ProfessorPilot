import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ProfessorReviewCard } from '../professor-review-card/professor-review-card';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import "../../styles/components/review-form.css"

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;


const fetchProfessors = async () => {
    try {
      const response = await fetch(`${apiServerUrl}/api/reviews/professors`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch professors");
      }
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };

export const ProfessorSearchBar = () => {
  const [reviews, setReviews] = useState([]);
  const [query, setQuery] = useState('');
  const [sort_by, setSort_By] = useState('');
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const fetchProf = async () => {
      const professors = await fetchProfessors();
      setProfessors(professors);
    }
    fetchProf();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${apiServerUrl}/api/reviews/professor-review-search?query=${query}&sort_by=${sort_by}`);
      if (response.ok) {
        const fetchedReviews = await response.json();
        setReviews(fetchedReviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };


return (
  <div>
    <h1 className='header'>Search Professor Reviews</h1>
    <div className='search-bar'>
      {/* <TextField label='Search by course code' value={query} onChange={(event) => setQuery(event.target.value)} /> */}
        <form id="courseReviewForm">
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: 120}}>
                        <InputLabel className="review-form-field" htmlFor="grouped-native-select">Professor</InputLabel>
                        <Select name="professor" onChange={(event) => setQuery(event.target.value)} value={query} className="review-form-fieldd" native defaultValue="" id="grouped-native-select" label="Grouping"   inputProps={{id: "grouped-native-select"}}>
                            <option className="" aria-label="None" value="" />
                                {professors.map((professor) => (
                                    <option className="review-form-fieldd" key={professor._id} value={professor.professor}>
                                    {professor.professor}
                                    </option>
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
                            className="review-form-field">
                            <MenuItem value='Year'>Year</MenuItem>
                            <MenuItem value='Term'>Term</MenuItem>
                            <MenuItem value='Difficulty'>Communication</MenuItem>
                            <MenuItem value='Organization'>Organization</MenuItem>
                            <MenuItem value='Availability'>Availability</MenuItem>
                            <MenuItem value='Grading'>Grading</MenuItem>
                            <MenuItem value='Competency'>Competency</MenuItem>
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
            <ProfessorReviewCard
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