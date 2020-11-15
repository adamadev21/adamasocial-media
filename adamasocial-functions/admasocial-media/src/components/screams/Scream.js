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
import {Edit, FavoriteBorder, ShareRounded as Share} from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/ChatBubbleRounded";
//*Components
import DeleteButton from "./DeleteButton";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

//* Redux yella
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

//*Extend dayjs to use relativetime
dayjs.extend(relativeTime);
const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    marginLeft: 20,
    paddingLeft: 10,
  },
  media: {
    minWidth: 100,
    height: 100,
    borderRadius: "50%",
  },
  content: {
    padding: 25,
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    width: "90%",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "60%",
  },
  body: {
    minHeight: 50,
    minWidth: "80%",
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
  render() {
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
        author
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={userImage}
          title="Profile Name"
        />
        <CardContent className={classes.content}>
          <div className={classes.head}>
            <Typography
              variant="h6"
              color="textPrimary"
              style={{ fontWeight: "bold" }}
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
            <Typography color="textSecondary" variant="h6">
              {dayjs(createdAt).fromNow()}{" "}
            </Typography>
          </div>
          <Typography variant="body1" className={classes.body}>
            {body}
          </Typography>
          <div className={classes.footer}>
            <LikeButton authenticated={authenticated} screamId={screamId}>
              {likeCount} {"   "}
            </LikeButton>
            <CommentButton authenticated={authenticated}>
              {commentCount} {"   "}
            </CommentButton>
            <Button color='primary'>
              <Share />
            </Button>
            <Button color='secondary' >
            {userHandle === handle && <DeleteButton screamId={screamId} />}
            </Button>
                     <Button color ='primary'>
            {userHandle === handle && <Edit screamId={screamId} />}
            </Button>
            
          </div>

          <ScreamDialog
            authenticated={authenticated}
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
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
  data: state.data,
  user: state.user,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
