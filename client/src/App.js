import React from 'react'
import './App.css'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {Route,Switch} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login'
import Alert from './components/layout/Alert';
import {loadUser} from './Redux/auth/actions';
import setAuthToken from './utils/setAuthToken';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import DashBoard from './components/layout/DashBoard';

if(localStorage.token)
     setAuthToken(localStorage.token)


function App() {
   const dispatch = useDispatch();
   useEffect(()=>{
        console.log(localStorage.getItem('token'));
        dispatch(loadUser());
   },[]);
  return (  
        <React.Fragment>
          <Navbar />
          <Alert />
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route excat path='/login' component={Login} />
            <Route excat path='/dashboard' component={DashBoard} />
          </Switch>
        </React.Fragment>
  )
}

export default App
