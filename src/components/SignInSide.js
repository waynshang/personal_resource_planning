import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';


///---------auth
import {useAuth} from "./AuthContext"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/personal_resource_planning/logIn">
        The TimeLine Manager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1464254786740-b97e5420c299?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1951&q=80)',//'url(https://source.unsplash.com/random)',
    backgroundColor: '#383f42',
    
  },
  // image: {
  //   backgroundImage: 'url(https://i.pinimg.com/originals/d4/d5/5b/d4d55bc063c093fb45d326dbe24a942b.jpg)',//'url(https://source.unsplash.com/random)',
  //   backgroundColor:
  //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  // },

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

export default function SignInSide() {
  const classes = useStyles();
  const email = useRef(null);
  const password = useRef(null);
  const {signup} = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    console.log('email: '+ email.current.value)
    console.log('password: '+ password.current.value)
    try{
      setError('')
      setLoading(true)
      const result = await signup(email.current.value ,password.current.value)
      console.log(result["message"])
      setLoading(false)

    } catch (error){
      console.log("catch")
      console.log(error["message"])
      setError(error["message"])
    }
    console.log(error)
    setLoading(false)

  }

  let history = useHistory();

  const handleClick = ()=>{
    console.log(email.current.value)
    console.log(password.current.value)
    // history.push('/personal_resource_planning/dashboard')
   }

  return (
    <Grid container component="main" className={classes.root} direction="row" justify="center" alignItems="center" >
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid item xs={6} md={4} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <Avatar className={classes.avatar} style={{backgroundColor: '#515b5f'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{color: '#515b5f', fontWeight: "bold"}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" style={{color: '#515b5f', fontWeight: "bold"}}>
                  {"Don't have an account? Sign Up"}
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
