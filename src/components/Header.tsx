import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <AppBar elevation={1} color="inherit" position="sticky">
        <Toolbar>
          <Typography
            fontWeight={"bold"}
            to="/"
            component={RouterLink}
            variant="h5"
          >
            Farm HQ
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
