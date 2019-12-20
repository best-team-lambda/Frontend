import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import OpenTicket from '../OpenTickets/OpenTicket.js';
import { getCourses, selectCourse, selectUnit, selectWeek, selectDay } from '../../../actions/CourseBuilderActions';

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
    z-index: 2;
`;

function QueryTicketList(props) {

    // #region Local State
    const [loading, setLoading] = useState(true);
    const [queryTickets, setQueryTickets] = useState(null)
    // #endregion

    // #region Console Logs
    // console.log(props);
    console.log('course', props.match.params.course);
    console.log('unit', props.match.params.unit);
    console.log('week', props.match.params.week);
    console.log('day', props.match.params.day);

    // #endregion

    // #region Use Effects

        //Get Tickets by Query
        useEffect(() => {
            let course = 'Course undefined'
            let courseString = `?course=${course}`;
            if (props.match.params.course === 'FullStackWeb'){ courseString = `?course=Full%20Stack%20Web`; }
            // let unit = props.match.params.course;
            let unitString = `&unit=${props.match.params.unit}`;
            // let week = '1';
            let weekString = `&week=${props.match.params.week}`;
            // let day = '2';
            let dayString = `&day=${props.match.params.day}`;

            let queryString = '';
            if (props.match.params.course){ queryString = `${queryString}${courseString}`; }
            if (props.match.params.unit){ queryString = `${queryString}${unitString}`; }
            if (props.match.params.week){ queryString = `${queryString}${weekString}`; }
            if (props.match.params.day){ queryString = `${queryString}${dayString}`; }
            console.log('queryString:', queryString);
            
            //@@@@@@@@@@@@@@@@@
            // Get tickets by query. if no tickets render 'no tickets found matching those parameters' or something
            //feel free to convert to actions and build another reducer/rename CourseBuilder actions/reducer
            //@@@@@@@@@@@@@@
            axiosWithAuth()
            .get(`/tickets/all/query/${queryString}`)
            .then(res => {
                console.log('Get tickets by query res: ', res.data);
                setQueryTickets(res.data)
                setLoading(false);
            })
            .catch(err => {
            console.log("Get Tickets by Query CATCH ERROR: ", err);
            });
        }, [props.match.params.query])

    // #endregion

    // #region Local Funcs

    // #endregion
    

    // let history = useHistory();
    // let query = useRouteMatch('/Browse/:id');



// @@@@@@@@
// see courseBuilder and coursebuilder actions/reducer to see how I hit the mongo DB to load course info

useEffect(() => {
    props.getCourses();
}, [])



    return (
        <StyledLoader active={loading} spinner text='Loading...'>
            <div className='helperDashboard'>
                <table className='tickettable ticket-table-open'>
                {/* ticket-table-open */}
                {/* className="thead-open"  */}
                    <thead className='thead-open'>
                        <tr className="tr-open">
                            <th className='firstTh stickyTH th-open' >Author</th>
                            <th className='stickyTH th-open'>Subject</th>
                            <th className='stickyTH th-open'>Title</th>
                            <th className='stickyTH th-open'>Age</th>
                            <th className='stickyTH th-open'>Link</th>
                        </tr>
                    </thead>
                    <tbody className="tbody-open">
                        {queryTickets && queryTickets.map(ticket => {
                        return <tr key={ticket.id}><OpenTicket id={ticket.id} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                        title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image} /></tr> })}
                    </tbody>
                </table> 
            </div>
        </StyledLoader>
    )
}


const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        // searchType: state.SearchReducer.searchType,
        // searchTerm: state.SearchReducer.searchTerm,
    }
  }

export default connect(mapStateToProps, { getCourses, selectCourse, selectUnit, selectWeek, selectDay })(QueryTicketList)