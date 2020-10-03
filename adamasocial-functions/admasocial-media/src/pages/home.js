import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import axios  from 'axios';
import Scream  from '../components/Scream';
import Profile from  '../components/Profile'
import store from '../redux/store/store';
import { getUserData } from '../redux/actions/userActions';
export class Home extends Component {
state = {
    screams: null
}

//loadad screa
componentDidMount() {
    axios.get('http://localhost:5001/admasocial-media/us-central1/api/screams')
    .then(res=> {
this.setState({screams: res.data});
console.log(res)
store.dispatch(getUserData())
    })
    .catch(err=>{
        console.log("error:", err.response)
    });
}
  render() {
      let screamMarkup = this.state.screams ? (
          this.state.screams.map(scream=>{
              return (
<Scream key={scream.sreamId} scream={scream}/>
              )
          })
      ) : <p>Loading ...</p>
    return (
      <Grid container spacing={10} alignItems="center">
        <Grid item sm={6} xs={10} >
       {screamMarkup}
      
        </Grid>
        <Grid item sm={4} xs={10}>
<Profile />
      
        </Grid>
      </Grid>
    );
  }
}

export default Home;
