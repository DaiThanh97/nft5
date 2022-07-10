import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './style';
import { useFormik } from 'formik';
import { SIGNUP_SAGA } from '../../redux/constants/user.constant';
import { validationSignup } from '../../configs/validation';

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loadingLogin } = useSelector(state => state.loadingReducer);
  const formik = useFormik({
      initialValues: {
          name: '',
          username: '',
          password: '',
          rePassword: '',
      },
      validationSchema: validationSignup,
      onSubmit: (values) => {
          // Dispatch to saga
          dispatch({ type: SIGNUP_SAGA, payload: { ...values } });
          values.name = "";
          values.username = "";
          values.password = "";
          values.rePassword = "";
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            className={classes.field}
            autoFocus
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="rePassword"
            label="Confirm Password"
            type="password"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
            helperText={formik.touched.rePassword && formik.errors.rePassword}
            className={classes.field}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loadingLogin}
          >
            Sign Up
          </Button>
          <div style={{textAlign: 'center'}}>
            <Link href="/sign-in" variant="body2" >
              Already have an account? Sign In
            </Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
}