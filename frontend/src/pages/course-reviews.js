import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { ReviewForm } from "../components/review-form/review-form";
import { ReviewsList } from "../components/review-list/reviews-list";

export const CourseReviewsPage = () => {
  const { courseCode } = useParams();

  return (
    <PageLayout>
      <ReviewsList endpoint="specific_course_review" courseCode={courseCode} />
      <ReviewForm />
    </PageLayout>
  );
};