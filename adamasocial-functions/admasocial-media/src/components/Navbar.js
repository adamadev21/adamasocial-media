import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='' style={{justifyContent: "center"}}>
        <AppBar>
            <Toolbar>
            <Button component={Link} to='/' color='inherit'>Home</Button>
                <Button  component={Link} to='/login' color='inherit'>Login</Button>
                <Button component={Link} to='/signup' color='inherit'>Signup</Button>
            </Toolbar>
        </AppBar>
</div>
  );
}