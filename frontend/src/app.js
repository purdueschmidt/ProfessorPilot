import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/auth/authentication-guard";
import { AdminPage } from "./pages/admin-page";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { ProtectedPage } from "./pages/protected-page";
import { PublicPage } from "./pages/public-page";
import { CourseReviewForm } from "./components/course-review-form/course-review-form";
import { CourseReviewsPage } from "./pages/course-reviews";
import { CoursesPage } from "./pages/courses";
import { CourseReviewsList } from "./components/course-review-list/course-reviews-list";
import { ProfessorReviewsList } from "./components/professor-review-list/professor-review-list";
import { ProfessorReviewsPage } from "./pages/professor-reviews";
import { ProfessorsPage } from "./pages/professors";
import { ProfessorReviewForm } from "./components/professor-review-form/professor-review-form";
import { SearchBar } from "./components/search/search-reviews";
import { ProfessorSearchBar } from "./components/review-list/search-professor-review";
import { CourseReviewCard } from "./components/course-review-card/course-review-card";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>

      {/* home */}

      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchBar />} />
      <Route path="/professor-review-search" element={<ProfessorSearchBar />} />

      {/* courses */}

      <Route path="/recent_course_reviews" element={<CourseReviewsList endpoint={"recent_course_reviews"} />}/>
      <Route path="/courses" element={<CourseReviewForm />}/>
      <Route path="/submit_course_review" element={<CourseReviewForm/>} />
      <Route path="/coursesPage" element={<CoursesPage />}/>
      <Route path="/coursesPage/:course_code" element={<CourseReviewsPage />} />
      <Route path="/:_id" element={<CourseReviewCard />} />

      {/* professors */}

      <Route path="/recent_professor_reviews" element={<ProfessorReviewsList endpoint={"recent_professor_reviews"} />}/>
      <Route path="/professors" element={<ProfessorReviewForm />}/>
      <Route path="/submit_professor_review" element={<ProfessorReviewForm/>} />
      <Route path="/professorsPage" element={<ProfessorsPage />}/>
      <Route path="/professorsPage/:professor" element={<ProfessorReviewsPage />} />

      {/* default */}
      <Route path="/profile" element={<AuthenticationGuard component={ProfilePage} />}/>
      <Route path="/public" element={<PublicPage />} />
      <Route path="/protected" element={<AuthenticationGuard component={ProtectedPage} />} />
      <Route path="/admin" element={<AuthenticationGuard component={AdminPage} />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};