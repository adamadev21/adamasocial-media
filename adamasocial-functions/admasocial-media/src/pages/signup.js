import React, { Component } from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
//*Material Ui stuff
import withStyles from '@material-ui/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
//*Redux stuff here
import { connect } from 'react-redux';
import {signupUser } from '../redux/actions/userActions';

const styles = {
  form: {
    textalign: 'center',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: '10px',
    color: 'primary',
  },
  image: {
    marginTop: '50px',
    maxWidth: '60px',
    maxHeight: '60px',
  },
  button: {
    position: 'relative',
    marginTop: '20px',
    maxHeight: '35px',
    maxWidth: '100px',
    textalign: 'center',
  },
  costumError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
  progress: {
    position: 'absolute',
  },
  textField: {
    marginTop: 10,
  },
};

export class Signup extends Component {
  state = {
    handle: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    errors: {},
  };
//* Update props when received


componentWillReceiveProps(nextProps) {
   if(nextProps.UI.errors){
    this.setState({errors: nextProps.UI.errors})
  }
}
  handleSubmit = (event) => {
    this.setState({loading: true})
    const newUserData = {
      handle: this.state.handle,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
this.props.signupUser(newUserData, this.props.history)
    event.preventDefault();
    console.log(this.props)
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes, UI: {loading} } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h4" primary="true">
            Signup Form
          </Typography>
          <form className={classes.formField} onSubmit={this.handleSubmit}>
            <TextField
              error={errors.handle? true: false}
              id="standard-primary" 
              name="handle"
              label="Name"
              helperText={errors.handle}
              variant="standard"
              value={this.state.handle}
              onChange={this.handleChange}
              className={classes.textField}
            />{' '}
            <TextField
              error={errors.email ? true : false}
              id="standard-primary"
              name="email"
              label="Email"
              helperText={errors.email}
              variant="standard"
              value={this.state.email}
              onChange={this.handleChange}
              className={classes.textField}
            />
            <TextField
              error={errors.password ? true : false}
              id="standard-secondary"
              name="password"
              label="Password"
              variant="standard"
              value={this.state.password}
              helperText={errors.password}
              className={classes.textField}
              onChange={this.handleChange}
            />
            <TextField
              error={errors.confirmPassword}
              id="standard-secondary"
              name="confirmPassword"
              label="Confirm Password"
              variant="standard"
              value={this.state.confirmPassword}
              helperText={errors.confirmPassword}
              className={classes.textField}
              onChange={this.handleChange}
            />
            {errors.general ? (
              <Typography className={classes.costumError}>
                {errors.general}
              </Typography>
            ) : null}
            <Button
              disabled={this.state.loading}
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
              className={classes.button}
              textAlign="center"
            >
              Sign Up
              {loading ? (
                <CircularProgress
                  variant="static"
                  size={30}
                  value="indeterminate"
                  className={classes.progess}
                />
              ) : null}
            </Button>
          </form>
          <small>
            Already have an account? <Link to="/login" color='primary'>Sign in</Link>
          </small>
        </Grid>
        <Grid item sm>
          <img src={logo} className={classes.image} sizes={11} />
        </Grid>
      </Grid>
    );
  }
}
 Signup.propTypes = {
   classes: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired,
   UI: PropTypes.object.isRequired,
   signupUser: PropTypes.func.isRequired

 }
 const mapStateToProps = (state)=> {
   console.log(state);
   return {
   user: state.user,
   UI: state.UI
 }}
 const mapActionsToProps = {
   signupUser
 }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));
