import React from 'react'
import {useEffect} from 'react';
import {useDispatch ,useSelector} from 'react-redux';
import {getProfileById,clearVisitingProfile} from '../../../Redux/profile/action'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import About from './About';
import Bio from './Bio';
import Experience from './Experience';
import Education from './Education';
import Grid from '@material-ui/core/Grid'
import Github from './Github';

const useStyles = makeStyles((theme) => ({
   links:{
       textDecoration:'none',
       alignSelf:'flex-start',
       marginLeft:'10%'
   },
   root:{
       display:'flex',
       flexDirection:'column',
       justifyContent:'center',
       alignItems:'center'

   }
 }));
function IndividualProfile(props) {
    const userId=props.match.params.id;
    const dispatch=useDispatch()
    const profileData=useSelector(state=>state.profile);

    const profile={...profileData.visitingProfile};
    const user={...profileData.visitingUser}

    const classes=useStyles();

    useEffect(()=>{
           dispatch(getProfileById(userId));
    },[])
    const handleClick=()=>{
         dispatch(clearVisitingProfile());
    }
    
    
    return (
        <div className={classes.root}>
            <Link to='/developers' className={classes.links}>
               <Button variant="contained" color="secondary" onClick={handleClick} style={{marginRight:'-80%',marginTop:'20px',marginBottom:'20px'}}>
                    Back To Profiles
               </Button>
            </Link>
           
            <About user={user} profile={profile}/>
            {profile.skills && <Bio user={user} profile={profile} />} 
            {profile.experience && <Experience experience={profile.experience}/>}
            {profile.education && <Education education={profile.education}/>}  
            {profile.githubusername && <Github username={profile.githubusername}/>}    
               
           
        </div>
    )
}

export default IndividualProfile
