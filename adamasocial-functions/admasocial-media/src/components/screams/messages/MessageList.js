import React, { Component, Fragment } from "react";
import { Grid, ListItemIcon, Menu, MenuItem, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import messages from "../../../pages/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginLeft:20,
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
},
}));

 function MessageList(props) {
const friends = props.friends? props.friends : [];
  const classes = useStyles();
const friendList = friends.map((msg, index)=>(
  <ListItem button key="RemySharp" onClick={()=>props.handleChat(msg.handle)}>
  <ListItemIcon>
      <Avatar alt="Remy Sharp" src={msg.imageUrl} />
  </ListItemIcon>
  <ListItemText primary={msg.handle}/>
  <ListItemText secondary="online" align="right"></ListItemText>
</ListItem>
)) 
  return (
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
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
