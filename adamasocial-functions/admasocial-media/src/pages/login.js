import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "../util/lclogo.png";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { Icon, IconButton } from "@material-ui/core";
import {Facebook} from "@material-ui/icons"

const styles = {
  form: {
    padding: 20,
    textAlign: "center",
  },
  formField: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    marginBottom: "10px",
    maxWidth: "200px",
    maxHeight: "200px",
  },
  button: {
    color: "primary",
    position: "relative",
    marginTop: "20px",
    maxHeight: "35px",
    maxWidth: "100px",
    alignItems: "center",
    left: "40%",
    borderRadius: "5%",
  },  mobileButton: {
    alignSelf: "center",
    marginTop: 10,

    width: "70%",
    textAlign: "center",
  },
  costumError: {
    color: "red",
    fontSize: "1rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
  textField: {
    marginTop: 10,
    margin: "auto ",
    borderRadius: "10%",
  },
};

export class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }
  handleSubmit = (event) => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
    event.preventDefault();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes, UI: {isMobile}} = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item xs={12}>
          <img src={logo} className={classes.image} sizes={15} />
        </Grid>
        <Grid item sm={3} />
        <Grid item sm={6}xs={12}>
          <Typography variant="h5" color="textPrimary" style={{fontWeight: "bold"}}>
            Log into Leaders' Cafe
          </Typography>
          {errors.general ? (
            <Typography className={classes.costumError}>
              {errors.general}
            </Typography>
          ) : null}
          <form className={classes.formField} onSubmit={this.handleSubmit}>
            <TextField
              error={errors.email ? true : false}
              id="standard-primary"
              name="email"
              label="Email"
              helperText={errors.email}
              variant={isMobile ? "outlined" : "filled"}
              value={this.state.email}
              className={classes.textField}
             size='small' placeholder='Enter a valid email'

             fullwidth onChange={this.handleChange}
              className={classes.textField}
            />
            <TextField
              id="outlined-secondary"
              name="password"
             size='small' placeholder='Password'
              label="Password"
              // className={classes.textField}

              variant={isMobile ? "outlined" : "filled"}
              value={this.state.password}
              helperText={errors.password}
              className={classes.textField}
              error={errors.password ? true : false}
             fullwidth onChange={this.handleChange}
            />

            <Button
              disabled={this.state.loading}
              className={isMobile? classes.mobileButton : classes.button}
              color="primary"
              variant="contained"
              type="submit"
            >
              Sign In
              {this.state.loading ? (
                <CircularProgress
                  value="indeterminate"
                  variant="indeterminate"
                  className={classes.progess}
                />
              ) : null}
            </Button>
          </form>
          <Typography variant="body2">
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              color="primary"
              style={{ textDecoration: "none" }}
            >
              Create an account for free
            </Link>
          </Typography>
        </Grid>
        <Grid item sm={3} />
        <Grid item xs={12} aling='center'  >
      <Button className={isMobile ? classes.mobileButton : null} style={{textTransform: "none", }} variant='contained' color="primary" size="small">
        <Facebook name="facebook" /> Login with Facebook
      </Button>

      <Button className={isMobile ? classes.mobileButton : null} style={{textTransform: "none"}} variant='contained' color="secondary" size='small' >
     <Icon />
        Login with Google
      </Button>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
