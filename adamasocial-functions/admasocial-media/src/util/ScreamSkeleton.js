import { Card, CardContent, CardMedia, Grid } from '@material-ui/core'
import React, { Component, Fragment } from 'react'
import noImg from '../myImages/noImg.png'
import withStyles from '@material-ui/styles/withStyles'
import PropTypes from 'prop-types'
import { Skeleton } from '@material-ui/lab'
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
<Grid key={index} container spacing={2} >
    <Grid item xs={2}>
        <Skeleton variant='circle' height={50} width={50} animation='pulse'/>
    </Grid>
    <Grid  item xs={9}>
    <Skeleton variant='text' width={200}  />

    </Grid>
    <Grid  item xs={12}>
        <Skeleton variant='rect' height={50} />
    </Grid>
</Grid>
))
    return <Fragment>
        {content}
    </Fragment>
}
ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(ScreamSkeleton)
