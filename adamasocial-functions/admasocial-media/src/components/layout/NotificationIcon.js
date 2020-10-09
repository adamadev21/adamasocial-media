import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { markNotificationsRead } from "../../redux/actions/userActions";
//*MUI StUFF
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Favorite from "@material-ui/icons/Favorite";
import Badge from "@material-ui/core/Badge";

//* Icons
import Notification from "@material-ui/icons/Notifications";
import Chat from "@material-ui/icons/Chat";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import dayjs from "dayjs";
export class NotificationIcon extends Component {
  state = {
    ancorEl: null,
  };
  handleNotifications = () => {
    let unreadNotificationIds = this.props.notifications
      .filter((not) => not.read === false)
      .map((not) => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationIds);
  };
  handleOpen =(event) =>{
    this.setState({ ancorEl: event.target });
  }
  handleClose=() =>{
    this.setState({ ancorEl: null });
  }

  render() {
    const ancorEl = this.state.ancorEl;
    const { notifications } = this.props;

    let notificationsMarkup;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationsMarkup = (
            <Badge
              ancorEl={ancorEl}
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <Notification style={{color: "white"}} />
            </Badge>
          ))
        : (notificationsMarkup = <Notification style={{color: "white"}} />);
    } else notificationsMarkup = <Notification style={{color: "white"}}/>;
    const notList =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === "like" ? "liked" : " commented on ";
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? "primary" : "secondary";
          const icon =
            not.type === "like" ? (
              <Favorite style={{ marginRight: 10 }} color={iconColor} />
            ) : (
              <Chat color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
             <Button style={{color: "white"}} > {icon}</Button>
              <Typography
                component={Link}
                to={`/users/${not.sender}/scream/${not.screamId}`}
                variant="body1"
              >
                {not.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <Typography> You have you no notifications yet</Typography>
      );
    return (
      <Fragment>
        <Tooltip title=" Notifications" placement="top">
          <IconButton
            aria-owns={ancorEl ? "simple-menu" : undefined}
            aria-haspopup
            onClick={this.handleOpen}
          >{notificationsMarkup}</IconButton>
        </Tooltip>
        <Menu
          ancorEl={ancorEl}
          open={Boolean(ancorEl)}
          onclose={this.handleClose}
          onEntered={this.handleNotifications}
        >
          {notList}
        </Menu>
      </Fragment>
    );
  }
}
NotificationIcon.propTypes = {
  notifications: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
  data: state.data,
});
const mapActionsToProps = {
  markNotificationsRead,
};
export default connect(mapStateToProps, mapActionsToProps)(NotificationIcon);
