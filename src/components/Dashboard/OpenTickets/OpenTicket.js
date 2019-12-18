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
            <th align='center'>
                <div className='tooltip'>
                    <Link to={`/Dashboard/Account/${props.author_id}`}>
                        {props.author_image 
                            ? <img className="photo3" src={props.author_image} alt='ticket author'/> 
                            : <Fa icon={faUserCircle} />}
                    </Link>
                    <span className='tooltiptext'>View Profile</span>
                </div>
                <div>{props.author_name}</div>
            </th>
            <th className='boldrows'>{props.category}</th>
            <th>{props.title}</th>
            {/* <td>{props.description}</td> */}
            <th>{timeago.format(props.created_at)}</th>
            <th><Link to={`/Dashboard/Tickets/${props.id}`}>View</Link></th>
        </>
    )
}
