import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile,updateEducation } from "../../../Redux/profile/action";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputs: {
    marginTop: "10px",
    width: "60%",
    height: "30px",
  },
  heading: {
    textAlign: "center",
    color: "#17a2b8",
  },
  subHeading: {
    textAlign: "center",
    [theme.breakpoints.down('sm')]:{
      display:'none'
    }
  },
  pStyle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginRight:'53%',
    [theme.breakpoints.down('sm')]:{
      margiRight:'30%',
      marginLeft:'11%'   
    }
  },
  btnStyle:{
    marginTop:'10px'
}
}));

const initialState = {
  school:'',
  degree:'',
  fieldofstudy:'',
  from:'',
  to:'',
  current:false,
  description:''
};
function AddEducation({history}) {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [formData,setFormData]=useState(initialState);
  const [toDisabled,setToDisabled]=useState(false)

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit=()=>{
    dispatch(updateEducation(formData,history));
  }
  const profileData = useSelector((state) => state.profile);
  const { profile } = profileData;

  const {school,degree,fieldofstudy,from,current,to,description}=formData;

  if (!profile) {
    return (
      <React.Fragment>
        First create Your Profile
        <Link to="/create-profile">
          <Button>Complete Your Profile</Button>
        </Link>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <h1 className={classes.heading}>Add Education</h1>
      <h2 className={classes.subHeading}>
        Add any School Bootcamp That You Have attended
      </h2>
      <form className={classes.root}>
        <input
          name="school"
          className={classes.inputs}
          onChange={(e)=>handleChange(e)}
          value={school}
          required
          placeholder="School"
        />
         <input
          name="degree"
          className={classes.inputs}
          value={degree}
          required
          placeholder="degree"
          onChange={(e)=>handleChange(e)}
        />
         <input
          name="fieldofstudy"
          className={classes.inputs}
          value={fieldofstudy}
          required
          placeholder="fieldofstudy"
          onChange={(e)=>handleChange(e)}
        />
        <input
          name="from"
          type="date"
          onChange={(e)=>handleChange(e)}
          className={classes.inputs}
          value={from}
          required
        />
        <div className={classes.pStyle}>
            <input
              type="checkbox"
              name="current"
              className={classes.inputs}
              value={current}
              required
              style={{marginRight:'10px'}}
              onChange={(e)=>{
                setFormData({...formData,current:!current});
                setToDisabled(!toDisabled);
              }}

            />Current Job
        </div>
        <input
          type="date"
          name="to"
          className={classes.inputs}
          value={to}
          required
          disabled={current}
          onChange={(e)=>handleChange(e)}
        />
        <input
          name="description"
          className={classes.inputs}
          value={description}
          required
          placeholder="Add Description"
          onChange={(e)=>handleChange(e)}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.btnStyle}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}

export default withRouter(AddEducation);
