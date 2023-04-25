import React from "react";
import { NavLink } from "react-router-dom";
import Button  from "@mui/material/Button";
import { Link } from "@mui/material";


export const FooterTab = ({ path, label }) => {
  return (

      <NavLink
        to={path}
        end
        className={({ isActive }) =>
          "footer-tab " + (isActive ? "footer-tab--active" : "")
        }
      >
      <Link sx={{margin:2}} color="primary">
        {label}
      </Link>
      </NavLink>

  );
};