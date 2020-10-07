import React, { Component } from 'react'
import ChatIcon from "@material-ui/icons/Chat";
import  Button  from '@material-ui/core/Button';
export class CommentButton extends Component {
    render() {
        return (
<Button>
    <ChatIcon color="primary"/>
</Button>
        )
    }
}

export default CommentButton
