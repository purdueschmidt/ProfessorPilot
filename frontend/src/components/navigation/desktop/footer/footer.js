import React from "react";
import { FooterTabs } from "./footer-tabs";
import Paper from "@mui/material/Paper";

export const Footer = () => {
  return (
    <div className="page-footer">
      <Paper elevation={3} display='flex' color="primary">
        <nav className="page-footer-grid">
          <FooterTabs/>
        </nav>
      </Paper>
    </div>
  );
};
