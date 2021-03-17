import React from "react";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile,updateProfile } from "../../../Redux/profile/action";

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
  title:'',
  company:'',
  from:'',
  to:'',
  current:false,
  location:'',
  description:''
};
function AddExperience({history}) {
  
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
    console.log(formData)
    dispatch(updateProfile(formData,history));
    
  }
  const profileData = useSelector((state) => state.profile);
  const { profile } = profileData;

  const {title,company,from,to,current,location,description}=formData;

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
      <h1 className={classes.heading}>Add Experience</h1>
      <h2 className={classes.subHeading}>
        Add any developer/programming positions that you have had in the past
      </h2>
      <form className={classes.root}>
        <select
          onChange={(e)=>handleChange(e)}
          name="title"
          value={title}
          className={classes.input}
          style={{ width: "60%", height: "30px" }}
        >
          <option value="0">* Position</option>
          <option value="Developer">Developer</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Manager">Manager</option>
          <option value="Student or Learning">Student or Learning</option>
          <option value="Instructor">Instructor or Teacher</option>
          <option value="Intern">Intern</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="company"
          className={classes.inputs}
          onChange={(e)=>handleChange(e)}
          value={company}
          required
          placeholder="Company"
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
          name="location"
          className={classes.inputs}
          value={location}
          required
          placeholder="Location"
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

export default withRouter(AddExperience);
