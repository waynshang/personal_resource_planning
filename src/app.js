import React, { useState } from 'react';
import PageLoader from './pages/pageLoader'
import SideBar from './components/SideBar'
import {Redirect} from 'react-router-dom';

// import { useParams} from "react-router";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useRouteMatch, useHistory } from "react-router-dom";


function App(){
    const [auth, setAuth] = useState(false);
    return (
    <div className='app' >
        {!auth && <Redirect to="/logIn"/>}
        <SideBar pageComponent={<PageLoader/>}/>
    </div>
    )
}
export default App