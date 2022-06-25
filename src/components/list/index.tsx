import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { POST } from '../../assets/api/interface';

export default function PostList({ data }: { data: POST[] }) {
    return (
        <div className='PostList'>
            {!data || data.length == 0 && <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="No results found"
                        secondary={
                            <React.Fragment>
                                {" Try reloading the page."}
                            </React.Fragment>
                        }
                    />
                </ListItem></List>
            }
            {data && data.length !== 0 && <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {data.map((post, idx) => {
                    return <div key={`post-idx-${idx}`}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="" src={post.url} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={post.title}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Ali Connors
                                        </Typography>
                                        {post.body}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {(data.length - 1) !== idx && <Divider variant="inset" component="li" />}
                    </div>
                })}
            </List>}
        </div>
    );
}
