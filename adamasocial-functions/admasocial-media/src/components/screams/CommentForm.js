import { Button, Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import PropTypes from 'prop-types'
//* Redux stuff
import { connect } from "react-redux";
import { commentScream } from "../../redux/actions/dataActions";

export class CommentForm extends Component {
  state = {
    body: "",
    errors: {}
  };
  componentWillReceiveProps =(nextProps) =>{
      if (this.state.errors !== this.props.UI.errors) {
          this.setState({errors: nextProps.UI.errors})
      }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    //* This takes two params: screamId and data/
    this.props.commentScream(this.props.screamId, this.state);
  };
  render() {
    const { authenticated } = this.props.user;
const errors = this.state.errors
    const commentMarkup = authenticated ? (
      <Grid item style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            type="text"
            multiline
            rows={2}
            label = "Comment on scream"
            error ={errors.comment ? true : false}
            helperText ={errors.comment? errors.comment : null}
            fullWidth
          />
          <Button variant = "contained" color="primary" onClick={this.handleSubmit} style={{postion: "absolute", left: "36%", marginTop: "5px"}}>
              Submit
          </Button>
        </form>
      </Grid>
    ) : null;
    return commentMarkup;
  }
}

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI:state.UI
});
const mapActionsToProps = {
  commentScream,
};

export default connect(mapStateToProps, mapActionsToProps)(CommentForm);
