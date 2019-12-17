import React from 'react'
import { Route } from 'react-router-dom';
import SidebarNav from './SidebarNav.js';

import ViewAccount from '../Global/ViewAccount.js';
import CreateTicket from './CreateTicket.js';
import OpenTicketList from './OpenTickets/OpenTicketList.js';
import UserTicketList from './Mine/UserTicketList.js';
import ClosedTicketList from './Closed/ClosedTicketList.js';
import ViewTicket from './ViewTicket.js';

import CourseBuilder from '../CourseBuilder.js';
import LambdaTK from './LambdaTK/LambdaTK.js';
import Course from "./LambdaTK/Course"


export default function Dashboard(props) {
        
    return (
        <div className='dashboard'>
                <SidebarNav props={props} />
                {/* <Route exact path='/Dashboard/Account' component={Account} /> */}
                <Route exact path='/Dashboard/Account/:id' component={ViewAccount} />
                <Route exact path='/Dashboard/CreateTicket' component={CreateTicket} />
                <Route exact path='/Dashboard/OpenTickets' component={OpenTicketList} />
                <Route exact path='/Dashboard/Mine' component={UserTicketList} />
                <Route exact path='/Dashboard/Resolved' component={ClosedTicketList} />
                <Route exact path='/Dashboard/Tickets/:id' component={ViewTicket} />
                <Route exact path='/Dashboard/CourseBuilder' component={CourseBuilder} />
                <Route exact path='/Dashboard/Lambda' component={LambdaTK} />
                <Route exact path='/Dashboard/Lambda/:course' component={Course} />
        </div>
    )
}
