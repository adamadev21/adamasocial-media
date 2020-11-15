import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "./logo.png";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

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
    marginBottom: "50px",
    maxWidth: "60px",
    maxHeight: "60px",
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
    margin: "auto 20px",
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
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item xs={12}>
          <img src={logo} className={classes.image} sizes={8} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={6}>
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
              variant="filled"
              value={this.state.email}
              className={classes.textField}
             size='small' placeholder='Password'

              onChange={this.handleChange}
              className={classes.textField}
            />
            <TextField
              id="standard-secondary"
              name="password"
             size='small' placeholder='Password'
              label="Password"
              className={classes.textField}

              variant="filled"
              value={this.state.password}
              helperText={errors.password}
              className={classes.textField}
              error={errors.password ? true : false}
              onChange={this.handleChange}
            />

            <Button
              disabled={this.state.loading}
              className={classes.button}
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
          <Typography>
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
        <Grid item xs={3} />
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
