import React, { Component } from "react";
import Grid from "@material-ui/core/Grid/";
import Scream from "../components/screams/Scream";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import store from "../redux/store/store";
import { getUserData } from "../redux/actions/userActions";
import ScreamSkeleton from "../util/ScreamSkeleton";
export class Home extends Component {
  state = {
    screams: null,
  };

  //loadad screa
  componentDidMount() {
    store.dispatch(getScreams());
    store.dispatch(getUserData());
  }
  render() {
    const { screams, loading } = this.props.data;
    let screamMarkup = !loading ? (
      screams ? (
        screams.map((scream) => {
          return <Scream key={scream.screamId} scream={scream} />;
        })
      ) : (
        <p>The forest is quiet ...</p>
      )
    ) : (
<ScreamSkeleton/>
    );
    return (
      <Grid container spacing={16} alignItems="center">
        <Grid item sm={8} xs={12}>
          {screamMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
const mapActionsToProps = {
  getScreams,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
