import React from 'react'
import {useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {addPost} from '../../Redux/post/action';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root:{
       marginLeft:'10%',
       marginTop:'10px',
       marginRight:'10%',
    },
    
}));

function PostForm() {
    const [text,setText]=useState('');
    const classes=useStyles();
    const dispatch=useDispatch();

    // actions
    const handleChange=(e)=>{
        setText(e.target.value);
    }
    const handleSubmit=()=>{
        const a=' '
        dispatch(addPost({text}));
        setText(a);
    }
    return (
        <React.Fragment>
            <form className={classes.root}>
                <div>
                    <textarea name="text" value={text} placeholder="Create a Post...." style={{width:'100%',height:'5rem'}} onChange={(e)=>handleChange(e)}/>
                </div>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </React.Fragment>
    )
}

export default PostForm
