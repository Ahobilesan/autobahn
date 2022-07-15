import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ForumIcon from '@mui/icons-material/Forum';
import Toolbar from '@mui/material/Toolbar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';


import { store } from '../../redux/store';
import * as actions from '../../redux/actions';

const drawerWidth = 300;

interface Props {
    open: boolean;
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;

    const handleDrawerToggle = async () => {
        const state = store.getState()
        await store.dispatch({ type: actions.SET_DRAWER, data: !state.root.openDrawer })
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem key="Posts" disablePadding selected>
                    <ListItemButton>
                        <ListItemIcon>
                            <ForumIcon />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Todos" disablePadding disabled>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Todos" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="Photos" disablePadding disabled>
                    <ListItemButton>
                        <ListItemIcon>
                            <PhotoSizeSelectActualIcon />
                        </ListItemIcon>
                        <ListItemText primary="Photos" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={props.open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
