import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { getProfile } from '../../Redux/profile/action';
import Spinner from '../Spinner';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import Experience from './Experience';
import Education from './Education';
import {deleteUser} from '../../Redux/profile/action';

const useStyles = makeStyles((theme) => ({
   root:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft:'40px',
    alignItems:'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection:'column',
        alignItems:'flex-start'
      }
   },
   btn:{
    [theme.breakpoints.down('sm')]: {
        width:'220px',
      }
   },
   experience:{

   },
   education:{

   },
   heading:{
       color:'#17a2b8',
       marginLeft:'40px'
   },
   subHeading:{
       marginLeft:'40px'
   } ,
   root1:{
       flexDirection:'column',
       alignItems:'center',
       justifyContent:'center',
       marginLeft:'40px'
   }
 }));
  


const NoProfile=({name})=>{
    const classes=useStyles();
     return <React.Fragment>
         <div className={classes.root1}>
                <p style={{color:'#17a2b8',fontWeight:'bold'}}>
                    Hello,{name} Please Create Your Profile
                </p>
                <Link to='/create-profile' style={{textDecoration:'none'}}>
                    <Button variant="contained">
                        Create Your Profile
                    </Button>
                </Link>
         </div>
        
     </React.Fragment>
}

const Profile=({name})=>{
    const classes=useStyles();
    const profileData=useSelector(state=>state.profile);
    const {profile,loading}=profileData;
    const dispatch=useDispatch();
    const handleClick=()=>{
     alert('Are You sure You want to delete Account')
     dispatch(deleteUser());
    }
     return (
         <React.Fragment>
             <h1 className={classes.heading}>DashBoard</h1>
             <h3 className={classes.subHeading}>Welcome {name}</h3>
                <div className={classes.root}>
                    <React.Fragment>
                        <Link to='/edit-profile' style={{textDecoration:'none',paddingTop:'10px',marginRight:'10px'}}>
                            <Button className={classes.btn} variant="contained">
                                Edit Your Profile
                            </Button>
                    </Link>
                        <Link to='/education' style={{textDecoration:'none',paddingTop:'10px',marginRight:'10px'}}>
                            <Button className={classes.btn} variant="contained">
                                Add Education
                            </Button>
                    </Link>
                        <Link to='/experience' style={{textDecoration:'none',paddingTop:'10px',marginRight:'10px'}}>
                            <Button className={classes.btn} variant="contained">
                                Add Experience
                            </Button>
                    </Link>                        
                   </React.Fragment>
                </div>
              
                <div className={classes.experience}>
                    <Experience experience={profile.experience}/>
                </div>
             
                <div className={classes.education}>
                    <Education  education={profile.education}/>
                </div>

                <div>
                   <Button onClick={()=>handleClick()} variant="contained" color="secondary" style={{marginLeft:'40px'}}>
                            Delete Account
                   </Button>
                </div>
         </React.Fragment>
     )
     
}
export default function Dashboard() {
    const dispatch = useDispatch()
    const profileData=useSelector(state=>state.profile);
    const {profile,loading} =profileData;
    const user=useSelector(state=>state.auth);
    const classes=useStyles();
    useEffect(()=>{
         dispatch(getProfile());
    },[]);

    if(loading){
        return (
            <Spinner />
        )
    }
    return (
        <React.Fragment>
            {profile!=null?<Profile name={user.user.name}/>:<NoProfile  name={user.user.name}/>}
        </React.Fragment>
    )
}
