import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Links from './Links'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderBottom:'3px solid #17a2b8',

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
    [theme.breakpoints.down('xs')]:{
      paddingBottom:theme.spacing(2),
      
    }
  },
  AppStyle:{
    display:'flex',
    flesDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    flexWrap:'wrap',
    paddingBottom:theme.spacing(2),
    [theme.breakpoints.down('xs')]:{
      display:'block',
      textAlign:'center'
    }
  }
  
}));


function Navbar() {
  const classes=useStyles();
  const user=useSelector(state=>state.auth);
  return (
    <div className={classes.root}>
     <AppBar position="static" style={{background:"#343a40",opacity:'0.9'}}>

        <Toolbar className={classes.AppStyle}>
          <Link to='/' style={{textDecoration:'none',color:'white'}}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" style={{display:'inline'}}>
              <i className="fas fa-code"></i>
            </IconButton>   
          </Link>
          <Typography variant="h4" className={classes.title}>
            CodeBook
          </Typography>
          <Links />   

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;
