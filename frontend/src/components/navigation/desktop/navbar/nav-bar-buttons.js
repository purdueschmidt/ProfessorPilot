import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "../../../buttons/login-button";
import { LogoutButton } from "../../../buttons/logout-button";
import { SignupButton } from "../../../buttons/signup-button";
import ReviewFormButton from "../../../buttons/course-review-form-button";
import ProfessorReviewFormButton from "../../../buttons/professor-review-form-button";

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
          {/* <ReviewFormButton /> */}
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <ReviewFormButton />
          <ProfessorReviewFormButton />
          <LogoutButton />
        </>
      )}
    </div>
  );
};
