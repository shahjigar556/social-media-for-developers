import React from 'react'
import {makeStyles} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import {useSelector,useDispatch} from 'react-redux';
import {deleteComment} from '../../../Redux/post/action';

const useStyles = makeStyles((theme) => ({
    root:{
       backgroundColor:'#E0E0E0',
       width:'80%',
       marginTop:'10px'
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
        alignItems:'flex-start',
        justifyContent:'center',
        [theme.breakpoints.down('sm')]:{
            alignItems:'center',
            marginTop:'-50px'
        }
    },
    img:{
       borderRadius:"50%",
       height:'100px',
       width:'100px',
       marginTop:'10px'
    },
    btn:{
        marginRight:'10px',
        [theme.breakpoints.down('sm')]:{
            marginTop:'10px',
            marginBottom:'10px'
        }
    }
}));
function CommentItem({comment,postId}) {
    const classes=useStyles();
    const {name,avatar,text,date}=comment;
    const userData=useSelector(state=>state.auth);
    const {user}=userData;
    const dispatch=useDispatch();
    const handleDelete=(postId,commentId)=>{
        dispatch(deleteComment(postId,commentId));
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} className={classes.leftPart}>
                     <Link to={`/profile/${comment.user}`}>
                         <img className={classes.img} src={avatar} alt='ProfileImage'/>
                     </Link>
                     <h3 style={{color:'#17a2b8'}}>
                         {name}
                     </h3>
                </Grid>
                <Grid item xs={12} sm={8} className={classes.rightPart}>
                   <p>{text}</p>
                   <p style={{color:"#aaa"}}>Posted on:<Moment format="YYYY/MM/DD">{date}</Moment></p>
                   {user._id==comment.user && <Button variant="contained" color="secondary" className={classes.btn} onClick={(e)=>handleDelete(postId,comment._id)}>
                            <i className="fas fa-times"></i>
                  </Button>}
                  
                </Grid>
            </Grid>
        </div>
    )
}

export default CommentItem
