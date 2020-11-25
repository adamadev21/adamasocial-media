import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//* Redux imports
import { uploadProfileImage } from '../../redux/actions/userActions';
import { logoutUser, editUserDetails } from '../../redux/actions/userActions';

//*MUI stuff
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
//*Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import EditUserDetails  from './EditUserDetails';
import Axios from 'axios';
import { Grid } from '@material-ui/core';
import { Email } from '@material-ui/icons';
//* style classes
const styles = (theme) => ({
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
  });

const StaticProfile =(props) =>{
    const {profile:{ imageUrl, handle, createdAt,}, classes} = props;
    const bio = "I am the greatest terrorist alive"
    const website = 'https://nazagmda.com'
    const location =' Ouagadougou'
        return (

          <Grid container spacing={3}>
            <Grid item className={classes.profile}>
              <div className="image-wrapper">
                <img src={imageUrl} alt="profile" className="profile-image" />
        
              </div>
              <hr />
              <Button color='primary' variant='contained'>
                <Email /> Message
              </Button>
             
            </Grid>
            <Grid item xs={6}>
            <div className="profile-details">
                <MuiLink variant="h5" to={`/users/${handle}`} Component={Link}>
                  @{handle}
                </MuiLink>
                <hr />
                {bio && <Typography variant="body2">{bio}</Typography>}
                {location && (
                  <Fragment>
                    <LocationOn color="primary" /> <span>{location}</span>
                  </Fragment>
                )}
                <hr />
                {website && (
                  <Fragment>
                    <LinkIcon color="primary" /> <a>{website}</a>
                  </Fragment>
                )}
                <hr />
                <Fragment>
                  <CalendarToday color="primary" />{' '}
                  <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </Fragment>
              </div>
            </Grid>
          </Grid>

        ) 
        
    }
export default withStyles(styles)(StaticProfile)
