import React from 'react'
import {useDispatch} from 'react-redux';
import Moment from 'react-moment';
import './styles.css';
import Button from '@material-ui/core/Button';
import {deleteExp} from '../../Redux/profile/action';
import {Link} from 'react-router-dom'

function Experience({experience}) {
    const dispatch=useDispatch();
    const handleClick=(id)=>{
       dispatch(deleteExp(id)); 
    }
    if(experience.length==0){
        return (
            <React.Fragment>
                <Link to='/experience' style={{textDecoration:'none'}}>
                    <h3 style={{color:'#17a2b8',marginLeft:'40px'}}>Complete Your Experience Profile</h3>
                </Link>
            </React.Fragment>
        );
    }
    const experiences=experience.map(exp=>{
        return <React.Fragment>
            <tr>
                <td>
                    {exp.title}
                </td>
                <td>
                    {exp.company}
                </td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment>
                </td>
                <td>
                    {exp.to==''?' Now':<Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                </td>
                <td>
                    <Button onClick={()=>handleClick(exp._id)}variant="contained" color="secondary">Delete</Button>
                </td>
            </tr>
        </React.Fragment>
    })
    return (
        <React.Fragment>
            <h4 style={{color:'#17a2b8',marginLeft:'40px'}}>Experience Details</h4>
            <div style={{overflowX:'auto',marginLeft:'40px'}}>
            <table className='table'>
                <thead>
                        <th>
                            Title
                        </th>
                        <th>
                            Company
                        </th>
                        <th>
                            From
                        </th>
                        <th>
                            To
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

export default Experience
