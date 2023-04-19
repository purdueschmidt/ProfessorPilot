import React from "react";
import { PageLayout } from "../components/defaults/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import ProfessorsList from "../components/lists/professors-list";

export const ProfessorsPage = () => (
  <PageLayout>
    <ProfessorsList />
    {/* <ReviewForm/> */}
  </PageLayout>
);