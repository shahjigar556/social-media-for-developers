import React from 'react'
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux';
import Spinner from '../../Spinner';
import {useEffect} from 'react'
import {getProfile} from '../../../Redux/profile/action';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
     root:{
         marginTop:'10px',
         marginLeft:'10%',
         border:'1px solid #ccc',
         width:'80%',
         backgroundColor:'#E9F0FC',
         display:'flex',
         flexDirection:'column',
         alignItems:'center',
         justifyContent:'center',
         [theme.breakpoints.down('sm')]:{
             marginLeft:'10%'
         }
     },
     img:{
         borderRadius:'50%',
         height:'100px',
         width:'100px',
         marginTop:'10px'
     },
     heading:{
         color:"#17a2b8",
         fontWeight:'bold'
     },
     linkStyle:{
         textDecoration:'none',
         color:"green"
     },
     subheading:{
         fontsize:'5px'
     }
  }));
function ProfileCard({profile}) {
    const {name,email,avatar} =profile;
    const dispatch = useDispatch()
    const classes=useStyles();
    const profileData=useSelector(state=>state.profile);
    const {loading}=profileData;
    const user=useSelector(state=>state.auth)
    useEffect(()=>{
        console.log('here')
         if(user.isAuthenticated){
             dispatch(getProfile());
         }
    },[getProfile]);
    const url=`/profile/${profile.user}`
    return (
        <Grid item xs={12} sm={6} md={4}>
             <Card className={classes.root}>
                    <img src={avatar} alt="Profile Image" className={classes.img} />
                    <Typography variant="h6" className={classes.heading}>
                          {name}
                    </Typography>
                    <h4>
                        {profile.status} {profile.company?`at ${profile.company}`:' '}
                    </h4>
                    <Link to={url} className={classes.linkStyle}>
                            View Complete Profile
                    </Link>
             </Card>
        </Grid>
    )
}

export default ProfileCard
 