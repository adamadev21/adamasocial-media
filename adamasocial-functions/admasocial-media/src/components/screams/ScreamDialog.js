import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
//* MUI Stuff
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/styles/withStyles";
import { CircularProgress, Grid, } from "@material-ui/core";

//*Icons again!
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//* Redux yella
import { connect } from "react-redux";
import { getOneScream, unlikeScream } from "../../redux/actions/dataActions";
import Comments from "./Comments";
import store from "../../redux/store/store";
import LikeButton  from "./LikeButton";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";

//*Extend dayjs to use relativetime
dayjs.extend(relativeTime);
const styles = {
 profileImage: {
     maxWidth: 200,
     height: 200,
     borderRadius: "50%",
     objectFit: "cover"
 },
 hr: {
     display: "none",
     margin: 4
 },
 dialogContent: {
padding: 20,
overflowY: "unset"
 },
 expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
 closeButton:{
     positon: "absolute",
     left: "90%"
 }
};
 class ScreamDialog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillMount(){
    
    console.log(this.props.scream)
  }
  componentDidMount(){
    this.props.getOneScream(this.props.screamId);

 }
  render() {
    const {
      classes,
      scream: { screamId, body, userImage, userHandle, createdAt , comments, likeCount, commentCount},
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
        <CircularProgress size={200}  thickness={2}/>

        </div>
    ) : (
        <Grid style={{scrollBehavior: "unset", scrollMarginLeft: "100px", display: "block"}} container spacing={2}>
<Grid item sm={5}>
    <img src={userImage} className={classes.profileImage}/>
</Grid>
<Grid item sm={7} direction='column'>
<Typography 
variant ='h5'
color = 'primary'
component ={ Link}
to = { `/user/${userHandle}`} >
    @{userHandle}
</Typography>
<hr className={classes.hr}/>
<Typography variant ='body2' color='dark'  >
{dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
</Typography>
<hr className={classes.hr}/>
<Typography variant = "body1">
    {body}
</Typography>
<Fragment >
              <LikeButton screamId={screamId}/> {likeCount} Likes
              <CommentButton/> {commentCount} Comments
            </Fragment>
            <CommentForm screamId={screamId}/>
            <br/>
         
</Grid>
        </Grid>

    ) 
        return (
      <Fragment>
        <Tooltip title="Read more ..." color="primary">
          <IconButton onClick={this.handleOpen}>
            <UnfoldMore className={classes.expandButton}  /> 
          </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Tooltip title="Close ..." color="primary">
          <IconButton className={classes.closeButton} onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip> 
          <DialogContent className={classes.dialogContent}>
      
            {/* //*This displays the recent comments if any */}
              {dialogMarkup}
   <Comments screamId={screamId} comments={comments}/>


          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
ScreamDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  userHandle: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => {
  console.log("data is", state.data);
  
  return {
    scream: state.data.scream,
    UI: state.UI,
  }
}
const mapActionsToProps = {
  getOneScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
