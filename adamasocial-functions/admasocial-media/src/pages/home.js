import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid/";
import Scream from "../components/screams/Scream";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
import store from "../redux/store/store";
import { getUserData } from "../redux/actions/userActions";
import ScreamSkeleton from "../util/ScreamSkeleton";
import SharedScream from "../components/screams/SharedScream";
import Responsive from 'react-responsive-decorator';
export class Home extends Component {
  state = {
    screams: null,

  };
  componentDidMount() {
    
this.setState({screams: this.props.data.screams},  this.props.getScreams())
  }
  //loadad screa
  componentWillReceiveProps(nextProps){
    if(this.props.data.screams!==nextProps.data.screams) {
      this.setState({screams: nextProps.data.screams})
    }
  }
 screamMarkup = ()=> {
    if (!this.props.data.loading){
      if(this.props.data.screams) {
        this.props.data.screams.forEach((scream, index) => {
          return (
           <Scream key={index} scream={scream} />
        )})
      } else return (
      <p>The forest is quiet ...</p>
    );
  } else return (
<ScreamSkeleton/>
  );}
  render() {
    const { loading } = this.props.data;
    const {screams} = this.state;
    const { isMobile} = this.props.UI;
   const screamMarkup = !screams ? <div>The forest is quiet...</div> : (!loading ? 
 screams.map((scream, index)=>(
   scream.sharedPost ? <SharedScream isMobile={isMobile} key={index} scream={scream} /> : 
       <Scream key={index} scream={scream} isMobile={isMobile} />
     )) : <ScreamSkeleton />
   )
    return (
      <Grid container spacing={3} alignItems="center">
        <Grid item sm={8} xs={12} wrap>
          {screamMarkup}
        </Grid> 
        <Grid item sm={4} xs={12}>
         {!isMobile && <Profile />}
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
  UI: state.UI,
});
const mapActionsToProps = {
  getScreams,
};

export default connect(mapStateToProps, mapActionsToProps)(Home)
