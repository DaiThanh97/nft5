import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    content: {
        paddingLeft: theme.spacing(3)
    },
    description: {
        fontWeight: 700,
        width: '340px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxHeight: '200px',
        display: "box",
        lineClamp: 7,
        boxOrient: 'vertical'
    }
}));