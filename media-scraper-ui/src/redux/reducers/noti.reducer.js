import { NOTI } from "../constants/noti.constant"

const initialState = {
    noti: {
        status: 0,
        message: ''
    }
}

const notiReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case NOTI:
            const notiUpdate = { ...state.noti };
            notiUpdate.status = payload.status;
            notiUpdate.message = payload.message;
            state.noti = notiUpdate;
            return { ...state }
        default:
            return { ...state }
    }
}

export default notiReducer;