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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      searchText: "",
      searchMedia: "all",
    };
  }

  async searchItems(searchText) {
    let songInformation;
    try {
      songInformation = await axios.get(
        "https://itunes.apple.com/search?term=" + searchText
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
        {songs.map((song) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SongCard key={song.trackId} song={song}>
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
    return (
      <div>
        <Container style={{ backgroundColor: "#7FFFD4" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Search you tune</h2>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Song, Artist, Album"
                id="outlined-margin-dense"
                variant="outlined"
                value={searchText}
                onChange={this.handleSearchTextChange}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined">
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.searchItems(searchText)}
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

export default Home;
