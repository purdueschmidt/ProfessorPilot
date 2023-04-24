import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {App} from "./app";
import {Auth0ProviderWithNavigate} from "./auth0-provider-with-navigate";
import {ThemeProvider, createTheme} from "@mui/material";
import {StaticRouter} from "react-router-dom/server";
import * as PropTypes from "prop-types";
// import "./styles/styles.css";


const container = document.getElementById("root");
const root = createRoot(container);

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#003831',
            light: '#2a5c4b',
            dark: '#00201f',
        },
        secondary: {
            main: '#efb21e',
            light: '#ffca4b',
            dark: '#c58600',
        },
        background: {
            default: 'rgba(234,234,197,0.75)',
            paper: '#eaeac5',
        },
        info: {
            main: '#1976d2',
            light: '#63a4ff',
            dark: '#004ba0',
        },
        divider: '#9c824a',
        text: {
            primary: '#0c0c0c',
            secondary: '#616161',
            disabled: '#9e9e9e',
        },
        warning: {
            main: '#ffa000',
            dark: '#c67100',
            light: '#ffd149',
        },
    },
    typography: {
        fontFamily: 'Oswald',
    }
})

root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>

            <BrowserRouter >
                <Auth0ProviderWithNavigate>
                    <App/>
                </Auth0ProviderWithNavigate>
            </BrowserRouter>

        </React.StrictMode>
    </ThemeProvider>
);
