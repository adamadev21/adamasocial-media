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
import Comment from "./Comments";
import store from "../../redux/store/store";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";

//*Extend dayjs to use relativetime
dayjs.extend(relativeTime);
const styles = (theme) => ({
  profileImage: {
    maxWidth: 150,
    maxHeight: 150,
    borderRadius: "50%",
    objectFit: "cover",
  },  mobileProfile: {
    height: 80,
    maxWidth: 80,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  body:{
    marginTop: 10,
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {

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


  render() {
    const {
      authenticated,
      classes,
      open,
      handleClose, 
      handleOpen,
      scream: {
        screamId,
        body,
        userImage,
        userHandle,
        createdAt,
        author,
        comments,
        likeCount,
        pictureUrl,
        commentCount,
      },
      UI: { loading, isMobile},
      user, likedScream
    } = this.props;
    const commentMarkup = comments ? comments.map((comment,index)=>(
  <Comment  comment={comment} user={user}/>
    )) : null
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={3} />
      </div>
    ) : (
      <Grid
        container
        spacing={isMobile? 2 : 5}
      >
        <Grid item xs={4}>
          <img src={userImage} alt="Profile" className={isMobile? classes.mobileProfile: classes.profileImage} />
        </Grid>
        <Grid item xs={8} direction="column">
          <Typography
            variant="h6"
            color="primary"
            style={{textDecoration: "none"}}
            component={Link}
            to={`/user/${userHandle}`}
          >
        <span style={{color: "black", fontWeight: "bold", fontSmooth: "always"}}>   {author} {"   "}</span> 
            @{userHandle}
          </Typography>
          <hr className={classes.hr} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
          </Typography>
          <hr className={classes.hr} />
          <img src={pictureUrl}/>
          <Typography variant="body1" className={classes.body}>{body}</Typography>
          <Fragment>
            <LikeButton likedScream={likedScream} screamId={screamId}authenticated={authenticated}>{likeCount}</LikeButton> 
            <CommentButton >{commentCount}</CommentButton>
          </Fragment>
          <CommentForm screamId={screamId} isMobile={isMobile} />

        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <Tooltip title="Read more ..." color="primary">
          <IconButton onClick={handleOpen} className={classes.expandButton}>
            <UnfoldMore className='' />
          </IconButton>
        </Tooltip>
        <Dialog
        
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Tooltip title="Close ..." color="primary">
            <IconButton
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <DialogContent className={classes.dialogContent}>
            {/* //*This displays the recent comments if any */}
            {dialogMarkup}
            <Fragment >
            {commentMarkup}
            </Fragment>

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
    user: state.user,
  };
};
const mapActionsToProps = {
  getOneScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
