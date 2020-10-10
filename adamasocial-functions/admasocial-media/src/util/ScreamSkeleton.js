import { Card, CardContent, CardMedia } from '@material-ui/core'
import React, { Component, Fragment } from 'react'
import noImg from '../myImages/noImg.png'
import withStyles from '@material-ui/styles/withStyles'
import PropTypes from 'prop-types'
const styles = {
    card: {
        display: "flex",
        marginBottom: 20,
    },
    cardContent:{
        width: "100%",
        flexDirection: "column",
        padding: 25
    },
    media: {
  minWidth:200,
  objectFit: "cover"
    },
    handle: {
    width: 60,
    height: 20,
    backgroundColor: "blue",
    color: "inherit",
    marginBottom: 7
    },
    time: {
        height: 14,
        width: 70,
        backgroundColor: "rgb(0,0,0,.2)",
        marginBottom: 5
    },
    fullLine: {
        height: 15,
        width: "90%",
        backgroundColor: "rgb(0,0,0,.1)",
        marginBottom: 2
    },
    halfLine: {
        height: 15,
        width: "40%",
        backgroundColor: "rgb(0,0,0,.1)",
        marginBottom: 1
    }
    }
const ScreamSkeleton = (props)=> {
const classes = props.classes;
const content = Array.from ({length: 5}).map((item, index)=>(
    <Card key={index} className={classes.card}>
        <CardMedia image={noImg} className={classes.media} />
        <CardContent  className={classes.cardContent}>
            <div className={classes.handle} />
            <div className={classes.time} />
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <div className={classes.halfLine} />
        </CardContent>
    </Card>
))
    return <Fragment>
        {content}
    </Fragment>
}
ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(ScreamSkeleton)
