import React from 'react';
import TimeLineList from './pages/timelineListPage'
import SignInPage from './pages/logInPage'
import Dashboard from './pages/dashBoardPage'
// import { useParams} from "react-router";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useRouteMatch, useHistory } from "react-router-dom";


function App(){
    const isLogin = useRouteMatch("/warranty_timeline/logIn");
    const isTimeLineList = useRouteMatch("/warranty_timeline/timeLineList");
    const isDashBoard = useRouteMatch("/warranty_timeline");
    return (
    <div className='app' >
        {isTimeLineList && <TimeLineList/>}
        {isLogin && <SignInPage/>}
        {isDashBoard && <Dashboard/>}
    </div>
    )
}
export default App