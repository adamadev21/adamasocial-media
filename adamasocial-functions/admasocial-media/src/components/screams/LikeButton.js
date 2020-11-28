import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";
//*Icons again!
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

 class LikeButton extends Component {
 
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    const { authenticated, likedScream, user:{likes}, screamId } = this.props;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <Button>
          <FavoriteBorder color="primary" />
          <span style={{marginLeft: 15}}>{this.props.children} </span>        </Button>
      </Link>
    ) : likedScream? (
      <Button onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />  <span style={{marginLeft: 15}}>{this.props.children} </span>
      </Button>
    ) : (
      <Button onClick={this.likeScream}>
        <FavoriteBorder color="primary" />  <span style={{marginLeft: 15}}>{this.props.children} </span>
      </Button>
    );

    return likeButton;
  }
}
LikeButton.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
