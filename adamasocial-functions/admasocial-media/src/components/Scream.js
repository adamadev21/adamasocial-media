import React, {Component} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@material-ui/styles/withStyles";
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card:{
        display: 'flex',
        marginBottom: 20,
    


    },
    media:{
        minWidth:200,
        minHeight:150,
        marginLeft: 20
    },
    content: {
        padding: 25,
        display:'flex',
        flexDirection: 'column',
        textDecoration: 'none'
    }
}
  

 class Scream extends Component {
  
  render() {
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={userImage} title="Profile Name"/>
        <CardContent className={classes.content}> 
        <Typography variant="p" component={Link} to= {`user/${userHandle}`}>
     Posted: 
        </Typography>
        <Typography variant="body2" component={Link} to={`user/${userHandle}`}>
        {userHandle}        </Typography>

        <Typography variant="body1" component={Link} to={`user/${userHandle}`}>
          {body}
        </Typography>
        </CardContent>
     
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);
