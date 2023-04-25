import React, { useState } from "react";
import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";
import { NavBarTabs } from "./nav-bar-tabs";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Container, ListItemButton, ListItemText, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Container>
        <AppBar position="fixed" color="primary" sx={{ xs: "flex" }}>
          <Toolbar disableGutters>
            <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

                <NavBarTabs />
                <NavBarButtons />

              </Menu>
            </Box>
            <Box>
              <NavBarBrand />
            </Box>
            <Box>
              <Typography color="secondary" variant="h3">Professor Pilot</Typography>
            </Box>

          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
};