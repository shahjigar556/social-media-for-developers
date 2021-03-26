import React from 'react'
import {makeStyles} from '@material-ui/core'
import {useState} from 'react';
import Button from '@material-ui/core/Button'
import {addComment} from '../../../Redux/post/action';
import {useSelector,useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root:{
       width:'100%',  
    },
    text:{
        marginRight:'10%',
        marginLeft:'10%',
        marginTop:'10px'
    },
    btn:{
        marginLeft:'10%'
    }
}));

function CommentForm({id}) {
    const [text,setText]=useState('');
    const classes=useStyles();
    const dispatch=useDispatch();
    const handleSubmit=()=>{
        dispatch(addComment(id,{text}))
        setText(' ');
    }
    return (
        <React.Fragment>
            <form className={classes.root}>
                <div>
                    <textarea className={classes.text} name="text" value={text} placeholder="Leave a comment...." style={{width:'80%',height:'5rem'}} onChange={(e)=>setText(e.target.value)}/>
                </div>
                <Button className={classes.btn} variant="contained" color="secondary" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>           
        </React.Fragment>
    )
}

export default CommentForm
