import { LOADING_LOGIN, LOADING_SHARE } from '../constants/loading.constant';

const initialState = {
    loadingLogin: false,
    loadingShare: false,
}

const loadingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOADING_LOGIN:
            return { ...state, loadingLogin: payload }
        case LOADING_SHARE:
            return { ...state, loadingShare: payload }
        default:
            return { ...state }
    }
}

export default loadingReducer;