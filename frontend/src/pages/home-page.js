import React from "react";
import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/page-layout";
import { ReviewForm } from "../components/review-form";

export const HomePage = () => (
  <PageLayout>
    <HeroBanner />
      <ReviewForm/>
  </PageLayout>
);