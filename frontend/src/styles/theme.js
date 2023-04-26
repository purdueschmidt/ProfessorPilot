/* @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap"); */

/* Theme */
/* 
:root {
  --orange: #ff4f40;
  --indigo: #635dff;
  --white: #fff;
  --light-aluminium: #eaecee;
  --aluminium: #bdc4cf;
  --dark-aluminium: #2a2e35;
  --black: #000000;
  --yellow: #ebca40;
  --mandarine: #ff7f38;
  --pink: #ff44dd;
  --blue: #3885ff;
  --aqua: #3ec6eb;
  --emerald: #1bc99f;

  --yellow-mandarine-gradient: linear-gradient(
    153.07deg,
    var(--yellow) -2.47%,
    var(--mandarine) 102.78%
  );

  --mandarine-orange-gradient: linear-gradient(
    153.07deg,
    var(--mandarine) -2.47%,
    var(--orange) 102.78%
  );

  --pink-yellow-gradient: linear-gradient(
    153.07deg,
    var(--pink) -2.47%,
    var(--yellow) 102.78%
  );

  --pink-indigo-gradient: linear-gradient(
    153.07deg,
    var(--pink) -2.47%,
    var(--indigo) 102.78%
  );

  --indigo-aqua-gradient: linear-gradient(
    153.07deg,
    var(--indigo) -2.47%,
    var(--aqua) 102.78%
  );

  --blue-aqua-gradient: linear-gradient(
    153.07deg,
    var(--blue) -2.47%,
    var(--aqua) 102.78%
  );

  --aqua-emerald-gradient: linear-gradient(
    153.07deg,
    var(--aqua) -2.47%,
    var(--emerald) 102.78%
  );

  --emerald-yellow-gradient: linear-gradient(
    153.07deg,
    var(--emerald) -2.47%,
    var(--yellow) 102.78%
  );

  --font-primary: "Inter", sans-serif;
  --font-secondary: "Space Grotesk", sans-serif;
  --font-mono: "Fira Code", monospace;
} */
import { createTheme } from "@mui/material";

export const theme = createTheme({
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
      default: '#eaeac5bf',
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