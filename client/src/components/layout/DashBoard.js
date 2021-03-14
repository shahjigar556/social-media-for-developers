import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { Redirect } from 'react-router';

export default function DashBoard() {
    const user=useSelector(state=>state.auth);
    const {isAuthenticated}=user;
    if(!isAuthenticated){
        return <Redirect to='/' />
    }

    return (
        <div>
               <h1>Hello from DashBoard</h1>        
        </div>
    )
}
