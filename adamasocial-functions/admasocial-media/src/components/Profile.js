import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//* Redux imports
import { uploadProfileImage } from '../redux/actions/userActions';
import { logoutUser, editUserDetails } from '../redux/actions/userActions';

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

//* style classes
const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      'textAlign': 'center',
      'position': 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
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
export class Profile extends Component {
  componentDidMount() {
    console.log("");
    console.log(localStorage.FBIdToken)
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadProfileImage(formData);
  };
  handleEditImage = () => {
    let fileInput = document.getElementById('edit-image');
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: {
        credentials: {
          handle,
          createdAt,
          imageUrl,
          bio,
          website,
          location,
        },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                onChange={this.handleImageChange}
                hidden="hidden"
                id="edit-image"
              />
              <Tooltip title="Edit profile image" color="green" position="top">
                <Button>
                  <EditIcon
                    color="primary"
                    onClick={this.handleEditImage}
                    className={classes.button}
                  />
                </Button>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink variant="h5" to={`/user/${handle}`} Component={Link}>
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
            <Fragment>
              <Tooltip title="Logout" color="primary">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleLogout}
                >
                  <KeyboardArrowLeft /> Logout{' '}
                </Button>
              </Tooltip>
  
            <EditUserDetails/>
            </Fragment>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2">
            You haven't logged in yet Log in to see your profile
          </Typography>
          <Button
            className={classes.buttons}
            variant="contained"
            color="primary"
            component={Link}
            to={`/login`}
          >
            Login
          </Button>
          <Button
            className={classes.buttons}
            variant="contained"
            color="secondary"
            component={Link}
            to={`/signup`}
          >
            Sign Up!
          </Button>
        </Paper>
      )
    ) : (
      <p>Loading ...Please wait, sir</p>
    );
    return profileMarkup;
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  uploadProfileImage,
  logoutUser, editUserDetails
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
