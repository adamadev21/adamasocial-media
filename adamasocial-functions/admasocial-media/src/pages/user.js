import {
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  AppBar,
  Box,
  IconButton,
} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import StaticProfile from "../components/profile/StaticProfile";
import Scream from "../components/screams/Scream";
import { getUserData, getUserDetails } from "../redux/actions/userActions";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Profile from "../components/profile/Profile";
import store from "../redux/store/store";
import LikedScreams from "../components/profile/LikedScreams";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} padding={.75} paddingTop={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: 20,
  },
  rootMobile :{
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: 5,
    padding: 2,
    paddingTop: 5,
  },
  menu:{
    position: 'absolute',
    left: "5%",
  }
});

class user extends Component {
  state = {
    value: 0,
    profile: null,
    screamIdParam: null,
    open: this.props.UI.isMobile,
  };
  componentWillMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    this.props.getUserDetails(handle);
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes, profile: {user, screams, likedScreams,}, UI: {isMobile, loading} } = this.props;
    const { screamIdParam } = this.state;
    const screamsMarkup = loading ? (
      <p> Please wait while we are loading the stuff</p>
    ) : !screams || screams.length === 0 ? (
      <p>This screamer has not screamed yet </p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream isMobile={isMobile} key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} isMobile={isMobile} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog isMobile={isMobile}/>;
      })
    );
    const media = user?  [user.imageUrl,] :  []
    if(screams) screams.forEach(scream=>{if(scream.pictureUrl) media.push(scream.pictureUrl)})
    const { value } = this.state;
    return (
      <div className={isMobile ? classes.rootMobile : classes.root}>
        {isMobile &&
        <IconButton className={classes.menu} color='primary' onClick={()=>this.setState({open: !this.state.open})}><Menu/></IconButton>}
        <AppBar position="static" style={{ width: isMobile? "100%":"65%", marginLeft: isMobile ? 2 : 33 }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Thoughts" {...a11yProps(0)} />
            <Tab label="Likes" {...a11yProps(1)} />
            <Tab label="Media" {...a11yProps(2)} />{" "}
            <Tab label="Profile" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
              {screamsMarkup}
            </Grid>
            {!isMobile || this.state.open && <Grid item sm={4}>
              <Profile user={this.props.user} /> 
        </Grid> }
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={8}>
            <LikedScreams user={user} screams={likedScreams}/>
            </Grid>
            {!isMobile &&     <Grid item sm={4}>
  <Profile user={this.props.user} />
        </Grid> }
          </Grid>

          </TabPanel>{" "}
        <TabPanel value={value} index={2}>
          <Grid container spacing={4}>
    
<Grid item xs={12}>
<Typography>Media</Typography>
</Grid>
     
        
          {media.map(url=>(
                    <Grid item xs={3}>
                 <img src={url} alt="fafa" />
                    </Grid>
         
          ))}
                    </Grid>
        </TabPanel>
        <TabPanel value={value} index={3}>
          {this.props.profile === null ? (
            <p>Profile loading ...</p>
          ) : (
            <StaticProfile profile={user} />
          )}
        </TabPanel>
      </div>
    );
  }
}

user.propTypes = {
  userHandle: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  profile: state.data.profile,
});
const mapActionsToProps = {
  getUserDetails,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(user));
