import { userService } from "../../services/user.service";
import { LOGIN, LOGOUT, CHECK_LOGIN } from "../constants/user.constant";

const initialState = {
    username: '',
    name: '',
    isLoggedIn: false,
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN: {
            const { accessToken, username, name } = payload;
            // Saved token
            userService.setToken(accessToken);
            userService.setName(name);
            state.name = name;
            state.username = username;
            state.isLoggedIn = true;
            return { ...state }
        }
        case LOGOUT: {
            userService.setToken('');
            userService.setName('');
            state.isLoggedIn = false;
            return { ...state };
        }
        case CHECK_LOGIN: {
            const isTokenExpired = userService.isTokenExpired();
            if (isTokenExpired) {
                state.isLoggedIn = false;
                state.username = '';
            }
            else {
                state.isLoggedIn = true;
                state.name = userService.getName();
            }
            return { ...state };
        }
        default:
            return { ...state }
    }
}

export default userReducer;