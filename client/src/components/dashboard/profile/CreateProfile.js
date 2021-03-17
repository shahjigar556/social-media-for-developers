import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import { Fragment } from 'react';
import {createProfile} from '../../../Redux/profile/action';
import {useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
const initialState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  };

  const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        flexDirection:'column',  
        alignItems:'center'     
    },
    inputs:{
        marginTop:'10px',
        width:'60%',
        height:'30px'
    },
    heading:{
        textAlign:'center',
        color:"#17a2b8"
    },
    btnStyle:{
        marginTop:'10px'
    }
    
  }));

function CreateProfile({history}) {
    const [formData,setFormData]=useState(initialState);
    const [btn,toggleBtn]=useState(false);
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
      } = formData;
      const classes=useStyles();
      const dispatch=useDispatch();
      const handleChange=(e)=>{
           setFormData({...formData,[e.target.name]:e.target.value})
      }

      const handleSubmit=()=>{
          dispatch(createProfile(formData,history,false));
          console.log(formData);
      }
    return (
        <React.Fragment>
            <h1 className={classes.heading}>Create Your Profile</h1>
               <form className={classes.root}>
               <select name="status" className={classes.input} onChange={(e)=>handleChange(e)} value={status} style={{width:'60%',height:'30px'}}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
               </select>
               <input name="company" className={classes.inputs} onChange={(e)=>handleChange(e)} value={company} required placeholder="Company" />
               <input name="website" className={classes.inputs} onChange={(e)=>handleChange(e)} value={website} required  placeholder="website"/>
               <input name="skills" className={classes.inputs} onChange={(e)=>handleChange(e)} value={skills} required placeholder="skills"/>
               <input name="githubusername" className={classes.inputs} onChange={(e)=>handleChange(e)} value={githubusername} required placeholder="githubusername"/>
               <input name="bio" className={classes.inputs} onChange={(e)=>handleChange(e)} value={bio} required placeholder="Add short bio..."/>
               <Button variant="contained" color="primary" className={classes.btnStyle} onClick={()=>toggleBtn(!btn)}>
                    Add social Media Links
               </Button>
               {btn && <Fragment>
                    <input name="twitter" className={classes.inputs} onChange={(e)=>handleChange(e)} value={twitter}  placeholder="Company" />
                    <input name="facebook" className={classes.inputs} onChange={(e)=>handleChange(e)} value={facebook}   placeholder="facebook"/>
                    <input name="linkedin" className={classes.inputs} onChange={(e)=>handleChange(e)} value={linkedin}  placeholder="linkedin"/>
                    <input name="youtube" className={classes.inputs} onChange={(e)=>handleChange(e)} value={youtube}  placeholder="youtube"/>   
                    <input name="instagram" className={classes.inputs} onChange={(e)=>handleChange(e)} value={instagram}  placeholder="instagram"/>   
                   </Fragment>}

                <Button variant="contained" color="primary" className={classes.btnStyle} onClick={handleSubmit}>
                    Submit
               </Button> 
               </form>
      
        </React.Fragment>
    )
}

export default withRouter(CreateProfile)
