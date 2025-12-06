import { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import NavigationBar from './NavigationBar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Home from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const handleHouseClick = () => {
        history.push("/home/");
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
                sx: {
                    backgroundColor: '#EAD9FA'
                }
            }}
        >
            <MenuItem onClick={handleMenuClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/register/'>Create Account</Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
                sx: {
                    backgroundColor: '#EAD9FA'
                }
            }}
        >
            <MenuItem onClick={handleMenuClose}><Link style={{ textDecoration: 'none', color: 'black' }} to='/edit/'>Edit Account</Link></MenuItem>
            <MenuItem onClick={handleLogout}><Link style={{ textDecoration: 'none', color: 'black' }} to='/home/'>Logout</Link></MenuItem>
        </Menu>        

    let navigationBar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        navigationBar = <NavigationBar />;
    } else {
        navigationBar = <Box sx={{ width: 250}} />
    }
    
    function getAccountMenu(loggedIn, user) {
        if (loggedIn) {
            return <Avatar alt={user.userName} src={user.avatar} />
        } else {
            return <AccountCircle />;
        }
    }

    let appBannerTitle = "";
    if (location.pathname.startsWith("/playlist") || location.pathname.startsWith("/songscatalog")) {
        appBannerTitle = "The Playlister"
    } else {
        appBannerTitle = "";
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{ height: '60px', backgroundColor: 'rgb(204, 0, 204)' }}>
                <Toolbar >
                    <IconButton onClick={handleHouseClick} sx={{ backgroundColor: '#EAD9FA', color: 'black' }} >
                        <Home />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>{navigationBar}</Box>
                    <Box sx={{ flexGrow: 1, ml: -35 }}>
                        <Typography variant="h4" sx={{ fontSize: 30 }}>
                            {appBannerTitle}
                        </Typography>
                    </Box>
                    <Box sx={{ height: "45px", display: { xs: 'none', md: 'flex' } }}>
                        <IconButton sx={{ backgroundColor: "#EAD9FA", color: "black", width: 40, height: 40, mt: "3px" }}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            { getAccountMenu(auth.loggedIn, auth.user) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}