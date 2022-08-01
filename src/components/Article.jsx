import { Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  apiDelete,
  apiGet,
  apiSave,
  getPublicationDate,
} from "../services/api-interface";
import LoadingArticle from "./LoadingArticle";

function Article() {
  const navigate = useNavigate();
  const params = useParams();
  const [article, setArticle] = useState();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [limits, setLimits] = useState({ shortLimit: 50, longLimit: 1000 });
  const [remaining, setRemaining] = useState({});

  // Toggles edit mode
  const setEditMode = async () => {
    setEdit(!edit);
  };

  // When control loses focus, value is updated
  const changeValue = (event) => {
    const { name, value } = event.target;
    setArticle((article) => ({
      ...article,
      [name]: value,
    }));
  };

  // Twitter-like "chars remaining" indicator
  const countdown = (max) => (event) => {
    const { name, value } = event.target;
    let textLength = value.length;
    setRemaining((remaining) => ({
      ...remaining,
      [name]: (max - textLength).toString() + "/" + max + " chars",
    }));
  };

  useEffect(() => {
    apiGet(params.id).then((val) =>
      setArticle(val)
    );
  }, []);

  const saveArticle = async (event) => {
    event.preventDefault();
    // update publication date
    article.PublicationDate = getPublicationDate();
    await apiSave(article).then((success) => {
      if (success) {
        window.location.reload();
      }
    });
  };

  // Opens the delete confirmation modal popup
  const openDeleteDialog = () => {
    setOpen(true);
  };

  // Closes the delete confirmation modal popup
  const closeDeleteDialog = () => {
    setOpen(false);
  };

  // Deletes this article after user agrees.
  const deleteArticle = async () => {
    apiDelete(article.Id).then((val) => {
      console.log(val);
      navigate("/");
    });
  };

  return (
    <>
      {!article ? (
        <LoadingArticle />
      ) : (
        <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={5} sx={{ justifyContent: "center" }}>
            <Card sx={{ mt: 2 }}>
              <CardMedia>
                <img src={article.Pic} alt={article.Pic} />
              </CardMedia>
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <Stack>
                      {!edit && (
                        <>
                          <Stack spacing={1}>
                            <Typography variant={"caption"}>
                              {article.PublicationDate}
                            </Typography>
                            <Stack
                              direction={"row"}
                              spacing={1}
                              justifyContent={"center"}
                            >
                              <Typography variant={"h5"}>
                                {article.Title}
                              </Typography>
                              <Typography variant={"h6"}>
                                by {article.Author}
                              </Typography>
                            </Stack>
                          </Stack>
                        </>
                      )}
                      {edit && (
                        <>
                          <Typography variant={"button"}>Title</Typography>
                          <TextField
                            inputProps={{ maxLength: limits.shortLimit }}
                            helperText={remaining.Title}
                            name="Title"
                            defaultValue={article.Title}
                            onChange={countdown(limits.shortLimit)}
                            onBlur={changeValue}
                          />
                          <Typography variant={"button"}>Author</Typography>
                          <TextField
                            inputProps={{ maxLength: limits.shortLimit }}
                            helperText={remaining.Author}
                            name="Author"
                            defaultValue={article.Author}
                            onChange={countdown(limits.shortLimit)}
                            onBlur={changeValue}
                          />
                        </>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack sx={{ mt: 2 }}>
                      {!edit && (
                        <>
                          <Typography variant={"body1"}>
                            {article.Body}
                          </Typography>
                        </>
                      )}
                      {edit && (
                        <>
                          <Typography variant={"button"}>Body</Typography>
                          <TextField
                            multiline
                            rows={3}
                            inputProps={{ maxLength: limits.longLimit }}
                            helperText={remaining.Body}
                            name="Body"
                            defaultValue={article.Body}
                            onChange={countdown(limits.longLimit)}
                            onBlur={changeValue}
                          />
                        </>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container sx={{ justifyContent: "space-between" }}>
                  <Grid item xs={6} justifyContent={"flex-start"}>
                    <Stack spacing={2} direction={"row"}>
                      <Button
                        variant="outlined"
                        color={"primary"}
                        onClick={() => navigate(-1)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="outlined"
                        color={"primary"}
                        onClick={saveArticle}
                      >
                        Save
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{ alignItems: "center", justifyContent: "flex-end" }}
                    >
                      <Switch checked={edit} onChange={setEditMode} />
                      <Typography variant="button">Edit Mode</Typography>
                      {/* Delete button */}
                      <IconButton onClick={openDeleteDialog}>
                        <Delete />
                      </IconButton>
                      <Dialog open={open} onClose={closeDeleteDialog}>
                        <DialogTitle>
                          Are you sure you want to delete {article.Title}?
                        </DialogTitle>
                        <DialogContent>
                          This operation cannot be undone. Are you sure you want
                          to delete this article?
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={closeDeleteDialog}>No</Button>
                          <Button onClick={deleteArticle} autoFocus>
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      {/* End delete button */}
                    </Stack>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Article;
