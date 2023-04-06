import React from "react";
// import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import { CourseReviewsList } from "../components/review-list/course-reviews-list";
import { ProfessorReviewsList } from "../components/professor-review-list/professor-review-list";
import { SearchBar } from "../components/review-list/search-course-list";
import { ProfessorSearchBar } from "../components/review-list/search-professor-review";

export const HomePage = () => (
  <PageLayout>
    {/* <HeroBanner /> */}
      <SearchBar />
      <CourseReviewsList endpoint="recent_course_reviews" />
      <ProfessorSearchBar />
      <ProfessorReviewsList endpoint="recent_professor_reviews" />
      {/* <ReviewForm/> */}
  </PageLayout>
);