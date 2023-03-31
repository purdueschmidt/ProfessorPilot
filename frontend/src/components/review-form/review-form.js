import React, { useRef, useState } from "react";

import "../../styles/components/review-form.css";

import ReviewGrid from "./review-grid";
import StarRating from "./star-rating";
import StarGrid from "./star-grid";

export const ReviewForm = () => {
  const reviewer = useRef();
  const term = useRef();
  const year = useRef();
  const reviewText = useRef();

  const [difficulty, setDifficulty] = useState(0);
  const [interest, setInterest] = useState(0);
  const [usefulness, setUsefulness] = useState(0);
  const [organization, setOrganization] = useState(0);
  const [workload, setWorkload] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      reviewer: reviewer.current.value,
      term: term.current.value,
      year: year.current.value,
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

  const criteria = [
    "difficulty",
    "interest",
    "usefulness",
    "organization",
    "workload"
  ];


    return (
      <div className="review-item">
      <h2 className="text-center">Course Review Form</h2>
      <form id="courseReviewForm" onSubmit={handleSubmit}>
        <ReviewGrid>
          <div className="form-group reviewer">
            <label htmlFor="reviewer">Reviewer:</label>
            <input
              type="text"
              className="form-control"
              id="reviewer"
              name="reviewer"
              required
              ref={reviewer}
            />
          </div>
          <div className="form-group">
            <label htmlFor="term">Term:</label>
            <input
              type="text"
              className="form-control"
              id="term"
              name="term"
              required
              ref={term}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              className="form-control"
              id="year"
              name="year"
              required
              ref={year}
            />
          </div>
        </ReviewGrid>
        <StarGrid>
          {criteria.map((criterion, index) => (
            <div key={index} className="form-group rating-group">
              <label htmlFor={criterion}>{criterion}:</label>
              <StarRating
                onRatingChange={(rating) => handleRatingChange(criterion, rating)}
              />
            </div>
          ))}
        </StarGrid>
        <div className="form-group">
            <label htmlFor="text">Review Text:</label>
            <textarea
                className="form-control"
                id="text"
                name="text"
                rows="4"
                required
                ref={reviewText}
            ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
};