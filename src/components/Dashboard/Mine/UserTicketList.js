import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import axios from 'axios';
import MyTicket from './MyTicket';
import { loadingStart, loadingDone } from '../../../actions/AppActions.js';
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

function UserTicketList(props) {
    const [allUserTickets, setAllUserTickets] = useState([]);

    useEffect(() => {
        props.loadingStart();
        (async () => {
            try{
                const what = [
                axiosWithAuth().get('https://ddq.herokuapp.com/api/tickets/students/student/open'),
                axiosWithAuth().get(`https://ddq.herokuapp.com/api/tickets/students/student/resolved`),
                axiosWithAuth().get('https://ddq.herokuapp.com/api/tickets/helpers/open'),
                axiosWithAuth().get(`https://ddq.herokuapp.com/api/tickets/helpers/resolved`)];
                
                const mom = await axios.all(what);
                    const hey = [];
                for(let val of mom){
                    if(Array.isArray(val.data)){
                        for(let mom of val.data){
                            hey.push(mom);
                        }
                    }
                }

                props.loadingDone();
                const yo = [];
                const mommo = [];
                for(let val of hey){
                    if(yo.indexOf(val.id) === -1){
                        yo.push(val.id);
                        mommo.push(val);
                    }
                }
                setAllUserTickets(mommo);
                
                // console.log(hey);
                console.log('after', allUserTickets);
            }catch(err){
                console.log('CATCH ERROR: ', err);
                props.loadingDone();
            }
        })()
    }, []);

    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
         {/* <h2>My tickets</h2> */}
        <StyledLoader active={props.loading} spinner text='Loading...'>
            <table className='tickettable'>
                <thead>
                      <tr>
                        <th className='firstTh'>Students</th>
                        <th>Subject</th>
                        <th>Title</th>
                        <th>Age</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{allUserTickets && allUserTickets.map(ticket => {
                    // console.log('buggy part', ticket)
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

                        if (props.filterByOpenClosedAll === 'Resolved' && ticket.status !== 'resolved')
                        {
                            shouldReturn = false;
                        }
                        else if (props.filterByOpenClosedAll === 'Open' && ticket.status === 'resolved')
                        {
                            shouldReturn = false;
                        }

                        if (props.filterByHelperStudentBoth === 'Student' && ticket.student_name !== props.currentUser.name)
                        {
                            shouldReturn = false;
                        }
                        else if (props.filterByHelperStudentBoth === 'Helper' && ticket.helper_name !== props.currentUser.name)
                        {
                            shouldReturn = false;
                        }
                        if (shouldReturn === true){
                            return (
                                <tr key={ticket.id}><MyTicket id={ticket.id} currentUser={props.currentUser} student_name={ticket.student_name} category={ticket.category} 
                                title={ticket.title} description={ticket.description} status={ticket.status} created_at={ticket.created_at} student_image={ticket.student_image} helper_image={ticket.helper_image}/></tr> )
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
        filterByAskedAnsweredBoth: state.SearchReducer.filterByAskedAnsweredBoth,
        filterByOpenClosedAll: state.SearchReducer.filterByOpenClosedAll,
        currentUser: state.AppReducer.currentUser,
        loading: state.AppReducer.loading,
    }
  }

export default connect(mapStateToProps, { loadingStart, loadingDone })(UserTicketList)