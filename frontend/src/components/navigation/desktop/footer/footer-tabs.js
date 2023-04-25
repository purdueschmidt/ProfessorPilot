import React from "react";
import { FooterTab } from "./footer-tab";
import { ButtonGroup, Container, Grid } from "@mui/material";

export const FooterTabs = () => {
  // const { isAuthenticated } = useAuth0();

  return (

      <Container>
        <FooterTab path="/" label="Home" />
        <FooterTab path="https://github.com/purdueschmidt/ProfessorPilot" label="Github" />
        {/*<NavBarTab path="/profile" label="Profile" />*/}
        {/*<NavBarTab path="/public" label="Public" />*/}
        {/*{isAuthenticated && (*/}
        {/*  <>*/}
        {/*    <NavBarTab path="/protected" label="Protected" />*/}
        {/*    <NavBarTab path="/admin" label="Admin" />*/}
        {/*  </>*/}
        {/*)}*/}
      </Container>
                
  );
};