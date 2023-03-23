import React from "react";
import { NavBar } from "./navigation/desktop/nav-bar";
import { MobileNavBar } from "./navigation/mobile/mobile-nav-bar";
import { Footer } from  "./navigation/desktop/footer";


export const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      <MobileNavBar />
      <div className="page-layout__content">{children}</div>
      <Footer />
    </div>
  );
};
