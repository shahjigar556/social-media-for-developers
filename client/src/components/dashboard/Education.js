import React from 'react'
import {useDispatch} from 'react-redux';
import Moment from 'react-moment';
import './styles.css';
import Button from '@material-ui/core/Button';
import {deleteEdu} from '../../Redux/profile/action';
import {useEffect} from 'react';
import {Link} from 'react-router-dom'



function Education({education}) {
    const dispatch = useDispatch();
    const handleClick=(id)=>{
        dispatch(deleteEdu(id));
    }
    if(education.length==0){
        return (
            <React.Fragment>
                <Link to='/education' style={{textDecoration:'none'}}>
                    <h3 style={{color:'#17a2b8',marginLeft:'40px'}}>Complete Your Education Profile</h3>
                </Link>
            </React.Fragment>
        );
    }
    const experiences=education.map(exp=>{
        return <React.Fragment>
            <tr>
                <td>
                    {exp.school}
                </td>
                <td>
                    {exp.degree}
                </td>
                <td>
                    {exp.fieldofstudy}
                </td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment>
                </td>
                <td>
                    {exp.to==''?' Now':<Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                </td>
                <td>
                    <Button onClick={()=>handleClick(exp._id)} variant="contained" color="secondary">Delete</Button>
                </td>
            </tr>
        </React.Fragment>
    })

    return (
        <React.Fragment>
            <h4 style={{color:'#17a2b8',marginLeft:'40px'}}>Education Details</h4>
            <div style={{overflowX:'auto',marginLeft:'40px'}}>
            <table className='table'>
                <thead>
                        <th>
                            School
                        </th>
                        <th>
                            Degree
                        </th>
                        <th>
                            Field Of Study
                        </th>
                        <th>
                            from
                        </th>
                        <th>
                            to
                        </th>
                        <th>

                        </th>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
            </div>
        </React.Fragment>
    )
}

export default Education
