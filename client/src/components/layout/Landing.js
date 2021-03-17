import { makeStyles } from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'
import React from 'react'
import Button from '@material-ui/core/Button';
import Background from '../../img/showcase.jpg'
import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux';

const useStyles=makeStyles(theme=>({
  root:{
    color:'#fff'
  },
  Links:{
    textDecoration:'none',
    color:'#fff',
    marginRight:'10px',
    marginTop:'10px'
  }
}))
function Landing() {
  const classes=useStyles();
  const LandingStyle={
    backgroundImage:`url(${Background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height:'100vh',
    display:'flex',
    flexDirection:'column',
    color:"#fff",
    justifyContent:'center',
    alignItems:'center',
    fontWeight:'bold'
  }
  const user=useSelector(state=>state.auth);
  const {isAuthenticated}=user;
  if(isAuthenticated){
    return (
      <Redirect to='/dashboard' />
    )
  }
    return (
     <div style={LandingStyle}>
       <h1>Developer Connector</h1>
       <Typography variant="h6" style={{fontWeight:'bold'}}>
          Create a developer profile/portfolio,share posts and get help from other developers
       </Typography>
       <div>
         <Link to='/register' className={classes.Links}>
            <Button variant="contained" color="primary">
                 Signup
            </Button>
         </Link>
         <Link to="/login" className={classes.Links}>
            <Button variant="contained" color="default">
                Login
            </Button>
         </Link>
       </div>
     </div>
    )
}

export default Landing
