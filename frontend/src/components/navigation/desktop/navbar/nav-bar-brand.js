import React from "react";
import { NavLink } from "react-router-dom";
// import logo from './../../images/wings.png';
// import logo from "./../../../images/wings.png"
import logo from "../../../images/profpilotminimaltassle.png"

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src={logo}
          alt="ProfessorPilot logo"
          width="100"
          height="100"
        />
          <p></p>
      </NavLink>
    </div>
  );
};
