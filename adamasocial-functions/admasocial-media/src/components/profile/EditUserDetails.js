import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//* Redux imports
import { editUserDetails } from '../../redux/actions/userActions';

//*MUI stuff
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import EditIcon from '@material-ui//icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  button: {
    color: 'inherit',
  },
  textField: {
    display: 'block',
  },
  formField: {
    display: 'flex',
  },
};
export class EditUserDetails extends Component {
  state = {
    location: '',
    bio: '',
    website: '',
    open: false,
  };
  handleSubmit = (event) => {
    const userDetails = {
      location: this.state.location,
      bio: this.state.bio,
      website: this.state.website,
    };
    alert(this.state)
    console.log(this.state)
    this.props.editUserDetails(userDetails);
    this.handleClose();
  event.preventDefault()
  };
  //*Open the form when the button is clicked

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    event.preventDefault()
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  mapCredentialsToState = (credentials) => {
    this.setState({
      location: credentials.location ? credentials.location : '',
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
    });
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
    this.mapCredentialsToState(this.props.credentials);
  };
  componentDidMount = () => {
    console.log(this.props);
    //       const {credentials} = this.props;
    this.mapCredentialsToState(this.props.credentials);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit your Profile" color="primary">
          <IconButton className="" onClick={this.handleOpen}>
            <EditIcon /> <span>Edit Profile</span>
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            You are changing your information. Make sure it is accurate
          </DialogTitle>
          <DialogContent>
            <form className={classes.formField}>
              <TextField
                id="standard-primary"
                name="bio"
                label="Bio"
                multiline
                rows={3}
                variant="standard"
                value={this.state.bio}
                onChange={this.handleChange}
                className={classes.textField}
                placeholder="Short description of yourself"
                fullWidth
              />{' '}
              <TextField
                id="standard-primary"
                name="location"
                label="Location"
                variant="standard"
                value={this.state.location}
                onChange={this.handleChange}
                className={classes.textField}
                fullWidth
              />
              <TextField
                id="standard-secondary"
                name="website"
                label="Website"
                variant="standard"
                value={this.state.website}
                className={classes.textField}
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {' '}
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              {' '}
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditUserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  credentials: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  console.log('state is', state);
  return {
    credentials: state.user.credentials,
  };
};
const mapActionsToProps = {
  editUserDetails,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(EditUserDetails));
