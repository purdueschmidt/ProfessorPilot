import React, { useRef, useState, useEffect} from "react";

import "../../styles/components/review-form.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useAuth0 } from "@auth0/auth0-react";

export const CourseReviewForm = () => {
  const term = useRef();
  const year = useRef();
  const reviewText = useRef();

  const [major, setMajor] = useState("");
  const [courses, setCourses] = useState([]);
  const [course_code, setcourse_code] = useState("");


  const [difficulty, setDifficulty] = useState(0);
  const [interest, setInterest] = useState(0);
  const [usefulness, setUsefulness] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [workload, setWorkload] = useState(0);

  const { user } = useAuth0();

  useEffect(() => {
    fetchCoursesAndMajors();
  }, []);

  const fetchCoursesAndMajors = async () => {
    try {
      const response = await fetch(`/reviews/courses`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      reviewer: user.nickname,
      term: term.current.value,
      year: year.current.value,
      course_code: course_code,
      difficulty: difficulty,
      interest: interest,
      usefulness: usefulness,
      organization: organization,
      workload: workload,
      review_text: reviewText.current.value,
    };

    console.log("Submitting review:", data); 
    await submitReview(data);
  };

  const submitReview = async (data) => {
    try {
      // const response = await fetch("${apiServerUrl}/api/submit_review", {
        const response = await fetch(`/reviews/submit_course_review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // alert("Review submitted successfully.");
        const result = await response.json();
        alert(result["Submit"])
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  const handleRatingChange = (criterion, value) => {
    
    switch (criterion) {
      case "difficulty":
        setDifficulty(value);
        break;
      case "interest":
        setInterest(value);
        break;
      case "usefulness":
        setUsefulness(value);
        break;
      case "organization":
        setOrganization(value);
        break;
      case "workload":
        setWorkload(value);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    console.log("Select change event:", event);
    const name = event.target.name;
    const value = event.target.value;
  
    if (name === "course_code") {
      setcourse_code(event.target.value);
    }
  };

  const criteria = [
    "difficulty",
    "interest",
    "usefulness",
    "organization",
    "workload"
  ];

  const uniqueMajors = Array.from(new Set(courses.map((course) => course.major)));


  return (
    <Container maxWidth="sm">
      <form id="courseReviewForm" onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            {/* <TextField
              className="review-form-field"
              label="Reviewer"
              fullWidth
              required
              inputRef={reviewer}
            /> */}
            <Grid item xs={12} sm={3}>
              <Typography align="center" alignItems="center"
                  justifyContent="center" variant="subtitle1">
                {user.nickname}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              
              label="Term"
              fullWidth
              required
              inputRef={term}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              
              label="Year"
              fullWidth
              required
              type="number"
              inputRef={year}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl sx={{ minWidth: 120}}>
              <InputLabel htmlFor="grouped-native-select">Course Code</InputLabel>
              <Select name="course_code" onChange={handleChange} value={course_code} native defaultValue="" id="grouped-native-select" label="Grouping"   inputProps={{id: "grouped-native-select"}}>
                <option aria-label="None" value="" />
                {uniqueMajors.map((major, index) => (
                  <optgroup key={index} label={major}>
                    {courses
                      .filter((course) => course.major === major)
                      .map((course) => (
                        <option key={course.course_code} value={course.course_code}>
                          {course.course_code}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {criteria.map((criterion, index) => (
            <Grid item xs={12} sm={4} key={index} container spacing={2} paddingX={1}margin={1}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                
                <Typography variant="subtitle1">{criterion}:</Typography>
                
                  <Rating
                    name={criterion}
                    size="small"
                    value={eval(criterion)}
                    onChange={(event, newValue) => handleRatingChange(criterion, newValue)}
                  />
                
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              
              label="Review Text"
              multiline
              rows={4}
              fullWidth
              required
              inputRef={reviewText}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};