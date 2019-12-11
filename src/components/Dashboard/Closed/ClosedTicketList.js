import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import ClosedTicket from './ClosedTicket';
import { loadingStart, loadingDone } from '../../../actions/AppActions.js';

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

function ClosedTicketList(props) {
    const [closedTickets, setClosedTickets] = useState([]);

    useEffect(() => {
        props.loadingStart();
        axiosWithAuth().get('/tickets/resolved')
        .then(res => {
            console.log(res.data)
            setClosedTickets(res.data)
            props.loadingDone();
        })
        .catch(err => {console.log('CATCH ERROR: ', err.response.data.message)
        props.loadingDone();
        alert(err.response.data.message)});
    }, []);

    return (
         <div className='helperDashboard'>
        <StyledLoader active={props.loading} spinner text='Loading...'>
            <table className='tickettable'>
                <thead>
                <tr>
                        <th className='firstTh'>Authors</th>
                        <th>Subject</th>
                        <th>Title</th>
                        <th>Age</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{closedTickets && closedTickets.map(ticket => {
                    let shouldReturn = true;
                    if(props.searchTerm){
                        if (props.searchType === 'Category' && ticket.category && !ticket.category.toLowerCase().includes(props.searchTerm.toLowerCase())){
                            shouldReturn = false; 
                        }
                        else if (props.searchType === 'author' && ticket.author_name && !ticket.author_name.toLowerCase().includes(props.searchTerm.toLowerCase())){
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
                            <tr key={ticket.id}><ClosedTicket id={ticket.id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image} helper_image={ticket.helper_image}/></tr> )
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

export default connect(mapStateToProps, { loadingStart, loadingDone })(ClosedTicketList)