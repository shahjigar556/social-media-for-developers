import React from 'react'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      flexWrap:'wrap',
      backgroundColor:'#17a2b8',
      width:'80%'
    },
    links:{
        textDecoration:'none'
    },
    img:{
        borderRadius:'50%',
        marginTop:'10px',
        height:'150px'
    },
    heading:{
        color:"#fff",
        textAlign:'center',
        marginTop:'-5px'
    },
    socialLinks:{
        display:'flex',
        justifyContent:'center',
        flexWrap:'wrap',
        alignItems:'center'
    },
    icon:{
        color:'#fff',
        marginRight:'10px',
        marginBottom:'10px'
    }
}));

function About({profile,user}) {
    const classes=useStyles();
    return (
        <div className={classes.root}>
           <img className={classes.img} src={user.avatar} alt="profile-image" />
           <h1 className={classes.heading}>{user.name}</h1>
            <h2 className={classes.heading}>
                {profile.status} {profile.company?` At ${profile.company}`:' '}
            </h2>
            <h3 className={classes.heading}>
                <span><i class="fas fa-envelope-square"></i></span>{' '}
                {user.email}
            </h3>
            <div className={classes.socialLinks} style={{marginBottom:'10px'}}>
                {profile.social && <React.Fragment>
                  {profile.social.twitter &&  <a href="#"><span className={classes.icon}><i className="fab fa-twitter fa-2x"></i></span></a>}    
                  {profile.social.facebook && <a href="#"><span className={classes.icon}><i className="fab fa-facebook fa-2x"></i></span></a>}    
                  {profile.social.instagram && <a href="#"><span className={classes.icon}><i className="fab fa-instagram fa-2x"></i></span></a>}    
                  {profile.social.linkedin && <a href="#"><span className={classes.icon}><i className="fab fa-linkedin fa-2x"></i></span></a>}    
                  {profile.social.youtube && <a href="#"><span className={classes.icon}><i className="fab fa-youtube fa-2x"></i></span></a>}    
                    
                </React.Fragment>}
            </div>
        </div>
    )
}

export default About
