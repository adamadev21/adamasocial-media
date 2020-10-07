import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//* Redux imports
import {connect} from 'react-redux'
import { deleteScream } from '../../redux/actions/dataActions';

//*MUI stuff
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import DeleteIcon from '@material-ui//icons/DeleteOutline';
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
export class DeleteButton extends Component {
    state = {
        open: false,
      };
    handleDelete=()=>{
this.props.deleteScream(this.props.screamId);
this.handleClose();
    }
  //*Open the form when the button is clicked

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };


  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit your Profile" color="primary">
          <IconButton className="" onClick={this.handleOpen}>
            <DeleteIcon /> <span>Delete</span>
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
Do you really want to delete this scream?          </DialogTitle>
          <DialogContent>
        
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {' '}
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="secondary">
              {' '}
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapActionsToProps = {
  deleteScream
};
export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(DeleteButton));
