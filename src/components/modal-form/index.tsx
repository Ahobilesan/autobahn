import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

import API from "../../assets/api";
import { POST } from '../../assets/api/interface';

import { store } from '../../redux/store';
import * as actions from '../../redux/actions';

export default function FormDialog({ data, open }: { data: POST, open: boolean }) {
    const [busy, setBusy] = React.useState(false);
    const [title, setTitle] = React.useState(data.title);
    const [description, setDescription] = React.useState(data.body);

    const handleClose = async (_?: any, reason?: string) => {
        if (reason) return;
        const state = store.getState()
        await store.dispatch({ type: actions.SET_MODAL, data: !state.openModal })
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "description") {
            setDescription(event.target.value)
        } else {
            setTitle(event.target.value)
        }
    };

    const submitForm = async (e: any) => {
        e.preventDefault();
        setBusy(true)
        let post = data ? { ...data } : {} as any;
        post.title = title ? title : post.title;
        post.body = description ? description : post.body;

        const posts = [...store.getState().post];
        let res;
        if (data.id) {
            res = await API.update(post)
            let idx = posts.findIndex((x) => x.id === data.id)
            if (idx !== -1) {
                posts[idx] = post;
            }
        } else {
            res = await API.create(post)
            posts.unshift(post)
        }

        if (res.error !== true) {
            if (!data.id) {
                posts[0].id = res.data.id
            }
            await store.dispatch({ type: actions.SET_POST, data: [...posts] })
            handleClose(e, "")
        } else {

        }
        setBusy(false)
    }



    return (
        <Dialog open={open} onClose={handleClose}>
            <Box
                component="form"
                autoComplete="off"
                onSubmit={submitForm}
            >
                {data.id && <DialogTitle>Edit Post (#{data.id})</DialogTitle>}
                {!data.id && <DialogTitle>Add Post</DialogTitle>}
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        id="title"
                        margin='normal'
                        label="Title"
                        fullWidth
                        variant="standard"
                        name="title"
                        value={title === undefined ? data.title : title}
                        onChange={handleChange}
                        disabled={busy}
                    />
                    <TextField
                        required
                        id="description"
                        margin='normal'
                        label="Description"
                        multiline
                        fullWidth
                        rows={8}
                        name="description"
                        value={description === undefined ? data.body : description}
                        onChange={handleChange}
                        disabled={busy}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" disabled={busy} onClick={handleClose}>Cancel</Button>
                    {data.id && <Button variant="contained" style={{ width: "8em" }} disabled={busy} type='submit'>{busy ? <CircularProgress size={24} color="inherit" /> : "Update"}</Button>}
                    {!data.id && <Button variant="contained" style={{ width: "8em" }} disabled={busy} type='submit'>{busy ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>}
                </DialogActions>
            </Box>
        </Dialog>
    );
}
