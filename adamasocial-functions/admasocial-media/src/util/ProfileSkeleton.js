import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import noImg from '../myImages/noImg.png'
//*Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
//*MUI stuff
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
const styles = {
    paper: {
        padding: 20,
        position: "absolute",
        top: "10%"
      },
      profile: {
        '& .image-wrapper': {
          'textAlign': 'center',
          'position': 'relative',
          '& button': {
            position: 'absolute',
            top: '90%',
            left: '70%',
          },
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%',
        },
        '& .profile-details': {
          'textAlign': 'center',
          '& span, svg': {
            verticalAlign: 'middle',
          },
          '& a': {
            color: '#00bcd4',
          },
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0',
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      buttons: {
        'textAlign': 'center',
        '& a': {
          margin: '20px 10px',
        },
      },
    fullLine: {
        height: 15,
        width: "90%",
        backgroundColor: "rgb(0,0,0,.1)",
        marginBottom: 2
    },
    halfLine: {
        height: 15,
        width: "40%",
        backgroundColor: "rgb(0,0,0,.1)",
        marginBottom: 1
    }
}
const  ProfileSkeleton =(props) =>{
    const {classes} = props;
    return (
        <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={noImg} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
<div  className={classes.fullLine} />
            <hr />

            <div  className={classes.fullLine} />
            <div  className={classes.fullLine} />

            <hr />
          
              <Fragment>
                <LinkIcon color="primary" /> <a>http:website.com</a>
              </Fragment>
            
            <hr />
            <Fragment>
              <CalendarToday color="primary" />{' '}
              <span>Joined </span>
            </Fragment>
          </div>
 
        </div>
      </Paper>
    )
}
export default  withStyles(styles)(ProfileSkeleton)