import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    links:{
        textDecoration:'none'
    },
    root:{
        marginLeft:'10%',
        alignSelf:'flex-start',
        border:'1px solid black'
    }
  }));
function Experience({experience}) {
    const classes=useStyles();
    console.log(experience)
    
    return (
        <Grid item xs={12} md={6} className={classes.root}>
             {experience.map(exp=><div>
                 <h4>{exp.company}</h4>
                 <h4>{exp.title}</h4>
             </div>)}
        </Grid>
    )
}

export default Experience
