import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs = () => {
  // const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__tabs">
        <NavBarTab path="/" label="Home" />
        <NavBarTab path="/coursesPage" label="Courses"/>
        <NavBarTab path="/public" label="Professors" />
      {/*<NavBarTab path="/profile" label="Profile" />*/}
      {/*<NavBarTab path="/public" label="Public" />*/}
      {/*{isAuthenticated && (*/}
      {/*  <>*/}
      {/*    <NavBarTab path="/protected" label="Protected" />*/}
      {/*    <NavBarTab path="/admin" label="Admin" />*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
};
