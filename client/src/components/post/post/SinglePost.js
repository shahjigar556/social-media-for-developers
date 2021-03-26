import React from 'react'
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core'
import {getPost} from '../../../Redux/post/action';
import PostItem from '../PostItem'
import Spinner from '../../../components/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const useStyles = makeStyles((theme) => ({
    root:{
       display:'flex',
       flexDirection:'column',
       justifyContent:'center',
       alignItems:'center',      
    }
    
}));
function SinglePost(props) {
    const dispatch=useDispatch();
    const id=props.match.params.id;
    useEffect(()=>{
        dispatch(getPost(id));
    },[])

    const postData=useSelector(state=>state.post);
    const {post,loading}=postData;
    const classes=useStyles();
    return (
        loading || post==null?<Spinner />:<React.Fragment>
            <div className={classes.root}>
                <PostItem post={post}  showActions={false}/>
                <CommentForm id={post._id}/>
                {post.comments && post.comments.length>0 &&
                   post.comments.map(comment=><CommentItem comment={comment} key={comment._id} postId={post._id}/>)}    
                    
               
            </div>
        </React.Fragment>
    )
}

export default SinglePost
