import React from 'react'
import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getProfiles,getProfile} from '../../../Redux/profile/action'
import ProfileCard from './ProfileCard';
import Spinner from '../../Spinner';
import Grid from '@material-ui/core/Grid'

function DevelopersProfile() {
    const dispatch=useDispatch()
    const profileData=useSelector(state=>state.profile);
    let {profiles}=profileData;
    const {loading}=profileData;
    const {profile}=profileData;
    
    if(profile)
       profiles=profiles.filter(p=>p.user!=profile.user)
    else 
       dispatch(getProfile());

    useEffect(()=>{
       dispatch(getProfiles());
    },[])
    
    return (
        loading || profile==null || profiles.length==0?<Spinner />:<React.Fragment>
            <Grid container spacing={3}>
                {profiles.map(profile=><ProfileCard key={profile._id} profile={profile}/>)}
            </Grid>
        </React.Fragment>
    )
}

export default DevelopersProfile
