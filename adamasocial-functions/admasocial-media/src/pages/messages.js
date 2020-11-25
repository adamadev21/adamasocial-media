import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getFriends, sendMessage, getAllMessages} from "../redux/actions/userActions"
import MessageList from '../components/screams/messages/MessageList'
import SingleMessage from '../components/screams/messages/SingleMessage'

export class messages extends Component {
    state = {
        friend: {}
    }
    selectFriend = (index)=>{
this.props.getAllMessages(this.props.user.friends[0].recipient)   
 }

    render() {
        const {user:{credentials:{handle}, messages, friends}, sendMessage, getAllMessages} = this.props;
        return (
     <Grid container  >
         <Grid item xs={1} />
         <Grid item xs={10}>
             <SingleMessage friend={this.state.friend} getAllMessages={getAllMessages} friends={friends} user={handle} sendMessage={sendMessage}  />
         </Grid>
         <Grid item xs={1}/>
     </Grid>
        )
    }
}
const mapState = state=>({
    user: state.user,
})
export default connect(mapState, {getFriends, sendMessage, getAllMessages})(messages)
