import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { commentScream, deleteComment } from "../../redux/actions/dataActions";
import withStyles from '@material-ui/styles/withStyles'
import PropTypes from "prop-types";
//*Icons again!
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Grid, IconButton, Typography } from "@material-ui/core";

import dayjs from "dayjs";
import { DeleteOutline } from "@material-ui/icons";
import store from "../../redux/store/store";
const styles = {
  userImage: {
    maxWidth: "100%",
    height: 100,
    borderRadius: "50%",
    fitContent: "cover",
  },
  content: {
marginLeft: 20

  },
  invisibleSeparator:{
    display: "none",
    margin:4
  }
};
class Comment extends Component {
handleDelete=()=>{
  store.dispatch(deleteComment(this.props.comment.commentId))
}
  render() {
    const {classes, comment, user:{credentials: {handle}, authenticated}}= this.props;
    return (
      <Grid container >
            <Grid item sm={12} >
              <Grid container alignItems="center" >
                <Grid item sm={2}>
                  <img
                    src={comment.userImage}
                    alt="user image"
                    className={classes.userImage}
                  />
                </Grid>
                <Grid item sm={9} >
                <div className={classes.content}>
                      <Typography
                        variant="h5"
                        component={Link}
                        style={{textDecoration: "none"}}
                        to={`/users/${comment.userHandle}`}
                        color="primary"
                      >
                        {comment.userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variabnt="body1">{comment.body}</Typography>
                      {comment.userHandle===handle && authenticated &&
                      <IconButton onClick={()=>this.handleDelete(comment.commentId)} color='primary' >
                        <DeleteOutline />
                      </IconButton> }
                    </div>
                </Grid>
              </Grid>
              <hr  />

            </Grid>
      </Grid>
    );
  }
}
Comment.propTypes = {
  comment: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comment);
