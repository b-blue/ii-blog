import React from "react";
import logo from "../logo.svg";
import "../App.css";
import { Stack, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams} from "react-router-dom";
import { AddComment } from "@mui/icons-material";

function Header() {
  const navigate = useNavigate();
  const params = useParams();

  const navigateTo = (event) => {
    navigate(event.currentTarget.name);
  };

  return (
    <header className="App-header">
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        <IconButton color="primary" name="/" onClick={navigateTo}>
          <img src={logo} className="App-logo" alt="logo" />
        </IconButton>
        <Typography variant="h6">i3 blog</Typography>
      </Stack>
      <Stack>
        <IconButton color="primary" name="/article" onClick={navigateTo}>
          <AddComment sx={{fontSize:40}} />
        </IconButton>
      </Stack>
    </header>
  );
}

export default Header;
