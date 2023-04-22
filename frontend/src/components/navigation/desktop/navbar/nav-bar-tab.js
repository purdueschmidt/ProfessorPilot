import React from "react";
import { NavLink } from "react-router-dom";
import Button  from "@mui/material/Button";

export const NavBarTab = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      end
      // activeClassName="nav-bar__tab--active"
    >
      <Button color="inherit">
        {label}
      </Button>
    </NavLink>
  );
};