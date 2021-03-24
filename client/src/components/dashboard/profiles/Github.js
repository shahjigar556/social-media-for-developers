import React from 'react'
import {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './github.css'

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
    }
  }));


function Repo({repo}){
   const classes=useStyles();
    return (
        <ul>
            <li>
                <a href={repo.html_url} className={classes.links} target="_blank">
                    {repo.full_name}
                </a>
            </li>
        </ul>
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
                Visit Github Profile
            </a>
             {repos.map(repo=><Repo repo={repo} name={username}/>)}
        </div>
    )
}

export default Github
