import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Redirect, Route } from 'react-router-dom';
import {useAuth} from './AuthContext'
import SideBar from './SideBar'

export default function PrivateRoute({component: Component, ...rest }) {
  const {currentUser} = useAuth()

  return (
    <Route {...rest}
      render={props => { 
          console.log(props)
          if (rest.toDashboard){
            return currentUser ? <SideBar><Component {...props}/></SideBar> : <Redirect to="/logIn" />
          } else {
            return currentUser ? <Redirect to="/"/> : <Component {...props}/>
          }
          }
        }
      >
    </Route>      
    
    
  );
}
