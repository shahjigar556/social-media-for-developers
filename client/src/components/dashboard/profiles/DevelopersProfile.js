import React from 'react'
import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getProfiles} from '../../../Redux/profile/action'
import ProfileCard from './ProfileCard';
import Spinner from '../../Spinner';
import Grid from '@material-ui/core/Grid'

function DevelopersProfile() {
    const dispatch=useDispatch()
    const profileData=useSelector(state=>state.profile);
    const {profiles}=profileData;
    const {loading}=profileData;
    useEffect(()=>{
       dispatch(getProfiles());
    },[])
    
    if(loading){
        return (
            <Spinner />
        )
    }
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {profiles.map(profile=><ProfileCard key={profile._id} profile={profile}/>)}
            </Grid>
        </React.Fragment>
    )
}

export default DevelopersProfile
