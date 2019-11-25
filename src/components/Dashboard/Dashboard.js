import React, { useContext } from 'react'
import { Route } from 'react-router-dom';
import SidebarNav from './SidebarNav.js';

import Account from '../Global/Account.js';
import CreateTicket from './CreateTicket.js';

import OpenTicketList from './Unassigned/OpenTicketList.js';
import UserTicketList from './Mine/UserTicketList.js';
import ClosedTicketList from './Closed/ClosedTicketList.js';
import ViewTicket from './ViewTicket.js';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import CourseBuilder from '../CourseBuilder.js';
import LambdaTK from './LambdaTK/LambdaTK.js';



export default function Dashboard(props) {
    const { currentUser, searchType, setSearchType, searchTerm, setSearchTerm, 
        filterByHelperStudentBoth, setFilterByHelperStudentBoth, 
        filterByOpenClosedAll, setFilterByOpenClosedAll, loading, setLoading} = useContext(CurrentUserContext);
        
    return (
        <div className='dashboard'>
            <CurrentUserContext.Provider value={{ currentUser, searchTerm, setSearchTerm, searchType, setSearchType, 
                filterByHelperStudentBoth, setFilterByHelperStudentBoth, filterByOpenClosedAll, setFilterByOpenClosedAll,
                loading, setLoading }}>
                <SidebarNav props={props} />

                <Route exact path='/Dashboard/Account' component={Account} />
                <Route exact path='/Dashboard/CreateTicket' component={CreateTicket} />

                <Route exact path='/Dashboard/Unassigned' component={OpenTicketList} />
                <Route exact path='/Dashboard/Mine' component={UserTicketList} />
                <Route exact path='/Dashboard/Resolved' component={ClosedTicketList} />
                <Route exact path='/Dashboard/Tickets/:id' component={ViewTicket} />
                <Route exact path='/Dashboard/CourseBuilder' component={CourseBuilder} />
                <Route exact path='/Dashboard/Lambda' component={LambdaTK} />
            </CurrentUserContext.Provider>
        </div>
    )
}
