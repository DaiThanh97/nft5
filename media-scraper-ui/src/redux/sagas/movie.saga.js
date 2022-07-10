import { call, put, takeLatest } from 'redux-saga/effects';
import { STATUS_CODE } from '../../configs/constant';
import { notiAct } from '../actions/noti.action';
import { GET_MOVIES_SAGA, SHARE_MOVIE_SAGA } from '../constants/movie.constant';
import { movieService } from '../../services/movie.service';
import { getMoviesAct } from '../actions/movie.action';
import { loadingShareAct } from '../actions/loading.action';

function* getMovies({ payload }) {
    try {
        const { page, count, search } = payload;
        const { status, data } = yield call(() => movieService.getMovies(page, count, search));

        if (status === STATUS_CODE.SUCCESS) {
            // Dispatch action to store
            yield put(getMoviesAct(data));
        }
    }
    catch (err) {
        const { status, data } = err.response;
        yield put(notiAct({ status, message: data.message }));
    }
}

function* shareMovie({ payload }) {
    try {
        yield put(loadingShareAct(true));
        const { urls, history } = payload;
        const { status } = yield call(() => movieService.shareMovie(urls));
        if (status === STATUS_CODE.CREATED || status === STATUS_CODE.SUCCESS) {
            // Dispatch action to store
            history.push('/');
        }
        yield put(notiAct({ status, message: 'Share videos successfully' }));
    }
    catch (err) {
        const { status, data } = err.response;
        yield put(notiAct({ status, message: data.message }));
    }
    finally {
        yield put(loadingShareAct(false));
    }
}

export function* movieSaga() {
    yield takeLatest(GET_MOVIES_SAGA, getMovies);
    yield takeLatest(SHARE_MOVIE_SAGA, shareMovie);
}