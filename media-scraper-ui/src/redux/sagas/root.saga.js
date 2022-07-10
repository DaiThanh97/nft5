import { all } from 'redux-saga/effects';
import { userSaga } from './user.saga';
import { movieSaga } from './movie.saga';

export default function* rootSaga() {
    yield all([
        userSaga(),
        movieSaga()
    ]);
};