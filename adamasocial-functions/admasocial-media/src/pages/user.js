import {
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  AppBar,
  Box,
} from "@material-ui/core";
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
        <Box p={3}>
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
    margin: 30,
  },
});

class user extends Component {
  state = {
    value: 0,
    profile: null,
    screamIdParam: null,
  };
  componentDidMount() {
    store.dispatch(getUserData());
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    this.props.getUserDetails(handle);
    this.setState({ screamIdParam: screamId });
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    const { screamIdParam } = this.state;
    const { screams, loading } = this.props.data;
    const screamsMarkup = loading ? (
      <p> Please wait while we are loading the stuff</p>
    ) : screams === null || screams.length === 0 ? (
      <p>This screamer has not screamed yet </p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ width: "65%", marginLeft: 33 }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Screams" {...a11yProps(0)} />
            <Tab label="Likes" {...a11yProps(1)} />
            <Tab label="Profile" {...a11yProps(2)} />{" "}
            <Tab label="Profile" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Grid container spacing={10}>
            <Grid item xs={8}>
              {screamsMarkup}
            </Grid>
            <Grid item xs={4}>
              <Profile user={this.props.user} />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>Likes</Typography>
        </TabPanel>{" "}
        <TabPanel value={value} index={2}>
          <Typography>Media</Typography>
        </TabPanel>
        <TabPanel value={value} index={3}>
          {this.state.profile === null ? (
            <p>Profile loading ...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
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
  data: state.data,
});
const mapActionsToProps = {
  getUserDetails,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(user));
