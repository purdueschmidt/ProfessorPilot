import React from "react";
// import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import { ReviewsList } from "../components/review-list/reviews-list";

import { ProfessorReviewsList } from "../components/professor-review-list/professor-review-list";

export const HomePage = () => (
  <PageLayout>
    {/* <HeroBanner /> */}
      <ReviewsList endpoint="recent_course_reviews" />
      <ProfessorReviewsList endpoint="recent_professor_reviews" />
      {/* <ReviewForm/> */}
  </PageLayout>
);