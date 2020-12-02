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
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import {ArrowBackIos} from "@material-ui/icons";
import MessageList from "./MessageList";
import {getConversation, markMessageRead} from "../../redux/actions/userActions"
import { connect } from "react-redux";
import { blue, grey } from "@material-ui/core/colors";
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
    background: blue[500],
    minHeight: 30,
    padding: 10,
    borderTopLeftRadius: "20px",
    borderTop: 10,
  },
};

class SingleMessage extends Component {
  state = { messages: [], message: "", friend: "" , showingList: true};
handlePage =(e)=>{
  this.setState({showingList: !this.state.showingList})
}
handleOpenMessage =(friend) => {
    this.props.getConversation(friend);
    this.props.markMessageRead(friend)
    this.setState({ friend, showingList: false });

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
    const conversation = !this.props.conversation ? [] : this.props.conversation;
    const { classes, UI: {isMobile, loading} } = this.props;
    const { friends, user, messages } = this.props;
const {showingList} = this.state;
    const messageMarkup = conversation.map((message, index) => (
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
        <Grid container spacing={2}>
      <Grid item xs={12}>
      {!showingList && <IconButton onClick={this.handlePage} color='primary' style={{position: "absolute", }}>
              <ArrowBackIos />
            </IconButton>}
            <Typography variant={isMobile? "h6" : "h5"} className="header-message" align='center'>
              Message Center
            </Typography>
            
          </Grid>
      {showingList&& 
      <Grid item xs={12} component={Paper} className={classes.chatSection}>
          <MessageList loading={loading} messages= {messages} friends={friends} user={user} handleOpenMessage={this.handleOpenMessage} />
      </Grid> }
          {!showingList && <Grid item sm={9} xs={12}>
            <List className={classes.messageArea} >{messageMarkup}</List>
            <Divider />
            </Grid>}
            { !showingList &&  <Grid item container style={{ padding: "20px" }}>
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
      </Grid> }
        </Grid>
      </div>
    );
  }
}
const mapState = (state) => ({
  messages: state.user.messages,
  conversation: state.user.conversation,
  UI: state.UI,
  user: state.user.credentials,
});
const mapActions = {
  markMessageRead,
  getConversation
}
export default connect(mapState, mapActions)(withStyles(styles)(SingleMessage));
