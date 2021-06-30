import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
  render(){
    return(
      <Container style={{backgroundColor:'#7FFFD4'}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
           <h1>Search you tune</h1>
          </Grid>
          <Grid item xs={6}>
            <TextField
            label="Song, Artist, Album"
            id="outlined-margin-dense"
            defaultValue=""
            margin=""
            variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" color="primary">
                Search 
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default Home;