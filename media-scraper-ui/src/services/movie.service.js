import Axios from 'axios';
import { userService } from './user.service';

class MovieService {
    getMovies = (page, count, search) => {
        return Axios.get(`${process.env.REACT_APP_API_URL}/videos?page=${page}&count=${count}&search=${search}`);
    }

    shareMovie = (urls) => {
        return Axios.post(`${process.env.REACT_APP_API_URL}/videos`, {
            urls,
        }, {
            headers: {
                Authorization: `Bearer ${userService.getToken()}`
            }
        });
    }
}

export const movieService = new MovieService();