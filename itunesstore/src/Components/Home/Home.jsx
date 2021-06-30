import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SongCard from '../SongCard/SongCard';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: []
    }
  }

  async searchItems() {
    let songInformation
    try {
      songInformation = await axios.get("https://itunes.apple.com/search?term=AuronPlay")
    } catch (error) {
      console.error(error);
    }
    this.setState({ songs: songInformation.data.results })
  }

  renderList() {
    const { songs } = this.state;

    return (
      <Grid container >
        {songs.map((song) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <SongCard key={song.trackId} song={song}> </SongCard>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  render() {
    const { songs } = this.state;
    console.log(songs);
    return (
      <div>
        <Container style={{ backgroundColor: '#7FFFD4' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1>Search you tune</h1>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Song, Artist, Album"
                id="outlined-margin-dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" onClick={() => this.searchItems()}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Container>
        {this.renderList()}
      </div>
    )
  }
}

export default Home;