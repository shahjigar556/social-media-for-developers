import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useState} from 'react';
import Button from "@material-ui/core/Button";
import {useDispatch,useSelector} from 'react-redux';
import {setAlert,removeAlert} from '../../Redux/alert/actions';
import {register} from '../../Redux/auth/actions';
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
function Register() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const alerts=useSelector(state=>state.alert)
  const user=useSelector(state=>state.auth);
  const {isAuthenticated}=user;
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const handleChange=async (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=()=>{
   
    const msg="Password does not match"
    const alertType="danger";
    if(formData.password!==formData.confirmPassword){
      console.log("Password does not match")
      dispatch(setAlert(msg,alertType));
    }
    else{
      console.log("Password match");
      // Remove all Password not match alerts
      let ids=[];
      alerts.map(a=>{
        if(a.msg==msg && a.alertType==alertType){    
            ids.push(a.id)
        }
      })
      ids.map(id=>{
        dispatch(removeAlert(id))
      })
      const {name,email,password}=formData;
      dispatch(register({name,email,password}));
    }
    console.log(formData)
  }

  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }
  return (
    <React.Fragment>
      <div className={classes.root}>
        <h1 className={classes.heading}>SignUp</h1>
        <p style={{ fontSize: "25px" }}>
          <span style={{ marginRight: "10px" }}>
            <i className="fas fa-user"></i>
          </span>
          Create Your Account
        </p>
        <form className={classes.form} >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={classes.inputs}
            onChange={(e)=>handleChange(e)}
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            className={classes.inputs}
            onChange={(e)=>handleChange(e)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={classes.inputs}
            onChange={(e)=>handleChange(e)}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={classes.inputs}
            onChange={(e)=>handleChange(e)}
          />
        </form>
        <Button onClick={handleSubmit} color="primary" variant="contained">Register</Button>
      </div>
    </React.Fragment>
  );
}

export default Register;