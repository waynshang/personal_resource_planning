import React, { useEffect } from 'react';
import PageLoader from './pages/pageLoader'


// import { useParams} from "react-router";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App(){
    useEffect(()=>{
      const favIcon = document.getElementById("favicon");
      if (process.env.NODE_ENV === 'production'){favIcon.href = 'moon.png'}
      }, []
    )
    return (
        <PageLoader/>
    )
}
export default App