import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddCommentIcon from '@mui/icons-material/AddComment';


import { store } from '../../redux/store';
import * as actions from '../../redux/actions';

const drawerWidth = 300;

export default function ResponsiveDrawer() {

    const handleDrawerToggle = async () => {
        const state = store.getState()
        await store.dispatch({ type: actions.SET_DRAWER, data: !state.openDrawer })
    };

    const openEditModal = async () => {
        await store.dispatch({ type: actions.SET_MODAL, data: { post: { title: "", body: "" }, open: true } })
    }

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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Posts
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={openEditModal.bind(null)}
                    color="inherit"
                >
                    <AddCommentIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
