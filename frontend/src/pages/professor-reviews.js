import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/defaults/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import { ProfessorReviewsList } from "../components/lists/professor-review-list";
import { ProfessorSearchBar } from "../components/lists/search-professor-review";

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