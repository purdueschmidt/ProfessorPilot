import React from "react";
import { FooterTab } from "./footer-tab";

export const FooterTabs = () => {
  // const { isAuthenticated } = useAuth0();

  return (
    <div className="page-footer-grid">
        <div className="page-footer-grid-info">
            <div className="page-footer-info__resource-list">
                    <FooterTab className="page-footer-info__resource-list-item" path="/" label="Home" />
                    <FooterTab className="page-footer-info__resource-list-item" path="/public" label="About us" />
                    <FooterTab className="page-footer-info__resource-list-item" path="/public" label="Contact" />
                    <FooterTab className="page-footer-hyperlink" path="https://github.com/purdueschmidt/ProfessorPilot" label="Github" />
                    {/*<NavBarTab path="/profile" label="Profile" />*/}
                    {/*<NavBarTab path="/public" label="Public" />*/}
                    {/*{isAuthenticated && (*/}
                    {/*  <>*/}
                    {/*    <NavBarTab path="/protected" label="Protected" />*/}
                    {/*    <NavBarTab path="/admin" label="Admin" />*/}
                    {/*  </>*/}
                    {/*)}*/}
            </div>
        </div>
    </div>
                
  );
};