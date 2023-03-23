import React from "react";
import { FooterTabs } from "./footer-tabs";

export const Footer = () => {
  return (
    <div className="page-footer">
      <nav className="page-footer-grid">
        <FooterTabs/>
      </nav>
    </div>
  );
};
