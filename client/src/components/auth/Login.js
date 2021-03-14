import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useState} from 'react';
import Button from "@material-ui/core/Button";
import {useDispatch,useSelector} from 'react-redux';
import {login} from '../../Redux/auth/actions';
import {Redirect} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#17a2b8",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
  },
  inputs: {
    width: "100%",
    marginBottom: "20px",
    height: "30px",
  },
 
}));
function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user=useSelector(state=>state.auth)
  const {isAuthenticated}=user;
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
  })

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=async ()=>{
    console.log(formData)
    const {name,email,password}=formData;
    dispatch(login(formData));
  }

  if(isAuthenticated){
    return(
      <Redirect to='/dashboard'/>
    )
  }
  return (
    <React.Fragment>
      <div className={classes.root}>
        <h1 className={classes.heading}>Login</h1>
        <p style={{ fontSize: "25px" }}>
          <span style={{ marginRight: "10px" }}>
            <i className="fas fa-user"></i>
          </span>
          Access Your Account
        </p>
        <form className={classes.form} >
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={classes.inputs}
            onChange={(e)=>handleChange(e)}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={classes.inputs}
            onChange={(e)=>handleChange(e)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={classes.inputs}
            onChange={(e)=>handleChange(e)}
            required
          />        
        </form>
        <Button onClick={handleSubmit} color="primary" variant="contained">Login</Button>
      </div>
    </React.Fragment>
  );
}

export default Login;
