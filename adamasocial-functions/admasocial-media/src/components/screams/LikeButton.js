import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import PropTypes from 'prop-types'
//*Icons again!
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
export class LikeButton extends Component {
    likedScream = () => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.screamId === this.props.screamId
          )
        ) {
          return true;
        } else return false;
      };
      likeScream = () => {
        this.props.likeScream(this.props.screamId);
        
      };
      unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
      };
    render() {
        const {authenticated} = this.props;
        const likeButton = !authenticated ? (
            <Link  to="/login">
     <Button >
              <FavoriteBorder color="primary" />
            </Button>
            </Link>
       
          ) : this.likedScream() ? (
            <Button onClick={this.unlikeScream}>
              <FavoriteIcon color="primary" />
            </Button>
          ) : (
            <Button onClick={this.likeScream}>
              <FavoriteBorder color="primary" />
            </Button>
          );
      
        return likeButton;
    }
}
LikeButton.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}
const mapStateToProps =(state)=>({
    user: state.user
});
const mapActionsToProps = {
    likeScream, unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
