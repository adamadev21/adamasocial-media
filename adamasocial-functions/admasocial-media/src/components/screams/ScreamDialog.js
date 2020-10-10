import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
//* MUI Stuff
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/styles/withStyles";
import { CircularProgress, Grid } from "@material-ui/core";

//*Icons again!
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//* Redux yella
import { connect } from "react-redux";
import { getOneScream, unlikeScream } from "../../redux/actions/dataActions";
import Comments from "./Comments";
import store from "../../redux/store/store";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";

//*Extend dayjs to use relativetime
dayjs.extend(relativeTime);
const styles = (theme) => ({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
   position: "absolute",
  left: "60%",
  //   top: '50%',

  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  hr: {
    display:"none",
    margin: 4
  },
});
class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath:' ',
    currPath:''
  };

  handleOpen = () => {     
    let oldPath = window.location.pathname;
    const {userHandle, screamId} = this.props;
    let currPath = `/users/${userHandle}/scream/${screamId}`;

    this.setState({ open: true, oldPath, currPath});
    window.history.pushState(null, null, currPath)
    this.props.getOneScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null,null, this.state.oldPath);
    if(this.state.oldPath===this.state.currPath) this.setState({oldPath: `/users/${this.props.userHandle}`})
    window.history.pushState(null, null, this.state.oldPath)
    this.setState({open:false})
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  render() {
    const {
      authenticated,
      classes,
      scream: {
        screamId,
        body,
        userImage,
        userHandle,
        createdAt,
        comments,
        likeCount,
        commentCount,
      },
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid
        container
        spacing={16}
      >
        <Grid item sm={5}>
          <img src={userImage} className={classes.profileImage} />
        </Grid>
        <Grid item sm={7} direction="column">
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/user/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.hr} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
          </Typography>
          <hr className={classes.hr} />
          <Typography variant="body1">{body}</Typography>
          <Fragment>
            <LikeButton screamId={screamId}authenticated={authenticated} /> {likeCount} Likes
            <CommentButton /> {commentCount} Comments
          </Fragment>
          <CommentForm screamId={screamId} />
          <br />
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <Tooltip title="Read more ..." color="primary">
          <IconButton onClick={this.handleOpen} className={classes.expandButton}>
            <UnfoldMore className='' />
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Tooltip title="Close ..." color="primary">
            <IconButton
              className={classes.closeButton}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <DialogContent className={classes.dialogContent}>
            {/* //*This displays the recent comments if any */}
            {dialogMarkup}
            <Comments screamId={screamId} comments={comments ? comments : []} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
ScreamDialog.propTypes = {
  openDialog: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  userHandle: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => {

  return {
    scream: state.data.scream,
    UI: state.UI,
  };
};
const mapActionsToProps = {
  getOneScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
