import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    links:{
        textDecoration:'none'
    },
    root:{
        border:'1px solid black'
    }
  }));

function Education({education}) {
    const classes=useStyles();
    return (
        <Grid item xs={12} md={6} className={classes.root}>
               Education
        </Grid>
    )
}

export default Education
