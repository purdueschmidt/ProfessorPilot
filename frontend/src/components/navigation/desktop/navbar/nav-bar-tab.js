import React from "react";
import { NavLink } from "react-router-dom";
import Button  from "@mui/material/Button";
import { MenuItem } from "@mui/material";


export const NavBarTab = ({ path, label }) => {
  return (
  <MenuItem>
    <NavLink
      to={path}
      end
      // activeClassName="nav-bar__tab--active"
    >
      <Button sx={{margin:2}}  variant="contained" color="secondary">
        {label}
      </Button>
    </NavLink>
  </MenuItem>
  );
};