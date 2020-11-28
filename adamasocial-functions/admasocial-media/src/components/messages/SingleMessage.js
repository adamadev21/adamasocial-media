// import {
//   Button,
//   Divider,
//   IconButton,
//   TextField,
//   Typography,
//   withStyles,
// } from "@material-ui/core";
// import { Send } from "@material-ui/icons";
// import React, { Component } from "react";
// import { BrowserRouter, withRouter } from "react-router-dom";
// const styles = (theme) => ({
//   messageForm: {
//     top: "80%",
//     width: "60%",
//     position: "fixed",
//   },
//   sent:{
//     background: "blue",
//     color: "white",
// minHeight: 50,
// marginTop: 20,
// padding:10,
// width: "fit-content",
// borderTopLeftRadius: 10,
// textAlign: "-webkit-right"
//   },   container: {
//     bottom: 0,
//     position: 'fixed'
// },
// bubbleContainer: {
//     width: '100%'
// },
// bubble: {
//     border: '0.5px solid black',
//     borderRadius: '10px',
//     margin: '5px',
//     padding: '10px',
//     display: 'inline-block'
// }
// });
//  class SingleMessage extends Component {
//     state = {msg: ""}
// handleChange =(e)=>{
//     this.setState({msg: e.target.value})
// }

// handleSubmit = (e)=>{
//     const newMessage = {body: this.state.msg}
//     const recipient = this.props.match.params.recipient
//     this.props.sendMessage(recipient, newMessage);
// console.log(newMessage)

// }
//     render() {
//     const { classes , user} = this.props;
//     const {messages}=this.props;
//     const messageMarkup = messages? messages.map((msg, i = 0) => (
//       <div className={classes.bubbleContainer}>
//           <div key={i++} className={classes.bubble}>
//               <div className={classes.button}>{msg.body}</div>
//           </div>
//       </div>
//   ))
// : <Typography>No Messages </Typography>
//     return (
//       <div>

// <div className={classes.container}>{messageMarkup}</div> <Divider/>
//         <div className={classes.messageForm}>
//           <TextField
//             autoFocus
//             multiline
//             onChange={this.handleChange}
//             value={this.state.msg}
//             fullWidth
//             color="primary"
//             rows={2}
//             label="Type your message"
//             variant="outlined"
//           />
//         <IconButton color="primary" style={{left:"90%"}} onClick={this.handleSubmit}>
//             {" "}
//             <Send />
//           </IconButton>
//         </div>

//         <Divider/>
//       </div>
//     );
//   }

// }
// export default withStyles(styles)(SingleMessage)

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import MessageList from "./MessageList";
import { connect } from "react-redux";
import { grey } from "@material-ui/core/colors";
const styles = {
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "68vh",
    overflowY: "auto",
    background: grey[200]
  },
  messageRight: {
    float: "right",
    color: "white",
    background: "green",
    minHeight: 30,
    padding: 10,
    borderTopLeftRadius: "20px",
    borderTop: 10,
  },
};

class SingleMessage extends Component {
  state = { messages: [], message: "", friend: "" };

  setMessages = (friend) => {
    this.props.getAllMessages(friend);
    this.setState({ friend });
  };
  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };
  handleMessage = () => {
    const newMsg = {
      body: this.state.message,
      user: this.props.user,
    };
    this.props.sendMessage(this.state.friend, newMsg);
  };
  render() {
    const messages = !this.props.messages ? [] : this.props.messages;
    const { classes } = this.props;
    const { friends, user } = this.props;

    const messageMarkup = messages.map((message, index) => (
      <ListItem key={index}>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText
              align={message.send === user ? "right" : "left"}
              primary={message.body}
              className={message.sender === user ? classes.messageRight : null}
            ></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText
              align={message.sender === user ? "right" : "left"}
              secondary="09:30"
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    ));
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" className="header-message">
              Message Center
            </Typography>
          </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
          <MessageList friends={friends} handleChat={this.setMessages} />
          <Grid item xs={9}>
            <List className={classes.messageArea} >{messageMarkup}</List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  value={this.state.message}
                  id="outlined-basic-email"
                  label="Type Your Message"
                  fullWidth
                  variant="outlined"
                  onChange={this.handleChange}
                  autoFocus
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={this.handleMessage}
                >
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapState = (state) => ({
  messages: state.user.messages,
});
export default connect(mapState, null)(withStyles(styles)(SingleMessage));
