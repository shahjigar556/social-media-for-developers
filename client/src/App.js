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
import DashBoard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/dashboard/profile/CreateProfile';
import EditProfile from './components/dashboard/profile/EditProfile';
import AddExperience from './components/dashboard/profile/AddExperience';
import AddEducation from './components/dashboard/profile/AddEducation';
import DevelopersProfile from './components/dashboard/profiles/DevelopersProfile';
import IndividualProfile from './components/dashboard/profiles/IndividualProfile';
import Post from './components/post/Post';
import SinglePost from './components/post/post/SinglePost';

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
              <Route excat path='/developers' component={DevelopersProfile} />
              <Route excat path='/profile/:id' component={IndividualProfile} />
              <PrivateRoute excat path='/dashboard' component={DashBoard} />
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/experience' component={AddExperience} />
              <PrivateRoute exact path='/education' component={AddEducation} />
              <PrivateRoute exact path='/post' component={Post} />
              <PrivateRoute exact path='/post/:id' component={SinglePost} />
          </Switch>
        </React.Fragment>
  )
}

export default App
