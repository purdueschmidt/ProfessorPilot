import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from "@mui/material/Button";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button sx={{margin:2, padding:1}} variant="contained"  onClick={handleLogout} color="secondary">
      Log Out
    </Button>
  );
};
