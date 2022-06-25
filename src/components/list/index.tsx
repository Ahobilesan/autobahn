import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { POST } from '../../assets/api/interface';

import { store } from '../../redux/store';
import * as actions from '../../redux/actions';

export default function PostList({ data }: { data: POST[] }) {
    const openEditModal = async (post: POST) => {
        await store.dispatch({ type: actions.SET_MODAL, data: { post: post, open: true } })
    }

    const openDeleteAckModal = async (post: POST, e: any) => {
        e.stopPropagation()
        await store.dispatch({ type: actions.SET_ACK_MODAL, data: { post: post, open: true } })
    }

    return (
        <div className='PostList'>
            {!data || data.length == 0 && <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="No results found"
                        secondary={" Try reloading the page."}
                    />
                </ListItem></List>
            }
            {data && data.length !== 0 && <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {data.map((post, idx) => {
                    return <div key={`post-idx-${idx}`}>
                        <ListItem alignItems="flex-start" onClick={openEditModal.bind(null, post)} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={openDeleteAckModal.bind(null, post)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemAvatar>
                                <Avatar alt="" src={post.url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={post.title}
                                secondary={post.body}
                            />
                        </ListItem>
                        {(data.length - 1) !== idx && <Divider variant="inset" component="li" />}
                    </div>
                })}
            </List>}
        </div>
    );
}
