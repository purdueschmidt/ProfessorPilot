import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { LoginButton } from "../../../buttons/login-button";
import { LogoutButton } from "../../../buttons/logout-button";
import { SignupButton } from "../../../buttons/signup-button";
import ReviewFormButton from "../../../buttons/course-review-form-button";
import ProfessorReviewFormButton from "../../../buttons/professor-review-form-button";
import { Container, MenuItem } from "@mui/material";

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (

      <div>

        
        {!isAuthenticated && (
          <>
            <MenuItem><SignupButton /></MenuItem>
            <MenuItem><LoginButton /></MenuItem>
          </>
        )}
        {isAuthenticated && (
          <>
            <MenuItem> <ReviewFormButton /> </MenuItem>
            <MenuItem> <ProfessorReviewFormButton /> </MenuItem>
            <MenuItem> <LogoutButton /> </MenuItem>
          </>
        )}
      </div>
    
  );
};