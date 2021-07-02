import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import SongCard from "../SongCard/SongCard";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  container: {
    backgroundColor: "#7FFFD4",
  },
  searchTextField: {
    width: 300,
  },
  mediaField: {
    width: 200,
  },
  buttons: {
    height: '100%',
    width: 200,
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      searchText: "",
      searchMedia: "all",
    };
  }

  async searchItems(searchText, searchMedia) {
    let songInformation;
    try {
      songInformation = await axios.get(
        "https://itunes.apple.com/search?term=" +
          searchText +
          "&media=" +
          searchMedia
      );
    } catch (error) {
      console.error(error);
    }
    this.setState({ songs: songInformation.data.results });
  }

  renderList() {
    const { songs } = this.state;
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
  }

  handleSearchMediaChange = (event) => {
    this.setState({ searchMedia: event.target.value });
  };

  handleSearchTextChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    const { searchText, searchMedia } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Search you tune</h2>
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={classes.searchTextField}
                label="Song, Artist, Album"
                id="outlined-margin-dense"
                variant="outlined"
                value={searchText}
                onChange={this.handleSearchTextChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.mediaField} variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={searchMedia}
                  onChange={this.handleSearchMediaChange}
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
                className={classes.buttons}
                variant="outlined"
                color="primary"
                onClick={() => this.searchItems(searchText, searchMedia)}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Container>
        {this.renderList()}
      </div>
    );
  }
}

export default withStyles(styles)(Home);
