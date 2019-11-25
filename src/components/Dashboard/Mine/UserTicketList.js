import React, {useEffect, useState, useContext} from 'react';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import axios from 'axios';
import MyTicket from './MyTicket';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

export default function UserTicketList() {
    const { currentUser, searchTerm, searchType, filterByHelperStudentBoth, filterByOpenClosedAll} = useContext(CurrentUserContext);

    const [allUserTickets, setAllUserTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
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

                setLoading(false);
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
                setLoading(false);
            }
        })()
    }, []);

    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
         {/* <h2>My tickets</h2> */}
        <StyledLoader active={loading} spinner text='Loading...'>
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

                        if (filterByOpenClosedAll === 'Resolved' && ticket.status !== 'resolved')
                        {
                            shouldReturn = false;
                        }
                        else if (filterByOpenClosedAll === 'Open' && ticket.status === 'resolved')
                        {
                            shouldReturn = false;
                        }

                        if (filterByHelperStudentBoth === 'Student' && ticket.student_name !== currentUser.name)
                        {
                            shouldReturn = false;
                        }
                        else if (filterByHelperStudentBoth === 'Helper' && ticket.helper_name !== currentUser.name)
                        {
                            shouldReturn = false;
                        }
                        if (shouldReturn === true){
                            return (
                                <tr key={ticket.id}><MyTicket id={ticket.id} currentUser={currentUser} student_name={ticket.student_name} category={ticket.category} 
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