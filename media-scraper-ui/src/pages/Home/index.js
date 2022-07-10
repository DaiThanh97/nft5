import React, { useEffect, useState, useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import MovieItem from '../../components/MovieItem';
import { useDispatch, useSelector } from 'react-redux';
import { GET_MOVIES_SAGA } from '../../redux/constants/movie.constant';
import { useStyles } from './style';
import { clearMoviesAct } from '../../redux/actions/movie.action';
import { Pagination } from '@mui/material';
import { Box } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

const VIDEOS_PER_PAGE = 5;

export default function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState(''); 
    const pagination = useRef({ page: 1, count: VIDEOS_PER_PAGE });
    const { totalMovie, listMovie } = useSelector(state => state.movieReducer);

    const fetchListMovies = () => {
        dispatch(clearMoviesAct());
        dispatch({ type: GET_MOVIES_SAGA, payload: { ...pagination.current,  search: keyword }});
    }

    useEffect(() => {
        fetchListMovies();
    }, []);

    const generateListMovie = () => {
        return listMovie.map((movie, index) => {
            return <Card key={index} className={classes.movie}>
                <CardContent>
                    <MovieItem movie={movie} />
                </CardContent>
            </Card>
        });
    }

    const handleChangePage = (event, page) => {
        dispatch(clearMoviesAct());
        dispatch({ type: GET_MOVIES_SAGA, payload: { ...pagination.current, count: VIDEOS_PER_PAGE } });
    };

    const handleInputSearch = (event) => {
        const { value } = event.target;
        setKeyword(value);
    }

    const handleSearch = () => {
        fetchListMovies();
    }

    return (
        <div>
            <Container maxWidth="md" component="main">
                <Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="search"
                        label="Search"
                        name="search"
                        value={keyword}
                        onChange={handleInputSearch}
                    />
                     <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSearch}
                        size='small'
                    >
                        <SearchIcon />
                    </Button>
                </Box>
                {generateListMovie()}
                <Box display='flex' justifyContent='center' marginBottom={5}>
                    <Pagination count={Math.ceil(totalMovie / VIDEOS_PER_PAGE)} color="primary" onChange={handleChangePage} />
                </Box>
            </Container>
        </div>
    );
}
