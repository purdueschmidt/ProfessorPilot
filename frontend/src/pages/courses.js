import React from "react";
import { PageLayout } from "../components/defaults/page-layout";
// import { ReviewForm } from "../components/review-form/review-form";
import CoursesList from "../components/lists/courses-list";

export const CoursesPage = () => (
  <PageLayout>
    <CoursesList />
    {/* <ReviewForm/> */}
  </PageLayout>
);