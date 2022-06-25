import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import { store } from '../../redux/store';
import * as actions from '../../redux/actions';

const drawerWidth = 300;

export default function ResponsiveDrawer() {

    const handleDrawerToggle = async () => {
        const state = store.getState()
        await store.dispatch({ type: actions.SET_DRAWER, data: !state.openDrawer })
    };


    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    List
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
