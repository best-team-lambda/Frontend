import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import OpenTicket from './OpenTicket';
import { loadingStart, loadingDone } from '../../../actions/AppActions.js';

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

function OpenTicketList(props) {
    const [openTickets, setOpenTickets] = useState([]);

    useEffect(() => {
        props.loadingStart()
        axiosWithAuth().get('/tickets/open')
        .then(res => {
            //console.log(res.data)
            setOpenTickets(res.data)
            props.loadingDone();
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message);
        props.loadingDone();
        alert(err.response.data.message)});
    }, []);

    return (
         <div className='helperDashboard'>
        <StyledLoader active={props.loading} spinner text='Loading...'>
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
                       if(props.searchTerm){
                           if (props.searchType === 'Category' && ticket.category && !ticket.category.toLowerCase().includes(props.searchTerm.toLowerCase())){
                               shouldReturn = false; 
                           }
                           else if (props.searchType === 'Student' && ticket.student_name && !ticket.student_name.toLowerCase().includes(props.searchTerm.toLowerCase())){
                                   shouldReturn = false;
                           }
                           else if (props.searchType === 'Helper' && ticket.helper_name && !ticket.helper_name.toLowerCase().includes(props.searchTerm.toLowerCase())){
                               shouldReturn = false;
                           }
                           else if (props.searchType === 'Title' && ticket.title && !ticket.title.toLowerCase().includes(props.searchTerm.toLowerCase())){
                               shouldReturn = false;
                           }
                           else if (props.searchType === 'Description' && ticket.description && !ticket.description.toLowerCase().includes(props.searchTerm.toLowerCase())){
                               shouldReturn = false;
                           }
                           else if (props.searchType === 'Solution' && ticket.solution && !ticket.solution.toLowerCase().includes(props.searchTerm.toLowerCase())){
                               shouldReturn = false;
                           }
                       }
                        if (shouldReturn === true){
                            return (
                                <tr key={ticket.id}><OpenTicket id={ticket.id} currentUser={props.currentUser} student_name={ticket.student_name} category={ticket.category} 
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

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        searchType: state.SearchReducer.searchType,
        searchTerm: state.SearchReducer.searchTerm,
        loading: state.AppReducer.loading,
    }
  }

export default connect(mapStateToProps, { loadingStart, loadingDone })(OpenTicketList)