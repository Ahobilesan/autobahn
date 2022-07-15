import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer'
import postReducer from "../slices/slice"
import rootSaga from './saga';

// ...
const RootReducer = combineReducers({
    root: reducer,
    post: postReducer
})

function StoreSetup() {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    });
    middlewares.push(sagaMiddleware);

    const store = configureStore({
        reducer: RootReducer,
        middleware: middlewares,
    })

    sagaMiddleware.run(rootSaga);
    return store
}

export const store = StoreSetup()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch