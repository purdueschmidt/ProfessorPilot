import React from "react";
import { NavLink } from "react-router-dom";
// import logo from './../../images/wings.png';
import logo from "./../../../images/wings.png"

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src={logo}
          alt="ProfessorPilot logo"
          width="75"
          height="75"
        />
          <p>ProfessorPilot</p>
      </NavLink>
    </div>
  );
};
