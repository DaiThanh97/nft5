import React, { memo, Fragment, useEffect } from 'react'
import YouTubeIcon from '@material-ui/icons/YouTube';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { checkLoginAct, logOutAct } from '../../redux/actions/user.action';

function NavBar() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { isLoggedIn, name } = useSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(checkLoginAct());
    }, [dispatch])

    const handleLogout = () => {
        dispatch(logOutAct());
        history.push('/sign-in');
    }

    const showLoggedIn = () => {
        return isLoggedIn &&
            <Fragment>
                <Box display="flex" alignItems="center">
                    <Box sx={{ marginRight: 3 }}>
                        <Typography color="textPrimary">
                            Welcome
                        </Typography>
                    </Box>
                    <Box>
                        <Typography color="secondary">
                            {name}
                        </Typography>
                    </Box>
                </Box>
                <Button color="secondary" variant="contained" className={classes.btn}>
                    <Link to="/share" className={classes.link}>
                        Share a movie
                    </Link>
                </Button>
                <Button color="secondary" variant="contained" className={classes.btn} onClick={handleLogout}>
                    LogOut
                </Button>
            </Fragment>
    }

    return (
        <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Link to="/" className={classes.toolbarTitle}>
                    <YouTubeIcon fontSize="large" color="secondary" />
                    <Typography variant="h6" color="secondary" noWrap>
                        ShareTube
                    </Typography>
                </Link>
                {showLoggedIn()}
            </Toolbar>
        </AppBar>
    )
}

export default memo(NavBar);