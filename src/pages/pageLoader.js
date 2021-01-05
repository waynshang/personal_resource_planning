import React, {Fragment, Suspense, lazy } from 'react';
// import TimeLineList from './timelineListPage'
// import SignInPage from './logInPage'
// import SignUpPage from './signUpPage'
// import Dashboard from './dashBoardPage'
import SideBar from '../components/SideBar'
import { useRouteMatch, useHistory, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AuthProvider} from '../components/AuthContext'
import { Container, makeStyles } from '@material-ui/core';
// function PageLoader(){
//     const isLogin = useRouteMatch("/logIn");
//     const isTimeLineList = useRouteMatch("/timeLineList");
//     const isDashBoard = useRouteMatch("dashboard");
//     let page = <div></div>
//     if (isTimeLineList){
//       page = <TimeLineList/>
//     }
//     else if(isLogin){
//       page = <SignInPage/>
//     }
//     else if(isDashBoard){
//       page = <Dashboard/>
//     }
//     return (
//       page
//     )
// }
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
                <Route exact path="/">
                  <DashBoardPage/>
                </Route>
                <Route path="/timeLineList">
                  <TimeLineList/>
                </Route>
              </Switch>
            </SideBar> :
            <Switch>
              <Route path="/signUp">
                <SignUpPage/>
              </Route>
              <Route path="/logIn">
                <SignInPage/>
              </Route>
            </Switch>
            }
          </AuthProvider>
        </Suspense>
      </div>
    </Container>
  )
}
export default PageLoader