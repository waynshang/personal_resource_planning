import React, {Fragment, Suspense, lazy } from 'react';

import SideBar from '../components/SideBar'
import { Redirect, useRouteMatch, useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AuthProvider} from '../components/AuthContext'
import {useAuth} from '../components/AuthContext'
import { Container, makeStyles } from '@material-ui/core';
import PrivateRoute from '../components/PrivateRoute';

const useStyles= makeStyles((theme) => ({
  container: {
    height: '100vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1464254786740-b97e5420c299?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1951&q=80)',//'url(https://source.unsplash.com/random)',
    backgroundColor: '#383f42',
    maxWidth: "none"
  }
}))

function PageLoader(){
  
  const DashBoardPage = lazy(() => import("./dashBoardPage"));
  const TimeLineList = lazy(() => import('./timelineListPage'));
  const SignInPage = lazy(() => import('./logInPage'));
  const SignUpPage = lazy(() =>  import('./signUpPage'));

  const isLogin = useRouteMatch("/logIn");
  const isSignUp = useRouteMatch("/signUp");
  const needSideBar = !(isLogin || isSignUp)
  const classes = useStyles();
  let containerClass = !needSideBar ? classes.container : null

  return(
    <Container className="d-flex align-items-center justify-content-center container" className={containerClass}>
      <div className="w-100">
        <Suspense fallback={<Fragment />}>
          <AuthProvider>
            {needSideBar ?
            <SideBar>
              <Switch>
                <PrivateRoute exact path="/" component={DashBoardPage} toDashboard ={true}/>
                <Route path="/timeLineList">
                  <TimeLineList/>
                </Route>
              </Switch>
            </SideBar> :
            <Switch>
              <PrivateRoute path="/signUp" component={SignUpPage} toDashboard ={false}/>
              <PrivateRoute path="/logIn" component={SignInPage} toDashboard ={false}/>
            </Switch>
            }
          </AuthProvider>
        </Suspense>
      </div>
    </Container>
  )
}
export default PageLoader