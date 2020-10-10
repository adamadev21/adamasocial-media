import { Grid, Typography } from '@material-ui/core';
import axios  from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import  StaticProfile from '../components/profile/StaticProfile';
import Scream from '../components/screams/Scream';
import {getUserDetails} from '../redux/actions/userActions'
import PropTypes from 'prop-types'
export class user extends Component {

    state = {
        profile: null,
        screamIdParam: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;
                this.props.getUserDetails(handle);
                this.setState({screamIdParam: screamId})
        axios.get(`http://localhost:5001/admasocial-media/us-central1/api/user/${handle}`)
        .then(res=>{
            this.setState({profile: res.data.user})
        })
        .catch(err=>{
            console.log(err)
        });
    }
    render() {
        const {screamIdParam} = this.state;
        const {screams, loading} = this.props.data;
        const screamsMarkup = loading? (<p> Please wait while we are loading the stuff</p>)
         : (
            screams===null || screams.length ===0 ? (<p>This screamer has not screamed yet </p>) 
            : (
                !screamIdParam?  (screams.map(scream=> <Scream key={scream.screamId} scream={scream} />))
        :(screams.map(scream=>{
            if (scream.screamId !== screamIdParam) return (<Scream key={scream.screamId} scream={scream} />)
        else return <Scream key={scream.screamId} scream={scream} openDialog />} 
        ))))
        return (
            <Grid container spacing={16} alignItems="center">
            <Grid item sm={8} xs={12}>
        <Typography color="textPrimary" align="center" variant='h4'>Screams by  <span color="primary"> @{this.props.match.params.handle}</span></Typography>
              {screamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile === null ? <p>Profile loading ...</p> : (
              <StaticProfile profile={this.state.profile} />

                )}
            </Grid>
          </Grid>
        )
    }
}

user.propTypes = {
    userHandle: PropTypes.string.isRequired
}
const mapStateToProps =(state)=>({
    user: state.user,
    data: state.data
});
const mapActionsToProps = {
    getUserDetails
}
export default connect(mapStateToProps, mapActionsToProps)(user);
