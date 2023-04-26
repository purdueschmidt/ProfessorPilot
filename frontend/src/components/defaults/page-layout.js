import React from "react";
import Container from '@mui/material/Container';
import { NavBar } from "../navigation/desktop/navbar/nav-bar";
import { MobileNavBar } from "../navigation/mobile/mobile-nav-bar";
import { Footer } from "../navigation/desktop/footer/footer";
import { Box } from "@mui/material";

export const PageLayout = ({ children }) => {
  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: (theme) => theme.palette.background.default,
      }}
    >
      <NavBar />
      <Box sx={{ marginTop: "110px" }} flexGrow={1}>
        <div className="page-layout__content">{children}</div>
      </Box>
      <Footer />
    </Box>

  );
};
