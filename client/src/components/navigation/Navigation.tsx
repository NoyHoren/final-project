import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Avatar, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../../context/AuthContext';

const Navigation: React.FC = () => {
    const { auth, handleLogout, user } = useContext(AuthContext) as AuthContextType;
    const isAdminOnly = user?.isAdmin;
    const isBusinessOnly = user?.isBusiness && !user.isAdmin;

    const handleLogoutClick = () => {
        handleLogout();
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#F7B5CA', display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                {auth && user ? (
                    <>
                        <Avatar alt={user.image?.alt} src={user.image?.url} />
                        <Typography variant="h6" sx={{ ml: 1 }}>
                            {`Welcome ${user.name.first} ${user.name.last}`}
                        </Typography>
                    </>
                ) : null}
            </Box>
            <Toolbar>
                {auth && user ? (
                    <>
                        {(isAdminOnly || isBusinessOnly) &&
                            <>
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
                                    to="/favorites"
                                    sx={{ '&.active': { color: 'yellow' } }}
                                >
                                    Favorites
                                </Button>
                                <Button
                                    color="inherit"
                                    component={NavLink}
                                    to="/CreateCard"
                                    sx={{ '&.active': { color: 'yellow' } }}
                                >
                                    Create Card
                                </Button>
                            </>
                        }
                        <Button
                            color="inherit"
                            component={NavLink}
                            to="/"
                            onClick={handleLogoutClick}
                            sx={{ '&.active': { color: 'yellow' } }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
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
                    </>
                )}
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/"
                    sx={{ '&.active': { color: 'yellow' } }}
                >
                    Home
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;