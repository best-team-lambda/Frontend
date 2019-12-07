import React from "react";
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import {faPencilAlt, faUserCircle, faCamera, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

const Fa = styled(FontAwesomeIcon)`
    width: 60px !important;
    height: 60px;
`


export default function OpenTicket(props) {
    return (
        <>
            <td align='center'>
                <div className='tooltip'>
                    <Link to={`/Dashboard/Account/${props.author_id}`}>
                        {props.author_image 
                            ? <img className="photo3" src={props.author_image} alt='ticket author'/> 
                            : <Fa icon={faUserCircle} />}
                    </Link>
                    <span className='tooltiptext'>View Profile</span>
                </div>
                <div>{props.author_name}</div>
            </td>
            <td className='boldrows'>{props.category}</td>
            <td>{props.title}</td>
            {/* <td>{props.description}</td> */}
            <td>{timeago.format(props.created_at)}</td>
            <td><Link to={`/Dashboard/Tickets/${props.id}`}>View</Link></td>
        </>
    )
}

