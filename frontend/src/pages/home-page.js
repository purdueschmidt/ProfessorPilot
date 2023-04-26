import React from "react";
// import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/defaults/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import { CourseReviewsList } from "../components/lists/course-reviews-list";
import { ProfessorReviewsList } from "../components/lists/professor-review-list";
import { SearchBar } from "../components/lists/search-course-list";
import { ProfessorSearchBar } from "../components/lists/search-professor-review";

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