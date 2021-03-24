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
function Experience({experience}) {
    const classes=useStyles();
    if (experience.length==0)
        return null;
    return (
        <div className={classes.root}>
            <h2 className={classes.heading}>Experience</h2>
            <Grid container spacing={2} style={{paddingLeft:'10px'}}>           
                      {experience.map(exp=>(
                          <Grid item xs={12} sm={6}>
                                <h3 className={classes.subHeading}>{exp.company}</h3>
                                <p className={classes.bold}><Moment format="YYYY/MM/DD">{exp.from}</Moment>
                                -
                                {exp.to==''?' Now':<Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                                </p>
                                <p className={classes.bold}>Position : {exp.title}</p>
                                {exp.description && <p>{exp.description}</p>}
                          </Grid>
                      ))}
            </Grid>
        </div>
        
    )
}

export default Experience
