import React from 'react';
import TimeLineList from './timelineListPage'
import SignInPage from './logInPage'
import Dashboard from './dashBoardPage'
// import { useParams} from "react-router";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useRouteMatch, useHistory } from "react-router-dom";


function PageLoader(){
    const isLogin = useRouteMatch("/warranty_timeline/logIn");
    const isTimeLineList = useRouteMatch("/warranty_timeline/timeLineList");
    const isDashBoard = useRouteMatch("/warranty_timeline");
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