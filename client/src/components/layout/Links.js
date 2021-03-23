import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch,useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {logout} from '../../Redux/auth/actions';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({    
    links:{
      color:"#fff",
      textDecoration:'none',
      marginRight:theme.spacing(2),
      [theme.breakpoints.down('xs')]:{
        paddingBottom:theme.spacing(2),      
      }
    },  
  }));
export default function Links() {
    const classes=useStyles();
    const user=useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const {isAuthenticated}=user;

    const handleClick=()=>{
       alert(`Are You sure You want to Logout: ${user.user.name}`); 
       dispatch(logout());
    }

    if(isAuthenticated){
        return(
          <React.Fragment>
              <Button onClick={handleClick} variant="contained" color="primary">Logout</Button> 
              <Link to='/developers' className={classes.links} style={{marginLeft:'10px'}}>
                   Developers
              </Link>   
          </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Link to='/login' className={classes.links}>
             Login
           </Link>
          <Link to='/register' className={classes.links}>
              Signup
          </Link>          
          <Link to='/developers' className={classes.links}>
              Developers
          </Link>   
        </React.Fragment>
    )
}
