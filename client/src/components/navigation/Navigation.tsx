import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#F7B5CA' }}>
            <Toolbar>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/"
                    sx={{ '&.active': { color: 'yellow' } }}
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/login"
                    sx={{ '&.active': { color: 'yellow' } }}
                >
                    Login
                </Button>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/signup"
                    sx={{ '&.active': { color: 'yellow' } }}
                >
                    Signup
                </Button>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/myCards"
                    sx={{ '&.active': { color: 'yellow' } }}
                >
                    My Cards
                </Button>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/CreateCard"
                    sx={{ '&.active': { color: 'yellow' } }}
                >
                    Create Card
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;