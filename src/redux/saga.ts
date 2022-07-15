import { all } from 'typed-redux-saga';
import { watchGetAll } from '../slices/saga';

function* rootSaga() {
    yield* all([watchGetAll()])
}

export default rootSaga;