import React from 'react'
import {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './github.css'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor:'#E0E0E0',
        width:'80%',
        marginTop:'10px'
    },
    heading:{
        color:'#17a2b8',
        textAlign:'center'
    },
    links:{
       textDecoration:'none',
       color:'black',
       marginLeft:'10px'
    },
    accordion:{
         marginTop:'10px',
         backgroundColor:'#E0E0E0'
    }
  }));


function Repo({repo}){
   const classes=useStyles();
    return (
        <AccordionDetails style={{display:'block',padding:'0px'}}>
            <ul>
                <li style={{marginTop:'2px'}}>
                    <a href={repo.html_url} className={classes.links} target="_blank">
                        {repo.full_name}
                    </a>
                </li>
            </ul>
        </AccordionDetails>
    )
}
function Github({username}) {
    const classes=useStyles();
    const [repos,setRepos]=useState([]); 

    useEffect(()=>{
       fetch(`https://api.github.com/users/${username}/repos`)
       .then(resp=>resp.json())
       .then(resp=>setRepos(resp))
    },[])

    console.log(repos)
    const github_url=`https://github.com/${username}`;
    return (
        <div className={classes.root}>        
            <h2 className={classes.heading}>Github Repos</h2>
            <a className={classes.links} href={github_url} target='_blank' style={{color:'#17a2b8'}}>
                <span><i className="fab fa-github fa-2x"></i></span>{' '}Github Profile
            </a>
            <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
             >
                 <Typography className={classes.heading}>Github Repositories</Typography>
            </AccordionSummary>
                {repos.map(repo=><Repo repo={repo} name={username}/>)}
            </Accordion>
        </div>
    )
}

export default Github
