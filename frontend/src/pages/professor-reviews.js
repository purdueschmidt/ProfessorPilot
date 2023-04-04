import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import { ProfessorReviewsList } from "../components/professor-review-list/professor-review-list";

export const ProfessorReviewsPage = () => {
  const { professor } = useParams();

  return (
    <PageLayout>
      <ProfessorReviewsList endpoint="coursesPage" professor={professor} />
      {/* <ReviewForm /> */}
    </PageLayout>
  );
};