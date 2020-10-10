import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/index';
import axios from 'axios'
//*import pages and components
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Navbar from './components/layout/Navbar';

//*Material ui stuff

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/authRoute';

//*Redux imports
import store from './redux/store/store';
import {Provider} from 'react-redux';
import { SET_AUTHENTICATED } from './redux/utils/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import StaticProfile from './components/profile/StaticProfile';
import user  from './pages/user';


const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()){

store.dispatch(logoutUser());
window.location.href = '/login'
} else {
  store.dispatch({type: SET_AUTHENTICATED});
  store.dispatch(getUserData());
  axios.defaults.headers.common['Authorization'] = token;
}}

function App() {
  return (
    <Provider store={store}>
 <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <AuthRoute path="/signup" exact component={Signup}  />
              <AuthRoute path="/login" exact component={Login} />
              <Route exact  path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/scream/:screamId" component={user}/>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
    </Provider>
   
  );
}
export default App;
