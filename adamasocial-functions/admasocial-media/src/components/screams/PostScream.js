import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//* Redux imports
import { postScream } from '../../redux/actions/dataActions';

//*MUI stuff
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import AddIcon from '@material-ui//icons/Add';
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
 class PostScream extends Component {
  state = {
      open: false,
      errors: {},
      body: ""
  };
  componentWillReceiveProps(nextProps){
      if (nextProps.UI.errors){
          this.setState({ errors: nextProps.UI.errors});
      }
  }
  handleSubmit = (event) => {
    const newScream = {
      body: this.state.body,
    };
    this.props.postScream(newScream);
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
    this.setState({ open: false, errors: {}, body: '' });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, UI: {loading} } = this.props;
    const {errors} = this.state;
    return (
      <Fragment>
        <Tooltip title="Add a scream" color="primary">
          <IconButton  style={{color: "white"}} onClick={this.handleOpen}>
            <AddIcon  /> 
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
Post A New Scream          </DialogTitle>
          <DialogContent>
            <form className={classes.formField}>
              <TextField
                id="standard-primary"
                name="body"
                label="New Scream"
                multiline
                // helperText={errors}
                error={errors ? true : false}
                rows={3}
                variant="standard"
                value={this.state.body}
                onChange={this.handleChange}
                className={classes.textField}
                placeholder="Scream, but not too loud!"
                fullWidth
              />{' '}
             
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {' '}
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              {' '}
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  classes: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    UI: state.UI,
  };
};
const mapActionsToProps = {
  postScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostScream));
