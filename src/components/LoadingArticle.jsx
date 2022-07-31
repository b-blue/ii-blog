import React from "react";
import { Grid, Skeleton } from "@mui/material";

function LoadingArticle() {
  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item>
        <Grid container sx={{ mt: 2, maxWidth: 500 }}>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width={500} height={300}></Skeleton>
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
  );
}

export default LoadingArticle;
