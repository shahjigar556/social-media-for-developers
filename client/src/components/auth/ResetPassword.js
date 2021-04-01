import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useState} from 'react';
import Button from "@material-ui/core/Button";
import {useDispatch,useSelector} from 'react-redux';
import {setAlert,removeAlert} from '../../Redux/alert/actions';
import {reset} from '../../Redux/auth/actions';
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
function ResetPassword({history,match}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [formData,setFormData]=useState({
    password:'',
    confirmPassword:''
  })

  const handleChange=async (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=()=>{
    if(formData.password!==formData.confirmPassword){
      dispatch(setAlert("Password does not match"));
    }
    else{
      const {password}=formData;
      dispatch(reset({password},match.params.id,history))
    }
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <h1 className={classes.heading}>Password Create</h1>
        <p style={{ fontSize: "25px" }}>
          <span style={{ marginRight: "10px" }}>
            <i className="fas fa-user"></i>
          </span>
          Create Your Password
        </p>
        <form className={classes.form} >
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
        <Button onClick={handleSubmit} color="primary" variant="contained">Reset</Button>
      </div>
    </React.Fragment>
  );
}

export default ResetPassword;