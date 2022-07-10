import { CLEAR_MOVIES, GET_MOVIES } from "../constants/movie.constant";

export const getMoviesAct = (payload) => ({
    type: GET_MOVIES,
    payload
})

export const clearMoviesAct = () => ({
    type: CLEAR_MOVIES,
})
