import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import store from "../../redux/store/store";
import {Skeleton,} from "@material-ui/lab";
import { getLikedScreams } from "../../redux/actions/userActions";
import Scream from "../screams/Scream";
import ScreamSkeleton from "../../util/ScreamSkeleton";
 class LikedScreams extends Component {

  render() {
    const { screams } = this.props;
    const renderScreams = !screams ? (
      <ScreamSkeleton variant='rect'  />
    ) : (
      screams.map((scream, ind) => <Scream scream={scream} key={ind} />)
    );
    return <Fragment>{renderScreams}</Fragment>;
  }
}
const mapState = (state) => ({
  screams: state.user.likedScreams,
  handle: state.user.credentials.handle,
});

export default connect(mapState, { getLikedScreams })(LikedScreams);
