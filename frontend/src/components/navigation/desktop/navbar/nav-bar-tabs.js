import React from "react";
import { NavBarTab } from "./nav-bar-tab";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Container, Grid } from "@mui/material";

export const NavBarTabs = () => {
  return (
        <ButtonGroup>
          <Container>
            <NavBarTab path="/" label="Home" />
            <NavBarTab path="/coursesPage" label="Courses" />
            <NavBarTab path="/professorsPage" label="Professors" />
          </Container>
        </ButtonGroup>
  );
};