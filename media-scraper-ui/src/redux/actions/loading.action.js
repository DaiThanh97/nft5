import { LOADING_LOGIN, LOADING_SHARE, LOADING_SIGNUP } from './../constants/loading.constant';

export const loadingLoginAct = (payload) => ({
    type: LOADING_LOGIN,
    payload
})

export const loadingSignUpAct = (payload) => ({
    type: LOADING_SIGNUP,
    payload
})

export const loadingShareAct = (payload) => ({
    type: LOADING_SHARE,
    payload
})
