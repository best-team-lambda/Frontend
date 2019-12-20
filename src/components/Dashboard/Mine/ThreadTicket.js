import React from "react";
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import {faPencilAlt, faUserCircle, faCamera, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";

import styled from 'styled-components';

const Fa = styled(FontAwesomeIcon)`
    width: 70px !important;
    height: 70px;
`
const Names = styled.div `
    width: 100%;
`

export default function ThreadTicket(props) {
    // console.log(props)
    return (
        <>
            <td>
                <div className='tooltip'>
                    <Link to={`/Dashboard/Account/${props.author_id}`}>
                        {props.author_image 
                                ? <img className="photo3" src={props.author_image} alt='ticket author'/> 
                                : <Fa icon={faUserCircle} />}
                        <span className='tooltiptext'>View Profile</span>
                    </Link>
                    <Names>{props.author_name}</Names>
                </div>
            </td>
            <td className='boldrows'>{props.title}</td>
            <td>{props.description}</td>
            <td>{props.status.toUpperCase()}</td>
            <td><Link to={`/Dashboard/Tickets/${props.id}`}>View</Link></td>
        </>
    )
}

