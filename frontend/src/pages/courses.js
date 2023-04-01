import React from "react";
import { PageLayout } from "../components/page-layout";
import { ReviewForm } from "../components/review-form/review-form";
import CoursesList from "../components/courses/courses-list";

export const CoursesPage = () => (
  <PageLayout>
    <CoursesList></CoursesList>
    <ReviewForm/>
  </PageLayout>
);