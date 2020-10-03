import React, { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logo from './logo.png';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = {
  form: {
    textAlign: 'center',
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
    position: "relative",
    marginTop: "20px",
    maxHeight: "35px",
    maxWidth: "100px",
    textAlign: "center"
  },
  costumError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  },
  textField: {
    marginTop:10
  }
};

export class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errors: {},
  };
  
componentWillReceiveProps(nextProps){
  if(nextProps.UI.errors){
    this.setState({
      errors: nextProps.UI.errors
    })
  }
}
  handleSubmit = (event) => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
  this.props.loginUser(userData, this.props.history)
    event.preventDefault();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes, UI: {loading} } = this.props;
    const {errors} = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h4" color='primary'>
            Login Form
          </Typography>
          <form className={classes.formField} onSubmit={this.handleSubmit}>
            <TextField
            error = {errors.email ? true : false}
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
              id="standard-secondary"
              name="password"
              label="Password"
              variant="standard"
              value={this.state.password}
              helperText={errors.password}
              className={classes.textField} 
              error = {errors.password ? true : false}

              onChange={this.handleChange}
            />
{errors.general? <Typography className={classes.costumError}>{errors.general}</Typography> : null}
            <Button
            disabled={this.state.loading}
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
              className={classes.button}
          
            >
              Sign In
              {this.state.loading ? (
            <CircularProgress value="indeterminate" variant='determinate' className={classes.progess} />
          ) : null}
            </Button>
          </form>
          <small >Don't have an account yet? <Link to='/signup' color='primary' style={{textDecoration: "none"}} >Create an account for free</Link></small>

        </Grid>
        <Grid item sm>
          <img src={logo} className={classes.image} sizes={11} />
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
  user: state.user,
  UI: state.UI
})


const mapActionsToProps =  {
  loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
