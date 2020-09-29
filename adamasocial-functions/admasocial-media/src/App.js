import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/index';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Navbar from './components/Navbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#29b6f6',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff6e40',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}
export default App;
