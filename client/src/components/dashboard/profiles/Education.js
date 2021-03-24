import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Moment from 'react-moment'

const useStyles = makeStyles((theme) => ({
    links:{
        textDecoration:'none'
    },
    root:{
        backgroundColor:'#E0E0E0',
        width:'80%',
        marginTop:'10px'
    },
    heading:{
        color:'#17a2b8',
        textAlign:'center'
    },
    subHeading:{
        color:'black',
        fontWeight:'bold',
        marginTop:'-5px'
    },
    bold:{
        fontWeight:'bold'
    }
  }));


function Education({education}) {
    const classes=useStyles();
    console.log(education)
    if(education.length==0)
        return null;
    return (
        <div className={classes.root}>
          <h2 className={classes.heading}>Education</h2>
          <Grid container spacing={2} style={{paddingLeft:'10px'}}>           
                      {education.map(edu=>(
                          <Grid item xs={12} sm={6}>
                                <h3 className={classes.subHeading}>{edu.school}</h3>
                                <p className={classes.bold}><Moment format="YYYY/MM/DD">{edu.from}</Moment>
                                -
                                {edu.to==''?' Now':<Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                                </p>
                                <p className={classes.bold}>Degree : {edu.degree}</p>
                                <p className={classes.bold}>Field of Study : {edu.fieldofstudy}</p>
                                {edu.description && <p>{edu.description}</p>}
                          </Grid>
                      ))}
            </Grid>
        </div>
    )
}

export default Education
