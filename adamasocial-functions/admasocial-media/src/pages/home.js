import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import axios  from 'axios';
import Scream  from '../components/Scream';


export class Home extends Component {
state = {
    screams: null
}

//loadad screa
componentDidMount() {
    axios.get('http://localhost:5001/admasocial-media/us-central1/api/screams')
    .then(res=> {
        console.log("res is", res.data)
this.setState({screams: res.data});
console.log(res)
    })
    .catch(err=>{
        console.log("error:", err.response)
    });
}
  render() {
      let screamMarkup = this.state.screams ? (
          this.state.screams.map(scream=>{
              return (
<Scream key={scream.id} scream={scream}/>
              )
          })
      ) : <p>Loading ...</p>
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
       {screamMarkup}
      
        </Grid>
        <Grid item sm={4} xs={12}>
       <p>
       Profile ...
       </p>
      
        </Grid>
      </Grid>
    );
  }
}

export default Home;
