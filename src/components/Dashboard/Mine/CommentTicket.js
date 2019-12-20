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

export default function CommentTicket(props) {
    return (
        <>
            <td>
                <h3 style={{margin: "0"}}>Ticket By:</h3>
                <div className='tooltip'>
                    <Link to={`/Dashboard/Account/${props.author_id}`}>
                        <span className='tooltiptext'>View Profile</span>
                        <Names>{props.author_name}</Names>
                    </Link>
                </div>
            </td>
            <td className='boldrows'>{props.myComment}</td>
            <td>{props.title}</td> {/* Need a reply user */}
            <td>{props.status.toUpperCase()}</td> {/* Reply Comment */}
            <td><Link to={`/Dashboard/Tickets/${props.id}`}>View</Link></td>
        </>
    )
}
