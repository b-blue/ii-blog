import { PictureAsPdfSharp } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { apiInterface } from "../api-interface/api-interface";

function NewArticle() {
  const navigate = useNavigate();
  const [newArticle, setNewArticle] = useState({
    Id: uuidv4(),
    Title: "Text",
    Author: "",
    PublicationDate: "",
    Body: "",
    Pic: "",
  });

  const [picsumHandler, setPicsumHandler] = useState({
    loading: true,
    baseUrl: "https://picsum.photos/500/300",
    idUrlPrefix: "https://picsum.photos/id/",
    idUrlSuffix: "/500/300",
    headerVal: "picsum-id",
  });

  const [limits, setLimits] = useState({ shortLimit: 50, longLimit: 1000 });
  const [remaining, setRemaining] = useState({
    Title: "50 chars",
    Author: "50 chars",
    Body: "1000 chars",
  });

  // On submit, article is uploaded
  const submit = async (e) => {
    e.preventDefault();
    await axios.put(apiInterface.route, newArticle).then((res) => {
      console.log(res);
    });
  };

  // When control loses focus, value is updated
  const changeValue = (event) => {
    const { name, value } = event.target;
    setNewArticle((newArticle) => ({
      ...newArticle,
      [name]: value,
    }));
    console.log(newArticle);
  };

  // Twitter-like "chars remaining" indicator
  const countdown = (max) => (event) => {
    const { name, value } = event.target;
    let textLength = value.length;
    setRemaining((remaining) => ({
      ...remaining,
      [name]: (max - textLength).toString() + " chars",
    }));
  };

  // Quick processing to get the pic url for this post
  useEffect(() => {
    setPicsumHandler((picsumHandler) => ({
      ...picsumHandler,
      ["loading"]: true,
    }));

    axios.get(picsumHandler.baseUrl).then((res) => {
      setNewArticle((newArticle) => ({
        ...newArticle,
        ["Pic"]:
          picsumHandler.idUrlPrefix +
          res.headers[picsumHandler.headerVal] +
          picsumHandler.idUrlSuffix,
      }));
      setPicsumHandler((picsumHandler) => ({
        ...picsumHandler,
        ["loading"]: false,
      }));
    });
  }, []);

  return (
    <>
      {picsumHandler.loading ? (
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item >
            <Grid container sx={{mt:2, maxWidth:500}}>
              <Grid item xs={12}>
                <Skeleton
                  variant="rectangular"
                  width={500}
                  height={300}
                ></Skeleton>
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="text" height={100}></Skeleton>
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="text" height={100}></Skeleton>
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={150}></Skeleton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item>
            <Card sx={{ mt: 2, maxWidth: 500 }}>
              <CardMedia>
                <img src={newArticle.Pic} />
              </CardMedia>
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <Stack justifyContent={"flex-start"}>
                      <Typography variant={"button"}>Title</Typography>
                      <TextField
                        inputProps={{ maxLength: limits.shortLimit }}
                        helperText={remaining.Title}
                        name="Title"
                        onChange={countdown(limits.shortLimit)}
                        onBlur={changeValue}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant={"button"}>Author</Typography>
                      <TextField
                        inputProps={{ maxLength: limits.shortLimit }}
                        helperText={remaining.Author}
                        name="Author"
                        onChange={countdown(limits.shortLimit)}
                        onBlur={changeValue}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant={"button"}>Body</Typography>
                      <TextField
                        multiline
                        rows={3}
                        inputProps={{ maxLength: limits.longLimit }}
                        helperText={remaining.Body}
                        name="Body"
                        onChange={countdown(limits.longLimit)}
                        onBlur={changeValue}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button onClick={() => navigate(-1)}>Back</Button>
                <Button onClick={submit}>Submit</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default NewArticle;
