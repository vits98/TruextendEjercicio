import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import useStyles from "./styles";

const millisToMinutesAndSeconds=(millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function SongCard({ song }) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            Song:{song.trackName}
          </Typography>
          <CardMedia
            className={classes.media}
            image={song.artworkUrl100}
            title="Contemplative Reptile"
          />
          <Typography variant="body2" color="textSecondary" component="p">
            Album:{song.collectionName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Duration:{millisToMinutesAndSeconds(song.trackTimeMillis)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price:${song.trackPrice}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

SongCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SongCard;
