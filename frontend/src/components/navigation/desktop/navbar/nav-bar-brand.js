import React from "react";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
// import logo from './../../images/wings.png';
// import logo from "./../../../images/wings.png"
import logo from "../../../images/profpilotminimaltassle.png"

export const NavBarBrand = () => {
  return (
    <div>
      <NavLink to="/">
        <IconButton>
          <img
            src={logo}
            alt="ProfessorPilot logo"
            width="100"
            height="100"
          />
        </IconButton>
      </NavLink>
    </div>
  );
};