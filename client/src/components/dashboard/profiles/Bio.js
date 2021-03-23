import React from 'react'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      flexWrap:'wrap',
      backgroundColor:'#E0E0E0',
      width:'80%',
      marginTop:'20px',
      border:'1px solid #ccc'
    },
    links:{
        textDecoration:'none'
    },
    heading:{
        color:'#17a2b8',
        textAlign:'center'
    },
    skills:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        listStyle:'none',
        flexWrap:"wrap"
    }
}));
function Bio({user,profile}) {
    const classes=useStyles();
    console.log(profile);
    return (
        <div className={classes.root}>
            <h2 className={classes.heading}>
                 Bio
            </h2>
            <div style={{textAlign:'center',marginTop:'-5px'}}>
               {profile.bio}
            </div>
            <h2 className={classes.heading}>
                 Skills
            </h2>
            <ul className={classes.skills}>
                {profile.skills.map((skill,idx)=><li style={{marginRight:'10px'}}key={idx}><span style={{marginRight:'10px'}}><i className="fa fa-check"></i></span>{skill}</li>)}
            </ul>
        </div>
    )
}

export default Bio
