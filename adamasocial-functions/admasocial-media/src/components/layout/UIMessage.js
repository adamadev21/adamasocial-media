import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class UIMessage extends Component {
    state = {
        open: false
    }
    componentDidMount(){
        if(this.props.message){
            this.setState({open: true})
        }
    }
    UNSAFE_componentWillReceiveProps= (nextprops)=>{
if(nextprops.message !==this.props.message || typeof nextprops.message ==="string"){
    this.setState({open: true})
}
    }
    render() {
        const {message} = this.props;
        return (
            <Snackbar  anchorOrigin={{vertical: "top", horizontal: "center"}}  open={this.state.open}onClose={()=>this.setState({open: false}) } autoHideDuration={2000}>
                <Alert severity='success' variant='filled' >
                    <AlertTitle >Message Alert</AlertTitle>
                    {message}
                </Alert>
            </Snackbar>
        )
    }
}
const mapState = (state)=>({
    message: state.UI.message
})
export default connect(mapState, null)(UIMessage)
