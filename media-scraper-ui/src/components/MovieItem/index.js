import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react'
import ReactPlayer from 'react-player';
import { useStyles } from './style';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CommentIcon from '@mui/icons-material/Comment';

export default function MovieItem(props) {
    const classes = useStyles();
    const { movie } = props;

    return (
        <div>
             <Typography variant="h6" color="primary">
               #{movie.id}
            </Typography>
            <Grid container spacing={1} alignItems="flex-start">
                <Grid item sm={12} md={7}>
                    <ReactPlayer url={movie.url} controls width="100%" />
                </Grid>
                <Grid item sm={12} md={5}>
                    <div className={classes.content}>
                        <Typography variant="h6" color="secondary">
                            {movie.title}
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="body1" >
                                Shared by:
                            </Typography>
                            <Typography variant="h6" color='primary' >
                                {movie.user.name}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Box display="flex" alignItems="center" sx={{ marginRight: 10 }}>
                                <Box sx={{ marginRight: 5 }}>
                                    <ThumbUpIcon />
                                </Box>
                                <Box>
                                    <Typography variant="body1" display="inline">
                                        {(+movie.likeCount).toLocaleString()}
                                    </Typography>
                                </Box>
                                
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Box sx={{ marginRight: 5 }}>
                                    <RemoveRedEyeIcon />
                                </Box>
                                <Box>
                                    <Typography variant="body1" display="inline">
                                        {(+movie.viewCount).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" marginLeft={1}>
                                <Box sx={{ marginRight: 5 }}>
                                    <CommentIcon />
                                </Box>
                                <Box>
                                    <Typography variant="body1" display="inline">
                                        {(+movie.commentCount).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant="body1" style={{marginTop: '10px'}}>
                            Description:
                        </Typography>
                        <Typography variant="body1" className={classes.description}>
                            {movie.description}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
