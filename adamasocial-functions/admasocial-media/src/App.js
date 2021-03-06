import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/index';
import axios from 'axios'
import Responsive from "react-responsive-decorator"
//*import pages and components
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Navbar from './components/layout/Navbar';
import UIMessage from "./components/layout/UIMessage"
//*Material ui stuff

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/authRoute';

//*Redux imports
import store from './redux/store/store';
import {connect, Provider} from 'react-redux';
import { SET_AUTHENTICATED, SET_DESKTOP, SET_MOBILE } from './redux/utils/types';
import { logoutUser, getUserData, getFriends } from './redux/actions/userActions';
import user  from './pages/user';
import messages from './pages/messages';
import Profile  from './components/profile/Profile';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.baseURL = "https://us-central1-admasocial-media.cloudfunctions.net/api"
const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

class App extends Component {
  componentDidMount(){
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login'
    } else {
      store.dispatch({type: SET_AUTHENTICATED});
      axios.defaults.headers.common['Authorization'] = token;
            store.dispatch(getUserData());
    }}
    this.props.media({ minWidth: 768 }, () => {
 store.dispatch({type: SET_DESKTOP})
    });
 
    this.props.media({ maxWidth: 768 }, () => {
      store.dispatch({type: SET_MOBILE})

    });
  }
render() {
  return (
    <Provider store={store}>
 <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <UIMessage />
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path='/my-account' exact component={Profile} />
              <AuthRoute path="/signup" exact component={Signup}  />
              <AuthRoute path="/login" exact component={Login} />
              <Route exact  path="/users/:handle" component={user} />
              <Route exact  path="/messages" component={messages} />
              <Route exact path="/users/:handle/scream/:screamId" component={user}/>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
    </Provider>
   
  );
}}
export default  Responsive(App);
