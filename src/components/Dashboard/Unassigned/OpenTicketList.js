import React, {useEffect, useState, useContext} from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import OpenTicket from './OpenTicket';

import { CurrentUserContext } from "../../../contexts/CurrentUserContext.js";

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

export default function OpenTicketList() {
    const { currentUser, searchTerm, searchType } = useContext(CurrentUserContext);

    const [openTickets, setOpenTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosWithAuth().get('/tickets/open')
        
        .then(res => {
            //console.log(res.data)
            //console.log(res.data);
            setOpenTickets(res.data)
            setLoading(false);
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message);
        setLoading(false);
        alert(err.response.data.message)});
    }, []);

    // console.log(helpRequests);
    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
         {/* <h2>Unassigned tickets</h2> */}
        <StyledLoader active={loading} spinner text='Loading...'>
            <table className='tickettable'>
                <thead>
                    <tr>
                        <th className='firstTh'>Student</th>
                        <th>Subject</th>
                        <th>Title</th>
                        <th>Age</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {openTickets && openTickets.map(ticket => {
                       let shouldReturn = true;
                       if(searchTerm){
                           if (searchType === 'Category' && ticket.category && !ticket.category.toLowerCase().includes(searchTerm.toLowerCase())){
                               shouldReturn = false; 
                           }
                           else if (searchType === 'Student' && ticket.student_name && !ticket.student_name.toLowerCase().includes(searchTerm.toLowerCase())){
                                   shouldReturn = false;
                           }
                           else if (searchType === 'Helper' && ticket.helper_name && !ticket.helper_name.toLowerCase().includes(searchTerm.toLowerCase())){
                               shouldReturn = false;
                           }
                           else if (searchType === 'Title' && ticket.title && !ticket.title.toLowerCase().includes(searchTerm.toLowerCase())){
                               shouldReturn = false;
                           }
                           else if (searchType === 'Description' && ticket.description && !ticket.description.toLowerCase().includes(searchTerm.toLowerCase())){
                               shouldReturn = false;
                           }
                           else if (searchType === 'Solution' && ticket.solution && !ticket.solution.toLowerCase().includes(searchTerm.toLowerCase())){
                               shouldReturn = false;
                           }
                       }
                        if (shouldReturn === true){
                            return (
                                <tr key={ticket.id}><OpenTicket id={ticket.id} currentUser={currentUser} student_name={ticket.student_name} category={ticket.category} 
                                title={ticket.title} description={ticket.description} created_at={ticket.created_at} student_image={ticket.student_image}/></tr> )
                        }
                        else{return null}
                        })}
                </tbody>
            </table> 
      </StyledLoader>
        </div>
    )
}
