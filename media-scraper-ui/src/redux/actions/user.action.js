import { CHECK_LOGIN, LOGIN, LOGOUT, SIGNUP } from "../constants/user.constant";

export const logInAct = (payload) => ({
    type: LOGIN,
    payload
});

export const signUpAct = (payload) => ({
    type: SIGNUP,
    payload
});


export const logOutAct = () => ({
    type: LOGOUT,
})

export const checkLoginAct = () => ({
    type: CHECK_LOGIN,
})

