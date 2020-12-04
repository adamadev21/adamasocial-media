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
import { Divider } from "@material-ui/core";
import SharePost from "../../util/SharePost";
import store from "../../redux/store/store";

//*Extend dayjs to use relativetime
dayjs.extend(relativeTime);
const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    marginLeft: 20,
    paddingLeft: 10,
    maxWidth: 800,

  },
  mobileCard: {
    fontSeize: 23,
    display: "flex",
    marginBottom: 5,
    marginLeft:5,
    paddingLeft: 5,

  },
  media: {
    minWidth: 150,
    height:  150,
    borderRadius: "50%",
  },  mobileMedia: {
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
  }, mobileContent: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    width: "16rem",
  },
  head: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    padding: 20,
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

class Scream extends Component {
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
      },
      shared,
      user: {
        authenticated, likes,
        credentials: { handle },
      },
      isMobile,
    } = this.props;
    const likedScream =likes.filter(like=>like.screamId===screamId).length !==0
    return (
      <Card className={isMobile ? classes.mobileCard : classes.card} style={isMobile? {marginLeft: 1} : null}>
        <CardMedia
          className={isMobile? classes.mobileMedia : classes.media}
          image={userImage}
          title="Profile Name"
        />
        <CardContent className={isMobile ? classes.mobileContent : classes.content}>
          <div className={classes.head} style={isMobile	? {flexShrink:"inherit" ,fontSize: "small", textOverflow: "ellipsis"} : null}>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "bold",
                fontSize: isMobile ? "sfmall" : "normall",
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
              style={{ textDecoration: "none", marginLeft: 3 ,                
            fontSize: isMobile ? "smfall" : "normall",}}
              color="primary"
            >
              @{userHandle}
            </Typography>
            <Divider orientation="vertical" thickness={3} />
            <Typography color="textSecondary" variant="subtitle1" style={{textOverflow: "ellipsis", WebkitLineClamp: "none", lineBreak:"unset"}}>
              {dayjs(createdAt).fromNow()}{" "}
            </Typography>
          </div>
          <Typography className={isMobile ? classes.mobileBody : classes.body}>
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
       {!shared &&<div className={classes.footer} style={isMobile? {maxWidth:"80%", justifyContent: "center", fontStretch:"condensed"}: null}>
            <LikeButton authenticated={authenticated} screamId={screamId} likedScream={likedScream}>
              {likeCount} {"   "}
            </LikeButton>
            <CommentButton
              authenticated={authenticated}
              handleOpen={this.handleOpen}
            >
              {commentCount} {"   "}
            </CommentButton>
  <SharePost scream={this.props.scream} isMobile={isMobile}/>
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
  }
        </CardContent>
      </Card>
    );
  }
}
Scream.propTypes = {
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
)(withStyles(styles)(Scream));
