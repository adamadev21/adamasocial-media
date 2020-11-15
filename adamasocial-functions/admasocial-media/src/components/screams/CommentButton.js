import React, { Component } from 'react'
import ChatIcon from "@material-ui/icons/ChatBubbleOutline";
import  Button  from '@material-ui/core/Button';
export class CommentButton extends Component {
    render() {
        return (
<Button>
    <ChatIcon color="primary"/> <span style={{marginLeft: 15}}>{this.props.children} </span>
</Button>
        )
    }
}

export default CommentButton
