import React, { useState, useContext } from "react";

import { NasaContext } from "../Context";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 360,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    margin: "1rem",
  },
});

export const Gallery = (props) => {
  const classes = useStyles();
  const { value1, value2 } = useContext(NasaContext);
  const [gallery, setGallery] = value1;

  return (
    gallery.lenght !== 0 && (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}>
        {gallery.map((item, index) => {
          return (
            <Card className={classes.root} variant="outlined">
              <CardActionArea
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={item.url}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" variant="outlined">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    )
  );
};
