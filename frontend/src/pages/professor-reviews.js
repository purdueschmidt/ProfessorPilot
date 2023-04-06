import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import { ProfessorReviewsList } from "../components/professor-review-list/professor-review-list";
import { ProfessorSearchBar } from "../components/review-list/search-professor-review";

export const ProfessorReviewsPage = () => {
  const { professor } = useParams();

  return (
    <PageLayout>
      <ProfessorSearchBar />
      <ProfessorReviewsList endpoint="professorsPage" professor={professor} />
      {/* <ReviewForm /> */}
    </PageLayout>
  );
};