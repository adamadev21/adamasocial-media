import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import {Fragment} from 'react'
//*Icons again!
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ChatIcon from '@material-ui/icons/Chat';

//* Redux yella
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
//*Extend dayjs to use relativetime
dayjs.extend(relativeTime);
const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  media: {
    minWidth: 200,
    minHeight: 150,
    marginLeft: 20,
  },
  content: {
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
  },
};

export class Scream extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    ) {
      return true;
    } else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };
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
      },
      user: { authenticated },
    } = this.props;
    const likeButton = !authenticated ? (
      <Button component={Link} to="/login">
        <FavoriteBorder color="primary" />
      </Button>
    ) : this.likedScream() ? (
      <Button onClick={this.unlikeScream}>
        <FavoriteIcon color='primary' />
      </Button>
    ) : (
      <Button onClick={this.likeScream}>
        <FavoriteBorder color='primary'/>
      </Button>
    );

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={userImage}
          title="Profile Name"
        />
        <CardContent className={classes.content} fullWidth>
          <Typography
            variant="h5"
            component={Link}
            to={`user/${userHandle}`}
            style={{ textDecoration: 'none' }}
          >
            @{userHandle}
          </Typography>
          <Typography color="black" variant="body2">
            Posted: {dayjs(createdAt).fromNow()}{' '}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <Fragment style={{display: "inline-flex", flexDirection: "row", flexWrap: 'no-wrap'}}>
            {likeButton} <span>{likeCount}</span> Likes
            <Button>
              <ChatIcon color="primary" />
            </Button>
            {commentCount}<span> Comments</span> 
          </Fragment>
        </CardContent>
      </Card>
    );
  }
}
Scream.propTypes = {
  user: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  scream: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
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
