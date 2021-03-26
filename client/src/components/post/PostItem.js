import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import {useSelector ,useDispatch} from 'react-redux';
import {updateLikes,removeLike,deletePost,getPosts} from '../../Redux/post/action';
import {useEffect} from 'react';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root:{
      width:'80%',
      backgroundColor:'#fff',
      marginTop:'10px',
      border:'#ccc solid 1px'
    },
    leftPart:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    rightPart:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    img:{
        borderRadius:'50%',
        height:'100px',
        width:'100px',
        marginTop:'10px',
        [theme.breakpoints.down('sm')]:{
            height:'75px',
            width:'75px'
        }
    },
    actions:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    btn:{
        marginRight:'10px',
        [theme.breakpoints.down('sm')]:{
            marginTop:'10px'
        }
    }
}));
function PostItem({post,showActions}) {
    const {name,text,Date,avatar,comments,likes}=post;
    const classes=useStyles();
    const userData=useSelector(state=>state.auth);
    const {user}=userData;
    const dispatch = useDispatch()
    const postData=useSelector(state=>state.post);
    const {posts}=postData;
    useEffect(()=>{
       console.log('rendering Post');
    },[posts])
   
    // actions
    
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                 <Grid item xs={4}  className={classes.leftPart}>
                      <Link to={`/profile/${post.user}`}>
                            <img src={avatar} alt="profile-image" className={classes.img}/>
                      </Link>
                      <h3 style={{color:"#17a2b8"}}>{name}</h3>
                 </Grid>
                 <Grid item xs={8}  className={classes.rightPart}>
                      <p>{text}</p>
                      <p style={{color:"#aaa"}}>Posted on :<Moment format="YYYY/MM/DD">{Date}</Moment></p>
                      {showActions && <React.Fragment>                 
                            <div className={classes.actions}>
                                    <Button variant="contained" className={classes.btn} onClick={(e)=>dispatch(updateLikes(post._id))}>
                                        <i className="fas fa-thumbs-up"></i>
                                        {likes && likes.length!=0 && <span style={{marginLeft:'5px'}}>{likes.length}</span>}
                                    </Button>
                                    <Button variant="contained" className={classes.btn} onClick={(e)=>dispatch(removeLike(post._id))}>
                                        <i className="fas fa-thumbs-down"></i>
                                    </Button>
                                    <Link to={`/post/${post._id}`} style={{textDecoration:'none'}}>
                                        <Button variant="contained" color="primary" className={classes.btn}>
                                            Discussion
                                            {comments && comments.length!=0 && <span style={{marginLeft:'5px'}}>{comments.length}</span>}
                                        </Button>
                                    </Link>
                                    {user._id==post.user && 
                                    <Button variant="contained" color="secondary" className={classes.btn} onClick={(e)=>{dispatch(deletePost(post._id))}}>
                                        <i className="fas fa-times"></i>
                                    </Button>}     
                            </div>
                    </React.Fragment>}
                 </Grid>
            </Grid>
        </div>
    )
}
PostItem.defaultProps={
    showActions:true
}

export default PostItem
