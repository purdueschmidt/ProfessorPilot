import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { ReviewForm } from "../components/review-form/review-form";
import { ReviewsList } from "../components/review-list/reviews-list";

export const CourseReviewsPage = () => {
  const { course_code } = useParams();

  return (
    <PageLayout>
      <ReviewsList endpoint="coursesPage" course_code={course_code} />
      <ReviewForm />
    </PageLayout>
  );
};