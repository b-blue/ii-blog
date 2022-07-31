import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiInterfaceAppend } from "../api-interface/api-interface";
import LoadingArticle from "./LoadingArticle";

function Article() {
  const navigate = useNavigate();
  const params = useParams();
  const [article, setArticle] = useState();

  const getArticle = async () => {
    await axios.get(apiInterfaceAppend(params.id)).then((res) => {
      console.log(res);
      setArticle(res.data.Item)
    });
  };

  useEffect(() => {
    console.log("here")
    getArticle();
  }, []);

  return (
    <>
      {!article ? (
        <LoadingArticle />
      ) : (
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item>
            <Card sx={{ mt: 2, maxWidth: 500 }}>
              <CardMedia>
                <img src={article.Pic} alt={article.Pic} />
              </CardMedia>
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <Stack justifyContent={"flex-start"}>
                      <Typography variant={"button"}>Title</Typography>
                      <TextField
                        //inputProps={{ maxLength: limits.shortLimit }}
                        //helperText={remaining.Title}
                        name="Title"
                        defaultValue={article.Title}
                        //onChange={countdown(limits.shortLimit)}
                        //onBlur={changeValue}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant={"button"}>Author</Typography>
                      <TextField
                        //inputProps={{ maxLength: limits.shortLimit }}
                        //helperText={remaining.Author}
                        name="Author"
                        defaultValue={article.Author}
                        //onChange={countdown(limits.shortLimit)}
                        //onBlur={changeValue}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant={"button"}>Body</Typography>
                      <TextField
                        multiline
                        rows={3}
                        //inputProps={{ maxLength: limits.longLimit }}
                        //helperText={remaining.Body}
                        name="Body"
                        defaultValue={article.Body}
                        //onChange={countdown(limits.longLimit)}
                        //onBlur={changeValue}
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
                  <Button variant="outlined" color={"primary"}>
                    Save
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

export default Article;
