import { call, put, takeEvery, takeLatest } from 'typed-redux-saga';
import API from "../assets/api/";
import { setPost, } from './slice';

const fetchAllPost = () => ({
    type: fetchAllPost.type
});
fetchAllPost.type = 'post/FETCHALLPOST';

function* getAll() {
    try {
        const list: any = yield* call(API.getAll);
        if (list.error === false) {
            yield* put(setPost({ posts: list.data }))
        } else {
            yield* put(setPost([]))
        }
    } catch (error) {
        yield* put({ type: "List_Fetching_Failed", data: [] })
        yield* put(setPost({ posts: [{}] }))
    }
}

function* watchGetAll() {
    yield* takeEvery(fetchAllPost.type, getAll)
}


export {
    fetchAllPost,
    getAll,
    watchGetAll
}