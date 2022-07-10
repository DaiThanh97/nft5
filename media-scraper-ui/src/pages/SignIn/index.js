import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './style';
import { useFormik } from 'formik';
import { LOGIN_SAGA } from '../../redux/constants/user.constant';
import { validationLogin } from './../../configs/validation';

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loadingLogin } = useSelector(state => state.loadingReducer);
  const formik = useFormik({
      initialValues: {
          username: '',
          password: '',
      },
      validationSchema: validationLogin,
      onSubmit: (values) => {
          // Dispatch to saga
          dispatch({ type: LOGIN_SAGA, payload: { ...values } });
          values.username = "";
          values.password = "";
      },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: 'white' }}>
          <YouTubeIcon fontSize="large" color="secondary" />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign In
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            className={classes.field}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            className={classes.field}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loadingLogin}
          >
            Sign In
          </Button>
          <div style={{textAlign: 'center'}}>
            <Link href="/sign-up" variant="body2" >
              Don't have an account? Sign Up
            </Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
}