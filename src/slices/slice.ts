import { createSlice } from '@reduxjs/toolkit'
import { POST } from '../assets/api/interface';

const initialState = { posts: [] as POST[] }

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost(state, action) {
            console.log(action)
            state.posts = action.payload.posts
        },
        updatePost(state, action) {
            let list: any = state.posts;
            list.unshift(action.payload.posts);
            state.posts = list;
        },
        removePost(state, action) {
            let list = state.posts;
            list.splice(action.payload.idx)
            state.posts = list;
        },
    },
});

export const { setPost, updatePost, removePost } = postSlice.actions
export default postSlice.reducer