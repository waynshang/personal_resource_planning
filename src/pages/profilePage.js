import React, {useContext, useState, useEffect} from 'react';
import { useForm, FormProvider } from "react-hook-form";
import {useAuth} from "../components/AuthContext"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import {isPresent} from '../Common'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function ProfilePage(props) {
  // console.log("profile")
  const [error, setError] = useState('')
  const {updateCurrentUserProfile, updatePhoneNumber, currentUser} = useAuth();
  const classes = useStyles();
  const displayName = currentUser.displayName || ""
  const defaultFirstName = displayName.split(' ')[0].trim()
  const defaultLastName = displayName.split(' ')[1] ? displayName.split(' ')[1].trim() : ''

  //react hook form
  const methods = useForm({
    defaultValues: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
      phoneNumber: currentUser.phoneNumber
    }
  });
  const { register, handleSubmit, errors } = methods;

  async function handleUpdateProfile(data){
    // console.log("handleUpdateProfile")
    // console.log(data)
    setError('')
    try{
      if(data.firstName || data.lastName) await updateCurrentUserProfile(data.firstName, data.lastName)
      // if (data.phoneNumber) await updatePhoneNumber(data.phoneNumber)
    }catch(error){
      setError(error["message"])
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {/* <FormProvider {...methods}> // pass all methods into the context */}
          <form className={classes.form} noValidate onSubmit={handleSubmit(handleUpdateProfile)} >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={register}
                  error={isPresent(errors.firstName)}
                  helperText={isPresent(errors.firstName) ? "Required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  inputRef={register({required: true})}
                  error={isPresent(errors.lastName)}
                  helperText={isPresent(errors.lastName) ? "Required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  inputRef={register}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </Button>
          </form>
        {/* </FormProvider> */}
      </div>

    </Container>
  );
}

export default ProfilePage;