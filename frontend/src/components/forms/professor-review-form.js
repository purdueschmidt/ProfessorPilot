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

export const ProfessorReviewForm = () => {
  const reviewText = useRef();

  const [professors, setProfessors] = useState([]);
  const [professor, setProfessor] = useState("");


  const [communication, setCommunication] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [availability, setAvailability] = useState(0);
  const [grading, setGrading] = useState(0);
  const [competency, setCompetency] = useState(0);

  const { user } = useAuth0();

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await fetch("http://localhost:6060/api/reviews/professors");
      if (response.ok) {
        const data = await response.json();
        setProfessors(data);
      } else {
        console.error("Failed to fetch professors");
      }
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      reviewer: user.nickname,
      professor: professor,
      communication: communication,
      organization: organization,
      availability: availability,
      grading: grading,
      competency: competency,
      review_text: reviewText.current.value,
    };

    console.log("Submitting review:", data); // Add this line
    await submitReview(data);
  };

  const submitReview = async (data) => {
    try {
      // const response = await fetch("http://localhost:6060/api/submit_review", {
        const response = await fetch("http://localhost:6060/api/reviews/submit_professor_review", {
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
      case "communication":
        setCommunication(value);
        break;
      case "organization":
        setOrganization(value);
        break;
      case "availability":
        setAvailability(value);
        break;
      case "grading":
        setGrading(value);
        break;
      case "competency":
        setCompetency(value);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    console.log("Select change event:", event);
    const name = event.target.name;
    const value = event.target.value;
  
    if (name === "professor") {
      setProfessor(event.target.value);
    }
  };

  const criteria = [
    "communication",
    "organization",
    "availability",
    "grading",
    "competency"
  ];

//   const uniqueMajors = Array.from(new Set(professors.map((professor) => course.major)));


  return (
    <Container maxWidth="sm">
      <form id="courseReviewForm" onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <Grid item xs={12} sm={3}>
              <Typography align="center" alignItems="center"
                  justifyContent="center" variant="subtitle1">
                {user.nickname}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl sx={{ minWidth: 120}}>
              <InputLabel htmlFor="grouped-native-select">Professor</InputLabel>
              <Select name="professor" onChange={handleChange} value={professor} native defaultValue="" id="grouped-native-select" label="Grouping"   inputProps={{id: "grouped-native-select"}}>
                <option className="" aria-label="None" value="" />
                    {professors.map((professor) => (
                        <option className="review-form-fieldd" key={professor._id} value={professor.professor}>
                          {professor.professor}
                        </option>
                    ))}
              </Select>
            </FormControl>
          </Grid>
          {criteria.map((criterion, index) => (
            <Grid item xs={10} sm={3} key={index}>
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