import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_SAGA, SIGNUP_SAGA } from '../constants/user.constant';
import { userService } from './../../services/user.service';
import { STATUS_CODE } from '../../configs/constant';
import { logInAct, signUpAct } from './../actions/user.action';
import { notiAct } from '../actions/noti.action';
import { loadingLoginAct, loadingSignUpAct } from '../actions/loading.action';
import history from '../../components/History';

function* loginUser({ payload }) {
    try {
        yield put(loadingLoginAct(true));
        const { username, password } = payload;
        const { status, data } = yield call(() => userService.logIn(username, password));
        if (status === STATUS_CODE.SUCCESS) {
            // Dispatch action to store
            yield put(logInAct(data));
            yield put(notiAct({ status, message: 'Sign in successfully!' }));
            history.push('/');
        }
    }
    catch (err) {
        const { status, data } = err.response;
        yield put(notiAct({ status, message: data.message }));
    }
    finally {
        yield put(loadingLoginAct(false));
    }
}

function* signinUser({ payload }) {
    try {
        yield put(loadingSignUpAct(true));
        const { username, password, name } = payload;
        const { status, data } = yield call(() => userService.signUp(username, password, name));
        if (status === STATUS_CODE.CREATED) {
            // Dispatch action to store
            yield put(signUpAct(data));
            history.push('/sign-in');
        }
        yield put(notiAct({ status, message: 'Sign up successfully! Please sign in' }));
    }
    catch (err) {
        const { status, data } = err.response;
        yield put(notiAct({ status, message: data.message }));
    }
    finally {
        yield put(loadingLoginAct(false));
    }
}

export function* userSaga() {
    yield takeLatest(LOGIN_SAGA, loginUser);
    yield takeLatest(SIGNUP_SAGA, signinUser);
}