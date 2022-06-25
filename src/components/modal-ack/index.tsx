import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CircularProgress from '@mui/material/CircularProgress';

import API from "../../assets/api";
import { POST } from '../../assets/api/interface';

import { store } from '../../redux/store';
import * as actions from '../../redux/actions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AakModal({ data, open }: { data: POST, open: boolean }) {
    const [busy, setBusy] = React.useState(false);

    const handleClose = async () => {
        const state = store.getState()
        await store.dispatch({ type: actions.SET_ACK_MODAL, data: !state.openModal })
    };

    const deletePost = async (e: any) => {
        setBusy(true)

        const posts = [...store.getState().post];
        let res = await API.delete(data.id)

        if (res.error !== true) {
            let idx = posts.findIndex((x) => x.id === data.id)
            if (idx !== -1) {
                posts.splice(idx, 1)
                await store.dispatch({ type: actions.SET_POST, data: [...posts] })
            }
            handleClose()
        } else {

        }
        setBusy(false)
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Are you sure want to delete post #{data.id}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    This action cannot be undone!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" disabled={busy} onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="error" style={{ width: "8em" }} disabled={busy} onClick={deletePost}>{busy ? <CircularProgress size={24} color="inherit" /> : "Delete"}</Button>
            </DialogActions>
        </Dialog>
    );
}
