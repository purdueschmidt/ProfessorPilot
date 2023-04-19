import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";
import logo from './images/wings.png';

export const PageFooter = () => {
  const resourceList = [
    {
      path: "",
      label: "About",
    },
  ];

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          {/*<div className="page-footer-info__message">*/}
          {/*  <p className="page-footer-message__headline">*/}
          {/*    <span>This sample application is brought to you by&nbsp;</span>*/}
          {/*    <PageFooterHyperlink path="https://auth0.com/">*/}
          {/*      Auth0*/}
          {/*    </PageFooterHyperlink>*/}
          {/*  </p>*/}
          {/*  <p className="page-footer-message__description">*/}
          {/*    <PageFooterHyperlink path="https://auth0.com/docs/quickstarts/">*/}
          {/*      <span>*/}
          {/*        Securely implement authentication using Auth0 on any stack and*/}
          {/*        any device&nbsp;*/}
          {/*      </span>*/}
          {/*      <u>in less than 10 minutes</u>*/}
          {/*    </PageFooterHyperlink>*/}
          {/*  </p>*/}
          {/*</div>*/}
          <div className="page-footer-info__resource-list">
            {resourceList.map((resource) => (
              <div
                key={resource.path}
                className="page-footer-info__resource-list-item"
              >
                <PageFooterHyperlink path={resource.path}>
                  {resource.label}
                </PageFooterHyperlink>
              </div>
            ))}
          </div>
        </div>
        <div className="page-footer-grid__brand">
          <div className="page-footer-brand">
            <img
              className="page-footer-brand__logo"
              src={logo}
              alt=""
              width="75"
              height="48"
            />
            <PageFooterHyperlink path="">
              ProfessorPilot
            </PageFooterHyperlink>
          </div>
        </div>
      </div>
    </footer>
  );
};
