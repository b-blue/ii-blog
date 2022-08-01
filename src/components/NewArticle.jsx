import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getPublicationDate, apiSave, apiGet } from "../services/api-interface";
import LoadingArticle from "./LoadingArticle";

function NewArticle() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [newArticle, setNewArticle] = useState({
    Id: uuidv4(),
    Title: "Text",
    Author: "",
    PublicationDate: getPublicationDate(),
    Body: "",
    Pic: "",
  });
  const [article, setArticle] = useState();

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
    // only upload if all three values are filled out
    if (
      newArticle.Title.length > 0 &&
      newArticle.Author.length > 0 &&
      newArticle.Body.length > 0
    ) {
      // save author ident for future use
      localStorage.setItem("author", newArticle.Author);
      // upload article
      await apiSave(newArticle).then((success) => {
        if (success) {
          navigate("/");
        }
      });
    }
  };

  const save = async (event) => {
    event.preventDefault();
    // update publication date
    article.PublicationDate = getPublicationDate();
    await apiSave(article).then((success) => {
      if (success) {
        navigate("/article/" + article.Id);
      }
    });
  };

  const setEditMode = async () => {
    setEdit(!edit);
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

  
  useEffect(() => {
    // Let page know we're waiting for a pic
    setPicsumHandler((picsumHandler) => ({
      ...picsumHandler,
      ["loading"]: true,
    }));

    // Grab the pic and save it to the new article
    axios.get(picsumHandler.baseUrl).then((res) => {
      setNewArticle((newArticle) => ({
        ...newArticle,
        ["Pic"]:
          picsumHandler.idUrlPrefix +
          res.headers[picsumHandler.headerVal] +
          picsumHandler.idUrlSuffix,
      }));

      // Let the page know we're done.
      setPicsumHandler((picsumHandler) => ({
        ...picsumHandler,
        ["loading"]: false,
      }));
    });

    // If the user has made an entry before, get their saved name from storage.
    if (localStorage.getItem("author")) {
      setNewArticle((newArticle) => ({
        ...newArticle,
        ["Author"]: localStorage.getItem("author"),
      }));
    }
  }, []);

  return (
    <>
      {picsumHandler.loading ? (
        <LoadingArticle />
      ) : (
        <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={5} sx={{ justifyContent: "center" }}>
            <Card sx={{ mt: 2 }}>
              <CardMedia>
                <img src={newArticle.Pic} />
              </CardMedia>
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <Stack justifyContent={"flex-end"}>
                      <Typography variant="caption">
                        {newArticle.PublicationDate}
                      </Typography>
                    </Stack>
                  </Grid>
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
                        defaultValue={newArticle.Author}
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
                <Stack spacing={2} direction={"row"}>
                  <Button
                    variant="outlined"
                    color={"primary"}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                  <Button variant="outlined" color={"primary"} onClick={submit}>
                    Submit
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default NewArticle;
