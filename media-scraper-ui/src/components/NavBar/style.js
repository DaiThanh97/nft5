import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
        marginLeft: theme.spacing(0.5),
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center'
    },
    field: {
        margin: theme.spacing(0, 2),
    },
    btn: {
        margin: theme.spacing(1, 1),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.secondary.contrastText
    }
}));