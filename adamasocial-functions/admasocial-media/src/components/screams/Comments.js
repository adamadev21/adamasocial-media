import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { commentScream } from "../../redux/actions/dataActions";
import withStyles from '@material-ui/styles/withStyles'
import PropTypes from "prop-types";
//*Icons again!
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Grid, Typography } from "@material-ui/core";

import dayjs from "dayjs";
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
class Comments extends Component {

  render() {
    const classes= this.props.classes
    const comments = this.props.comments;
    return (
      <Grid container >
        {comments.map((comment, index) => (
          <Fragment key={comment.createdAt}>
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
                    </div>
                </Grid>
              </Grid>
              <hr  />

            </Grid>
            {index <= comments.length - 2 && (
                <hr className={classes.visibleSeparator} />
              )}

          </Fragment>
          
        ))}
      </Grid>
    );
  }
}
Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
