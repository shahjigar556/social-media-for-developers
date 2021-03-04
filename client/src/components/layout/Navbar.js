import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderBottom:'3px solid #17a2b8',
    // [theme.breakpoints.down('xs')]: {
    //   textAlign:'center'
    // }
  },
  menuButton:{
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links:{
    color:"#fff",
    textDecoration:'none',
    marginRight:theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display:'none'
    }
  },
  AppStyle:{
    display:'flex',
    flesDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap'
  }
  
}));


function Navbar() {
  const classes=useStyles();
  return (
    <div className={classes.root}>
     <AppBar position="static" style={{background:"#343a40",opacity:'0.9'}}>

        <Toolbar className={classes.AppStyle}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <i className="fas fa-code"></i>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            DevConnector
          </Typography>
          <Link to='/login' className={classes.links}>
             Login
          </Link>
          <Link to='/register' className={classes.links}>
              Signup
          </Link>          
          <Link to='/developers' className={classes.links}>
              Developers
          </Link>          

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;
