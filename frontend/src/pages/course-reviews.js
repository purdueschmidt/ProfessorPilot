import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/defaults/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import { CourseReviewsList } from "../components/lists/course-reviews-list";
import { SearchBar } from "../components/lists/search-course-list";

export const CourseReviewsPage = () => {
  const { course_code } = useParams();

  return (
    <PageLayout>
      <SearchBar />
      <CourseReviewsList endpoint="coursesPage" course_code={course_code} />
      {/* <ReviewForm /> */}
    </PageLayout>
  );
};