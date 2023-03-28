import React from "react";
import { NavLink } from "react-router-dom";

export const FooterTab = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        "footer-tab " + (isActive ? "footer-tab--active" : "")
      }
    >
      {label}
    </NavLink>
  );
};