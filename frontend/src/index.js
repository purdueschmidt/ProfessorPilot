import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import "./styles/styles.css";


const container = document.getElementById("root");
const root = createRoot(container);

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#26c6da",
      light: "#6ff9ff",
      dark: "#0095a8",
    },
    secondary: {
      main: "#ab47bc",
      light: "#df78ef",
      dark: "#790e8b",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    info: {
      main: "#2196f3",
      light: "#6ec6ff",
      dark: "#0069c0",
    },
    divider: "#757575",
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
      disabled: "#757575",
    },
    warning: {
      main: "#ff9800",
      dark: "#c66900",
      light: "#ffc947",
    },
  },
  typography: {
    fontFamily: "Oswald",
    h1: {
      color: "#ffffff",
    },
    h2: {
      color: "#ffffff",
    },
    h3: {
      color: "#ffffff",
    },
    h4: {
      color: "#ffffff",
    },
    h5: {
      color: "#ffffff",
    },
    h6: {
      color: "#ffffff",
    },
  },
});


root.render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Auth0ProviderWithNavigate>
            <App/>
          </Auth0ProviderWithNavigate>
        </BrowserRouter>
        </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>
);
