import React from "react";
import { PageLayout } from "../components/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import ProfessorsList from "../components/professors/professors-list";

export const ProfessorsPage = () => (
  <PageLayout>
    <ProfessorsList />
    {/* <ReviewForm/> */}
  </PageLayout>
);