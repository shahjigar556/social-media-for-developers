import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {getPosts} from '../../Redux/post/action';
import Spinner from '../../components/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const useStyles = makeStyles((theme) => ({
    root:{
       display:'flex',
       flexDirection:'column',
       justifyContent:'center',
       alignItems:'center',      
    },
    heading:{
        color:'#17a2b8',
        marginLeft:'10%'
    },
    h3:{
        backgroundColor:'#17a2b8',
        color:'#fff',
        width:'80%',
        margin:'0 10% 0 10%',
        height:'2rem',
        padding:'5px'
    }
}));

function Post() {
    const postData=useSelector(state=>state.post);
    const dispatch=useDispatch();
    const {loading}=postData;
    const {posts}=postData;
    const classes=useStyles();

    useEffect(()=>{
        dispatch(getPosts())
    },[getPosts]);

    console.log(posts);
    return (
        loading?<Spinner />:<React.Fragment>
            <h1 className={classes.heading}>Posts</h1>
            <p style={{marginLeft:'10%',fontSize:'1rem'}}><i className="fas fa-user"></i> Welcome to the community!</p>
            <h3 className={classes.h3}>Say Something.......</h3>
            <PostForm />
            <div className={classes.root}>
                {posts.map(post=><PostItem key={post._id} post={post} />)}
            </div>
        </React.Fragment>
    )
}

export default Post
