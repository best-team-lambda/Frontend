import React from "react";
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import placeholder1 from '../../../images/placeholder1.jpeg';
import placeholder2 from '../../../images/placeholder2.png';

export default function MyTicket(props) { 
    //display teacher and student on mine list

    let curUser = '';
    let secondUser = 'FIX ME Myticket.js';
    // console.log(props)
    if (props.status === 'open'){
        curUser = props.currentUser.name;
    }
    else if (props.data === 'assigned')
    {
        if (props.currentUser === props.student_name){
            curUser = props.student_name;
        }
        if (props.currentUser === props.student_name){
            curUser = props.student_name;
        }
    }
    else if (props.data === 'resolved')
    {
        if (props.currentUser === props.student_name){
            curUser = props.student_name;
        }
        if (props.currentUser === props.student_name){
            curUser = props.student_name;
        }
    }


    return (
        <>
             {/* <td className='boldrows'>{props.student_name}</td>  */}
             <td><div><img className="photo" src={placeholder1} alt='Student image'/><img className="photo2 stacked" src={placeholder2} alt='Student image'/></div><div>{props.student_name}</div></td>
            <td className='boldrows'>{props.category}</td>
            <td>{props.title}</td>
            {/* <td>{props.description}</td> */}
            <td>{timeago.format(props.created_at)}</td>
            <td><Link to={`/Dashboard/Tickets/${props.id}`}>View</Link></td>
        </>
    
    )
}

