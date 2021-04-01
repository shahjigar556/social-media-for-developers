import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useState} from 'react';
import Button from "@material-ui/core/Button";
import {useDispatch,useSelector} from 'react-redux';
import {login} from '../../Redux/auth/actions';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
import {forgot} from '../../Redux/auth/actions'

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
function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData,setFormData]=useState({
    email:''
  })
  
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=async ()=>{
    console.log(formData)
    dispatch(forgot(formData));
  }
  return (
    <React.Fragment>
      <div className={classes.root}>
        <h1 className={classes.heading}>ForgotPassword</h1>
        <p style={{ fontSize: "25px" }}>
          <span style={{ marginRight: "10px" }}>
            <i className="fas fa-user"></i>
          </span>
          Recover Your Account
        </p>
        <form className={classes.form} >
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={classes.inputs}
            onChange={(e)=>handleChange(e)}
            required
          />     
        </form>
        <Button onClick={handleSubmit} color="primary" variant="contained">Reset Password</Button>
      </div>
    </React.Fragment>
  );
}

export default ForgotPassword;
