import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { commentScream } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";
//*Icons again!
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Grid, Typography } from "@material-ui/core";
import dayjs from "dayjs";
const classes = {
  userImage: {
    maxWidth: 150,
    height: 150,
    borderRadius: "50%",
    fitContent: "cover",
  },
  content: {
      positon: "absolute",
      right: "90%",
      marginRight: "10%"

  }
};
class Comments extends Component {
  //**Lets keep the comments in the state of the component**/
  state = {
    comments: [],
  };
  //*DEBUG Console log the comments props after the component is mounted to see why they are not displayed
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("DEBUG", this.props.comments);
    //*This works fine. I have the comments
    //* let us update the state when the component mounts
    if (nextProps.comments) {
      this.setState({
        comments: this.props.comments,
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.screams !== this.props.screams) {
      return true;
    } else {
      return false;
    }
  }
  commentScream = () => {
    this.props.commentScream(this.props.screamId);
  };
  render() {
    const comments = this.props.comments;

    return (
      <Grid container spacing={2}>
        {comments.map((comment) => (
          <Fragment key={comment.createdAt}>
            <Grid item sm={12} container>
              <Grid container spacing={2} alignItems="center">
                <Grid item sm={5}>
                  <img
                    src={comment.userImage}
                    alt="user image"
                    style={classes.userImage}
                  />
                </Grid>
                <Grid item sm={5} style={classes.content} noWrap direction='column'>
                  <Typography noWrap
                    component={Link}
                    to={`/users/${comment.userHandle}`}
                    variant = 'h6'
                    color = 'primary'
                  >
                    {comment.userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(comment.createdAt).format("h:mm a, MMM DD YYYY")}
                  </Typography>
                  <Typography variant="body1">{comment.body}</Typography>
                </Grid>
              </Grid>
              <hr  />

            </Grid>
            <hr style={{margin: "4", display: "inline-block"}}/>

          </Fragment>
          
        ))}
      </Grid>
    );
  }
}
Comments.propTypes = {
  user: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Comments;
