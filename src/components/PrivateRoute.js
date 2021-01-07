import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useAuth} from './AuthContext'

export default function PrivateRoute({component: Component, toDashBoard: toDashBoard, ...rest }) {
  console.log(useAuth())
  const {currentUser} = useAuth()

  return (
    <Route {...rest}
      render={props => { 
        if (toDashBoard){
          return currentUser ? <Component {...props}/> : <Redirect to="/logIn"/>
        } else {
          return currentUser ? <Redirect to="/"/> : <Component {...props}/>
        }
        
        }
      }
    >
    </Route>
  );
}
