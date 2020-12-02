import React, { Component, Fragment } from "react";
import { Badge, Grid, ListItemIcon, Menu, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Skeleton} from "@material-ui/lab"
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginLeft:20,
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
},
}));
const getBadge = (messages, friend)=>{
  return messages.filter(msg=>msg.sender===friend &&msg.read===false).length;
}
 function MessageList(props) {
const friends = props.friends? props.friends : [];
  const classes = useStyles();
  const {user: {fullName, imageUrl}, messages, loading} = props;
const friendList = loading? <Skeleton  /> : friends.map((msg, index)=>{
  const friend = msg.handle;
  const badge = getBadge(messages, friend)
  return (
  <ListItem button key="RemySharp" onClick={()=>props.handleOpenMessage(friend)}>
  <ListItemIcon>
      <Avatar alt="Remy Sharp" src={msg.imageUrl} />
  </ListItemIcon>
  <ListItemText primary={msg.handle}/>

  <Badge color='secondary' badgeContent={badge} />
</ListItem>
)}) ;
  return (
            <Grid item xs ={12} sm={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={imageUrl} />
                        </ListItemIcon>
                        <ListItemText primary={fullName}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
        {friendList}
                </List>
            </Grid>
  )
 }

            export default MessageList
