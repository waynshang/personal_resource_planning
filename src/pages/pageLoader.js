import React from 'react';
import TimeLineList from './timelineListPage'
import SignInPage from './logInPage'
import Dashboard from './dashBoardPage'
// import { useParams} from "react-router";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useRouteMatch, useHistory } from "react-router-dom";


function PageLoader(){
    const isLogin = useRouteMatch("/logIn");
    const isTimeLineList = useRouteMatch("/timeLineList");
    const isDashBoard = useRouteMatch("dashboard");
    let page = <div></div>
    if (isTimeLineList){
      page = <TimeLineList/>
    }
    else if(isLogin){
      page = <SignInPage/>
    }
    else if(isDashBoard){
      page = <Dashboard/>
    }
    return (
      page
    )
}
export default PageLoader