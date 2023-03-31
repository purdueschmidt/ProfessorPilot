import React from "react";
import { PageLayout } from "../components/page-layout";
import { ReviewForm } from "../components/review-form/review-form";
import { ReviewsList } from "../components/review-list/reviews-list";

export const CourseReviewsPage = () => (
  <PageLayout>
      <ReviewsList></ReviewsList>
      <ReviewForm/>
  </PageLayout>
);