import { ReadMore } from "@mui/icons-material";
import {
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
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

  return (
    <>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ m: 5 }}>
            Weclome to the Insider Intelligence Internal Blog!
          </Typography>
          <Typography variant="caption">
            Click the icon in the upper right to add a new post, or click on any
            of the articles below to start reading!
          </Typography>
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
