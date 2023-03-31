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

export const ReviewForm = () => {
  const reviewer = useRef();
  const term = useRef();
  const year = useRef();
  const reviewText = useRef();

  const [major, setMajor] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseCode, setCourseCode] = useState("");


  const [difficulty, setDifficulty] = useState(0);
  const [interest, setInterest] = useState(0);
  const [usefulness, setUsefulness] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [workload, setWorkload] = useState(0);

  useEffect(() => {
    fetchCoursesAndMajors();
  }, []);

  const fetchCoursesAndMajors = async () => {
    try {
      const response = await fetch("http://localhost:6060/api/reviews/courses");
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
      reviewer: reviewer.current.value,
      term: term.current.value,
      year: year.current.value,
      courseCode: courseCode,
      difficulty: difficulty,
      interest: interest,
      usefulness: usefulness,
      organization: organization,
      workload: workload,
      review_text: reviewText.current.value,
    };

    console.log("Submitting review:", data); // Add this line
    await submitReview(data);
  };

  const submitReview = async (data) => {
    try {
      // const response = await fetch("http://localhost:6060/api/submit_review", {
        const response = await fetch("http://localhost:6060/api/reviews/submit_course_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // alert("Review submitted successfully.");
        const result = await response.json();
        alert(result["Message"])
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
  
    if (name === "courseCode") {
      setCourseCode(event.target.value);
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
    <Container maxWidth="sm" className="review-form-container">
      <Typography variant="h4" align="center" className="review-form-title" gutterBottom>
        Course Review Form
      </Typography>
      <form id="courseReviewForm" onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <TextField
              className="review-form-field"
              label="Reviewer"
              fullWidth
              required
              inputRef={reviewer}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              className="review-form-field"
              label="Term"
              fullWidth
              required
              inputRef={term}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              className="review-form-field"
              label="Year"
              fullWidth
              required
              type="number"
              inputRef={year}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl sx={{ minWidth: 120}}>
              <InputLabel className="review-form-field" htmlFor="grouped-native-select">Course Code</InputLabel>
              <Select name="courseCode" onChange={handleChange} value={courseCode} className="review-form-fieldd" native defaultValue="" id="grouped-native-select" label="Grouping"   inputProps={{id: "grouped-native-select"}}>
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
          {criteria.map((criterion, index) => (
            <Grid item xs={12} sm={2} key={index}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <Typography variant="subtitle1" className="review-form-field">{criterion}:</Typography>
                <Rating
                  name={criterion}
                  value={eval(criterion)}
                  onChange={(event, newValue) => handleRatingChange(criterion, newValue)}
                />
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              className="review-form-field"
              label="Review Text"
              multiline
              rows={4}
              fullWidth
              required
              inputRef={reviewText}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className="review-form-button">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};