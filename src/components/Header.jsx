import React from "react";
import logo from "../img/logo128.png";
import addArticle from "../img/add128.png";
import "../App.css";
import { Stack, IconButton, Typography, Tooltip } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const navigateTo = (event) => {
    navigate(event.currentTarget.name);
  };

  return (
    <header className="App-header">
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        <Tooltip title="Back to all articles">
          <IconButton name="/" onClick={navigateTo}>
            <img src={logo} className="App-logo" alt="logo" />
            <Typography
              variant="h5"
              sx={{ ml: 1, color: "primary.contrastText" }}
            >
              i3 blog
            </Typography>
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack>
        <Tooltip title="Add new article">
          <IconButton
            sx={{ height: "20px" }}
            color="secondary"
            name="/new"
            onClick={navigateTo}
          >
            <img
              src={addArticle}
              width={"100%"}
              height={"50vh"}
              alt="addArticle"
            />
          </IconButton>
        </Tooltip>
      </Stack>
    </header>
  );
}

export default Header;
