import Axios from 'axios';
import decode from 'jwt-decode';
import { STORAGE_KEY } from '../configs/constant';

class UserService {
    logIn(username, password) {
        return Axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            username,
            password
        });
    }

    signUp(username, password, name) {
        return Axios.post(`${process.env.REACT_APP_API_URL}/auth/signUp`, {
            username,
            password,
            name
        });
    }

    isTokenExpired() {
        const token = this.getToken();
        try {
            const decoded = decode(token);
            return Date.now() >= decoded.exp * 1000;
        }
        catch (err) {
            return true;
        }
    }

    setToken(token) {
        localStorage.setItem(STORAGE_KEY.USER_TOKEN, token);
    }

    setName(name) {
        localStorage.setItem(STORAGE_KEY.NAME, name);
    }

    getToken() {
        return localStorage.getItem(STORAGE_KEY.USER_TOKEN);
    }

    getName() {
        return localStorage.getItem(STORAGE_KEY.NAME);
    }
}

export const userService = new UserService();