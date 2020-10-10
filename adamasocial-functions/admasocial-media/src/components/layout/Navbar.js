import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../redux/actions/userActions';
//* Icons
import HomeIcon from '@material-ui/icons/Home';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import PostScream from '../screams/PostScream';
import NotificationIcon  from './NotificationIcon';

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div className="" style={{ justifyContent: 'center' }}>
        <AppBar>
          <Toolbar style={{ justifyContent: 'center' }}>
            {authenticated ? (
              <Fragment>
               
                  <PostScream />
               
                 <Button component={Link} to="/" color="secondary" style={{color: "white"}}>
                  <HomeIcon />
                </Button>
                <Button style={{color: "white"}}>
                  <NotificationIcon />
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Signup
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
