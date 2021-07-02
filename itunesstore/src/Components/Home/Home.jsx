import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import SongCard from "../ItemCard/SongCard";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useStyles from "./styles";
import { MAIN_URL } from "../../Routes/Routes.js";

const Home = () => {

  const [songs, setSongs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchMedia, setSearchMedia] = useState("all");
  const styles = useStyles();

  const searchItems = async (searchText, searchMedia) => {
    let songInformation;
    try {
      songInformation = await axios.get(
        MAIN_URL + searchText + "&media=" + searchMedia
      );
    } catch (error) {
      console.error(error);
    }
    setSongs(songInformation.data.results);
  };

  const renderList = () => {
    return (
      <Grid container>
        {songs.map((song, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SongCard key={index + song.trackName} song={song}>
                {" "}
              </SongCard>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const handleSearchMediaChange = (event) => {
    setSearchMedia(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <Container className={styles.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Search you tune</h2>
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={styles.buttons}
              label="Song, Artist, Album"
              id="outlined-margin-dense"
              variant="outlined"
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl className={styles.buttons} variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={searchMedia}
                onChange={handleSearchMediaChange}
                label="Name"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="movie">Movie</MenuItem>
                <MenuItem value="podcast">Podcast</MenuItem>
                <MenuItem value="music">Music</MenuItem>
                <MenuItem value="musicVideo">Music Video</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button
              className={styles.buttons}
              variant="outlined"
              color="primary"
              onClick={() => searchItems(searchText, searchMedia)}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
      {renderList()}
    </div>
  );
};

export default Home;
