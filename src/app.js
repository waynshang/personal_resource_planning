import React, { useState } from 'react';
import PageLoader from './pages/pageLoader'
import SideBar from './components/SideBar'
import {Redirect, useRouteMatch} from 'react-router-dom';
import SignInPage from './pages/logInPage'


// import { useParams} from "react-router";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App(){
    const [auth, setAuth] = useState(false);
    const isLogin = useRouteMatch("/logIn");
    return (
        <PageLoader/>
    )
}
export default App