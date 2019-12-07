import React, {useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import OpenTicket from '../OpenTickets/OpenTicket.js';
import MyTicket from './MyTicket';
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

function UserTicketList(props) {
    const [allUserTickets, setAllUserTickets] = useState([]);
    const [openTickets, setOpenTickets] = useState([]);
    const [resolvedTickets, setResolvedTickets] = useState([]);
    const [commentedTickets, setCommentedTickets] = useState([]);
    const [repliedTickets, setRepliedTickets] = useState([]);
    const [dimensions, setDimensions] = useState(0);
    const [scroll, setScroll] = useState(0);
    const [loading, setLoading] = useState(true);

// #region Th styles. just don't open it it's bad
    const [height, setHeight] = useState(75);
    const [height1, setHeight1] = useState(0);
    const [height2, setHeight2] = useState(0);
    const [height3, setHeight3] = useState(0);
    const [height4, setHeight4] = useState(0);
    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);

    const Sdiv = styled.div`
    position: sticky;
    top: ${height}px;
    height: ${height1-75}px;
    background-color: #c3cfd9;
    z-index: 10;
    margin: 0;
    padding: 0;
    `;
    const Th1 = styled.th`
    position: sticky;
    top: ${height1}px;  
    text-align: center;
    background: white;
    z-index: 2;
    `;
    const Th2 = styled.th`
    position: sticky;
    top: ${height2}px;  
    text-align: center;
    background: white;
    z-index: 2;
    `;
    const Th3 = styled.th`
    position: sticky;
    top: ${height3}px;  
    text-align: center;
    background: white;
    z-index: 2;
    `;
    const Th4 = styled.th`
    position: sticky;
    top: ${height4}px;  
    text-align: center;
    background: white;
    z-index: 2;
    `;
// #endregion
    

    useEffect(() => {
        // console.log('please no');
        axiosWithAuth()
        .get(`/tickets/mine`)
        .then(res => {
            console.log(res);
            // setAllUserTickets(res.data);
            setOpenTickets(res.data.openTickets);
            setResolvedTickets(res.data.resolvedTickets);
            setCommentedTickets(res.data.commentedOn);
            setRepliedTickets(res.data.repliedOn);
            setLoading(false);
        })
        .catch(err => {
            console.log("CATCH ERROR: ", err.response.data.message, '');
            setLoading(false);
        });
    }, [])

    // #region setHeights
    useEffect(() => {
            setHeight1(ref.current.getBoundingClientRect().bottom + 10);
            // console.log('assads ',ref.current.getBoundingClientRect().bottom);
            if (ref1.current){
                setHeight2(ref1.current.getBoundingClientRect().bottom -1);
            }
            else{
                setHeight2(height1);
            }
            if (ref2.current){
                setHeight3(height2+ ref1.current.clientHeight);
                // setHeight3(ref2.current.getBoundingClientRect().bottom -1);
            }
            else{
                setHeight3(height2);
            }
            if (ref3.current){
                setHeight4(ref3.current.getBoundingClientRect().bottom -1);
            }
            else{
                setHeight4(height3);
            }
    }, [openTickets, resolvedTickets, commentedTickets, repliedTickets, dimensions, scroll]);
    // console.log('height', height);
    // console.log('height1', height1);
    // console.log('height2', height2);
    // console.log('height3', height3);
    // console.log('height4', height4);
    // #endregion
    
  useEffect(() => {
    function handleResize() {
        setDimensions({ height: window.innerHeight, width: window.innerWidth});
        setScroll(window.pageYOffset);
    }
    function handleScroll() {
        setScroll(window.pageYOffset);
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll)
      };
  }, []);

    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
        <StyledLoader active={loading} spinner text='Loading...'>
            <Sdiv>
                <button className='button alignRight'>asdeafa</button>
                <button className='button alignRight'>asdsddeafa</button>
                <button ref={ref} className='button alignRight'>asdeddaaaaafa</button>
            </Sdiv>
            <table className='tickettable'>
                <thead> <tr > <Th1 ref={ref1}>Open Tickets</Th1> <Th1>Subject</Th1> <Th1>Title</Th1> <Th1>Age</Th1> 
                <Th1 onClick={()=>{console.log('dasdasfasf')}}>Link</Th1> </tr> </thead>
                {openTickets.length === 0 && <h2>None</h2>}
                {openTickets.length > 0 && //!collapsed
                    <tbody>
                        {openTickets.map(ticket=>{
                            return <tr key={`open ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }

                <thead> <tr> <Th2 ref={ref2}>Resolved Tickets</Th2> <Th2>Subject</Th2> <Th2>Title</Th2> <Th2>Age</Th2> 
                <Th2 onClick={()=>{console.log('dasdasfasf')}}>Link</Th2> </tr> </thead>
                {/* {resolvedTickets.length === 0 && <tbody><tr key='fsdfsdggs'><td align='center'><div style={{height: '40px', marginBottom: '30px'}}>none</div></td><td></td><td></td><td></td><td></td></tr></tbody>} */}
                {resolvedTickets.length > 0 && //!collapsed
                    <tbody>
                        {resolvedTickets.map(ticket=>{
                            return <tr key={`open ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }

                <thead> <tr> <Th3 ref={ref3}>Threads</Th3> <Th3>Subject</Th3> <Th3>Title</Th3> <Th3>Age</Th3> 
                <Th3 onClick={()=>{console.log('dasdasfasf')}}>Link</Th3> </tr> </thead>
                {commentedTickets.length === 0 && <h2>None</h2>}
                {commentedTickets.length > 0 && //!collapsed
                    <tbody>
                        {commentedTickets.map(ticket=>{
                            return <tr key={`comment ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }

                <thead> <tr> <Th4 ref={ref4}>Comments</Th4> <Th4>Subject</Th4> <Th4>Title</Th4> <Th4>Age</Th4> 
                <Th4 onClick={()=>{console.log('dasdasfasf')}}>Link</Th4> </tr> </thead>
                {repliedTickets.length === 0 && <h2>None</h2>}
                {repliedTickets.length > 0 && //!collapsed
                    <tbody>
                        {repliedTickets.map(ticket=>{
                            return <tr key={`reply ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }
                
                <tbody>{allUserTickets && allUserTickets.map(ticket => {
                    // console.log('buggy part', ticket)
                        let shouldReturn = true;
                        if(props.searchTerm){
                            if (props.searchType === 'Category' && ticket.category && !ticket.category.toLowerCase().includes(props.searchTerm.toLowerCase())){
                                shouldReturn = false; 
                            }
                            else if (props.searchType === 'author' && ticket.author_name && !ticket.author_name.toLowerCase().includes(props.searchTerm.toLowerCase())){
                                    shouldReturn = false;
                            }
                            // else if (props.searchType === 'Helper' && ticket.helper_name && !ticket.helper_name.toLowerCase().includes(props.searchTerm.toLowerCase())){
                            //     shouldReturn = false;
                            // }
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

                        if (props.filterByHelperauthorBoth === 'author' && ticket.author_name !== props.currentUser.name)
                        {
                            shouldReturn = false;
                        }
                        // else if (props.filterByHelperauthorBoth === 'Helper' && ticket.helper_name !== props.currentUser.name)
                        // {
                        //     shouldReturn = false;
                        // }
                        if (shouldReturn === true){
                            return (
                                <tr key={ticket.id}><MyTicket id={ticket.id} currentUser={props.currentUser} author_name={ticket.author_name} category={ticket.category} 
                                title={ticket.title} description={ticket.description} status={ticket.status} created_at={ticket.created_at} author_image={ticket.author_image} helper_image={ticket.helper_image}/></tr> )
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
    }
  }

export default connect(mapStateToProps, {  })(UserTicketList)
