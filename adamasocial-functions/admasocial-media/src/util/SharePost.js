import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Share } from "@material-ui/icons";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Scream from "../components/screams/Scream";
import {shareScream} from "../redux/actions/dataActions"
export class SharePost extends Component {
  state = { open: false, body: "" };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleSubmit = () => {
    const post = {
      body: this.state.body,
      author: this.props.user.fullName,
      screamId: this.props.scream.screamId,
    };
    this.props.shareScream(post)
    this.setState({open: false})
  };
  handleChange = (e) => {
    this.setState({ body: e.target.value });
  };
  render() {
    const { scream , isMobile} = this.props;
    return (
      <Fragment>
        <IconButton color="primary" onClick={this.handleOpen}>
          <Share />
        </IconButton>
        <Dialog open={this.state.open} fullWidth>
          <DialogTitle>
            <Typography> You are share another's post</Typography>
            <hr />
          </DialogTitle>
          <DialogContent>
            <TextField
              multiline
              variant="outlined"
              rows={2}
              value={this.state.body}
              onChange={this.handleChange}
              fullWidth
            />
            <hr />
            <Scream scream={scream} isMobile={isMobile} />
          </DialogContent>
          <DialogActions>
            <Button color="secondary"> Cancel</Button>
            <Button color="primary" onClick={this.handleSubmit}>
              Share
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
const mapState =(state)=>({
    user: state.user.credentials
})

export default connect(mapState, {shareScream})(SharePost);
