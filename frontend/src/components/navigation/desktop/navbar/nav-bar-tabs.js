import React from "react";
import { NavBarTab } from "./nav-bar-tab";
import ButtonGroup from "@mui/material/ButtonGroup";


export const NavBarTabs = () => {
  return (
    <ButtonGroup>
      <div>
        <NavBarTab path="/" label="Home" />
        <NavBarTab path="/coursesPage" label="Courses" />
        <NavBarTab path="/professorsPage" label="Professors" />
      </div>
    </ButtonGroup>
  );
};