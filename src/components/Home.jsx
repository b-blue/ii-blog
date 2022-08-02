import { ReadMore } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetAll } from "../services/api-interface";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiGetAll().then((val) => setPosts(val));
  }, []);

  const readArticle = (event) => {
    navigate("/article/" + event.currentTarget.name);
  };

  const filter = (event) => {
    const query = event.currentTarget.value;
    if (query.length > 0) {
      setPosts(
        posts.filter((post) =>
          post.Title.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else if (query.length <= 0) {
      apiGetAll().then((val) => setPosts(val));
    }
  };

  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ m: 2 }}>
            Welcome to the Blog!
          </Typography>
          <Typography variant="caption">
          This application is a simple blog running on a React frontend backed by AWS API Gateway and a Lambda controller persisting to a DynamoDB table. You can click the icon in the upper right to add a new post, search for an article from the list below, or click on any of the articles listed to start reading!
          </Typography>
          <Grid container sx={{ mt:2, mb:2, justifyContent: "center" }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                placeholder={"Search for an article..."}
                onChange={filter}
              />
            </Grid>
          </Grid>

          <Divider />
        </Grid>
        <Grid item>
          <ImageList sx={{ width: "100%", height: "auto" }}>
            {posts.map((item) => (
              <ImageListItem key={item.Id}>
                <img src={item.Pic} alt={item.title} />
                <ImageListItemBar
                  title={<Typography>{item.Title}</Typography>}
                  subtitle={item.Author}
                  actionIcon={
                    <IconButton name={item.Id} onClick={readArticle}>
                      <ReadMore
                        sx={{ pr: 2, fontSize: "2.5rem", color: "#fff" }}
                      />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
