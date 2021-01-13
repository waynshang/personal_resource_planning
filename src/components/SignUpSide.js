import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory , Link} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';


///---------auth
import {useAuth} from "./AuthContext"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/logIn">
        Personal Resource
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark//.default.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpSide() {
  const classes = useStyles();
  const email = useRef(null);
  const password = useRef(null);
  const {signup} = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let history = useHistory();

  async function handleSubmit(e){
    e.preventDefault()
    console.log('email: '+ email.current.value)
    console.log('password: '+ password.current.value)
    try{
      setError('')
      setLoading(true)
      const result = await signup(email.current.value ,password.current.value)
      setLoading(false)
      history.push('/')
    } catch (error){
      setError(error["message"])
    }
    setLoading(false)
  }

  const handleClick = ()=>{
    console.log(email.current.value)
    console.log(password.current.value)
    // history.push('/personal_resource_planning/dashboard')
   }

  return (
    <Grid container component="main" className={classes.root} direction="row" justify="center" alignItems="center" >
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid item xs={6} md={4} lg={3} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <Avatar className={classes.avatar} style={{backgroundColor: '#515b5f'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              inputRef={email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              inputRef={password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              type = 'submit'
              style={{backgroundColor: '#515b5f', color: '#e3f2fd'}}
              disabled = {loading}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/logIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
