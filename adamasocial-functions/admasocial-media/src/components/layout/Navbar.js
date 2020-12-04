import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../redux/actions/userActions';
//* Icons
import logo from "../../util/lclogo.png"
import HomeIcon from '@material-ui/icons/Home';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import PostScream from '../screams/PostScream';
import NotificationIcon  from './NotificationIcon';
import { Email, Message, AccountCircleRounded } from '@material-ui/icons';
import { Badge , IconButton} from '@material-ui/core';

export class Navbar extends Component {
  render() {
    const { user: {messages, authenticated} , UI: {isMobile}} = this.props;
    return (
      <div className="" style={{ justifyContent: 'center' }}>
        <AppBar position='sticky'>

          <Toolbar style={{ justifyContent: 'center' , position: isMobile ? "sticky" : "unset"}}>


            {authenticated ? (
              <Fragment>
               
                  <PostScream />
               
                 <Button component={Link} to="/" color="secondary" style={{color: "white"}}>
                  <HomeIcon />
                </Button>
           <Button>
             <NotificationIcon isMobile={isMobile} />
           </Button>
                <Button component={Link} to="/messages" style={{color: "white"}}>
               
                  <Badge
              style={{color: "white"}}
              
              badgeContent={
                messages.filter((not) => not.readAt === null).length
              }
              color="secondary"
            >
   <Email />
            </Badge>
                </Button>
                <IconButton component={Link} to={`/my-account`} color='primary'  >
                  <AccountCircleRounded style={{color: "white"}}/>
                </IconButton>
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
  user: state.user,
  UI:state.UI
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
