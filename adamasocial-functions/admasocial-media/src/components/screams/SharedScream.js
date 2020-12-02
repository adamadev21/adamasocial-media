import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
//* MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/styles/withStyles";

//*Icons again!
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  Edit,
  FavoriteBorder,
  ShareRounded as Share,
} from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/ChatBubbleRounded";
//*Components
import DeleteButton from "./DeleteButton";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

//* Redux yella
import { connect } from "react-redux";
import {
  likeScream,
  unlikeScream,
  getOneScream,
} from "../../redux/actions/dataActions";
import EditScream from "./EditScream";
import { Avatar, Divider, Grid } from "@material-ui/core";
import SharePost from "../../util/SharePost";
import Scream from "./Scream";

//*Extend dayjs to use relativetime
dayjs.extend(relativeTime);
const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    marginLeft: 20,
    paddingLeft: 10,
  },
  mobileCard: {
    fontSeize: 23,
    display: "flex",
    marginBottom: 5,
    marginLeft:5,
    paddingLeft: 10,

  },
  media: {
    minWidth: "3.3rem",
    height: "3.3rem",
    borderRadius: "50%",
  },
  content: {
    padding: 25,
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    width: "50rem",
  },  mobileContent: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    width: "14rem",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "100%",
    fontStretch: "condensed"
  },
  body: {
    minHeight: 50,
    minWidth: "80%",
    background: "rgba(0,0,0,0.02)",
    borderRadius: "4%",

    padding: 20,
  }, 
   mobileBody: {
    minHeight: 50,
    fontSize: "small",
    background: "rgba(0,0,0,0.02)",
    borderRadius: "4%",
    padding: 10,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    padding: 20,
    maxWidth: "80%",
  },
};

class SharedScream extends Component {
  state = {
    open: false,
    oldPath: "",
    currPath: "",
  };
  handleOpen = () => {
    this.props.getOneScream(this.props.scream.screamId);
    console.log(this.props);
    let oldPath = window.location.pathname;
    const { userHandle, screamId } = this.props.scream;
    let currPath = `/users/${userHandle}/scream/${screamId}`;
    this.setState({ open: true, oldPath, currPath });
    window.history.pushState(null, null, currPath);
  };
  handleClose = () => {
    this.setState({ open: false });
    window.history.pushState(null, null, this.state.oldPath);
    if (this.state.oldPath === this.state.currPath)
      this.setState({ oldPath: `/users/${this.props.userHandle}` });
    window.history.pushState(null, null, this.state.oldPath);
  };

  render() {
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        pictureUrl,
        screamId,
        likeCount,
        commentCount,
        author,
        sharedPost,
        isMobile,
      },
      user: {
        authenticated, likes,
        credentials: { handle },
      }, 
    } = this.props;
    const likedScream =likes.filter(like=>like.screamId===screamId).length !==0
    return (
      <Grid container className={isMobile ? classes.mobileCard : classes.card}>
        <Grid item xs={2}>
<Avatar  className={classes.media}
          image={userImage}
          title="Profile Name"
        sizes={10} src={userImage}
        />

        </Grid>
         
        <Grid item xs={10} className={isMobile? classes.mobileContent : classes.content}>
          <div className={classes.head}>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{
                fontWeight: "bold",
                display: "block",
                fontStretch: "condensed",
              }}
            >
              {author}
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to={`/users/${userHandle}`}
              style={{ textDecoration: "none", marginLeft: 3 }}
              color="primary"
            >
              @{userHandle}
            </Typography>
            <Divider orientation="vertical" thickness={3} />
            <Typography color="textSecondary" variant="subtitle1">
              {dayjs(createdAt).fromNow()}{" "}
            </Typography>
          </div>
          </Grid>
          <Grid item xs={12}>
          <Typography variant="body1" className={isMobile? classes.mobileBody : classes.body}>
            {body}
            {pictureUrl && (
              <img
                style={{
                  display: "block",
                  height: "auto",
                  width: "100%",
                  alignContent: "center",
                }}
                hidden={!pictureUrl}
                src={pictureUrl}
                alt="Post foto"
              />
            )}
          </Typography>
          <div style={{right:"5%", paddingLeft: 0}}>
          <Scream scream={sharedPost} shared  isMobile={isMobile}/>
      
          </div>
 
          <div className={classes.footer}>
            <LikeButton authenticated={authenticated} screamId={screamId} likedScream={likedScream}>
              {likeCount} {"   "}
            </LikeButton>
            <CommentButton
              authenticated={authenticated}
              handleOpen={this.handleOpen}
            >
              {commentCount} {"   "}
            </CommentButton>
  <SharePost scream={this.props.scream} />
            <Button color="secondary">
              {userHandle === handle && <DeleteButton screamId={screamId} />}
            </Button>

            {userHandle === handle && (
              <EditScream postBody={body} screamId={screamId} />
            )}


  <ScreamDialog
            authenticated={authenticated}
            screamId={screamId}
            author={author}
            likedScream={likedScream}
            userHandle={userHandle}
            openDialog={this.state.open}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            open={this.state.open}
          />
                    </div>
        </Grid>
      </Grid>
    );
  }
}
SharedScream.propTypes = {
  openDialog: PropTypes.bool,
  user: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  scream: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
  getOneScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SharedScream));
