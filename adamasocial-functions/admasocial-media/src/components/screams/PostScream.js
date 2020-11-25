import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//* Redux imports
import { postScream } from "../../redux/actions/dataActions";

//*MUI stuff
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import AddIcon from "@material-ui//icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { Input, InputAdornment } from "@material-ui/core";
import { PhotoLibrary } from "@material-ui/icons";
import { storage } from "../../util/firebase";

const styles = {
  button: {
    color: "inherit",
  },
  textField: {
    display: "block",
  },
  formField: {
    display: "",
  },
};
class PostScream extends Component {
  state = {
    open: false,
    errors: {},
    body: "",
    imageUrl: null,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    const  newScream ={
        body: this.state.body,
        author: this.props.fullName,
        imageUrl: this.state.imageUrl,
      }
       this.props.postScream(newScream);
    this.handleClose();
    event.preventDefault();
  };
  //*Open the form when the button is clicked

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    event.preventDefault();
  };
  handleClose = () => {
    this.setState({ open: false, errors: {}, body: "" });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleImage = () => {
    document.getElementById("picture").click();
  };
  handleUpload = (event) => {
    const image = event.target.files[0];
    const fileName  = `${Math.round(Math.random()*10000000)}.png`
    const ref = storage.ref(`images/${fileName}`);
    ref.put(image).on(
      "changed_state0",
      (snapshot) => console.log(snapshot.bytesTransferred),
      (err) => console.log(err),
      () => ref.getDownloadURL().then((url) => this.setState({ imageUrl: url }))
    );
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    const image =this.state.imageUrl ? <div dangerouslySetInnerHTML={{ __html: `<img src=${this.state.imageUrl} />`}} /> : null
    return (
      <Fragment>
        <Tooltip title="Add a scream" color="primary">
          <IconButton style={{ color: "white" }} onClick={this.handleOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Post A New Scream </DialogTitle>
          <DialogContent>
            <form className={classes.formField}>
              <TextField
                id="standard-primary"
                name="body"
                label="New Scream"
                multiline
                error={errors ? true : false}
                rows={4}
                variant="outlined"
                value={this.state.body}
                onChange={this.handleChange}
                className={classes.textField}
                contentEditable
                placeholder='fsa'
                fullWidth
              ></TextField>{" "}
              <input
                onChange={this.handleUpload}
                type="file"
                id="picture"
                hidden="hidden"
                accept="image/*"
                style={{ display: "none" }}
              />{" "}
              <img  style={{display: "block", height: 100, width: 150}} src={this.state.imageUrl} alt="Photo will appear here" hidden={this.state.imageUrl ? false : true}/>
              <PhotoLibrary
                onClick={this.handleImage}
                style={{ bottom: "10%", marginTop: 30, position: "absolute" }}
                color="primary"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {" "}
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              {" "}
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
    fullName: state.user.credentials.fullName,
  };
};
const mapActionsToProps = {
  postScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostScream));
