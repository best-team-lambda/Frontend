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
    const [openCollapsed, setOpenCollapsed] = useState(false);
    const [closedCollapsed, setClosedCollapsed] = useState(false);
    const [commentsCollapsed, setCommentsCollapsed] = useState(false);
    const [repliesCollapsed, setRepliesCollapsed] = useState(false);
    const [combinedHeight, setCombinedHeight] = useState(0);

// #region Th styles. just don't open it it's bad
    const [height, setHeight] = useState(75);
    const [height1, setHeight1] = useState(0);
    const [height1body, setHeight1body] = useState(0);
    const [height2, setHeight2] = useState(0);
    const [height2body, setHeight2body] = useState(0);
    const [height3, setHeight3] = useState(0);
    const [height3body, setHeight3body] = useState(0);
    const [height4, setHeight4] = useState(0);
    const [height4body, setHeight4body] = useState(0);
    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref1body = useRef(null);
    const ref2 = useRef(null);
    const ref2body = useRef(null);
    const ref3 = useRef(null);
    const ref3body = useRef(null);
    const ref4 = useRef(null);
    const ref4body = useRef(null);

    const Sdiv = styled.div`
    position: sticky;
    top: 75px;
    height: ${height}px;
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
        window.scrollTo(0, 0);
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

    // #region setHeights/resize and scroll event listeners
    useEffect(() => {

        // #region auto collapse if length is 0
        if (loading === false){
            if (openTickets.length === 0){
                setOpenCollapsed(true);
            }
            if (resolvedTickets.length === 0){
                setClosedCollapsed(true);
            }
            if (commentedTickets.length === 0){
                setCommentsCollapsed(true);
            }
            if (repliedTickets.length === 0){
                setRepliesCollapsed(true);
            }
        }
        // #endregion
            setHeight(ref.current.getBoundingClientRect().bottom-65);
            console.log('thething', ref.current.getBoundingClientRect().bottom + 10)
            setHeight1(ref.current.getBoundingClientRect().bottom + 10);
            // console.log('assads ',ref.current.getBoundingClientRect().bottom);
            if (ref1.current){
                    setHeight2(ref1.current.getBoundingClientRect().bottom);
            }
            if (ref2.current){
                if (closedCollapsed){
                    setHeight3(height2 +  ref2.current.clientHeight -1);
                }
                else{
                    setHeight3(ref2.current.getBoundingClientRect().bottom -1);
                }
            }
            if (ref3.current){
                if (commentsCollapsed){
                    setHeight4(height3 + ref3.current.clientHeight -1);
                }
                else{
                    console.log('ddddd', scroll)
                    setHeight4(ref3.current.getBoundingClientRect().bottom -1);
                }
            }

            ref1body.current ? setHeight1body(ref1body.current.clientHeight) : setHeight1body(0);
            ref2body.current ? setHeight2body(ref2body.current.clientHeight) : setHeight2body(0);
            ref3body.current ? setHeight3body(ref3body.current.clientHeight) : setHeight3body(0);
            ref4body.current ? setHeight4body(ref4body.current.clientHeight) : setHeight4body(0);
            ref4.current && setCombinedHeight(ref.current.getBoundingClientRect().bottom + ref1.current.clientHeight + ref2.current.clientHeight + ref3.current.clientHeight)
    }, [openTickets, resolvedTickets, commentedTickets, repliedTickets, dimensions, scroll, openCollapsed, closedCollapsed, commentsCollapsed, repliesCollapsed]);
        // console.log('height', height);
        // console.log('height1', height1);
        // console.log('height2', height2);
        // console.log('height3', height3);
        // ref2.current && console.log('abcdddd', scroll - height1);
        // console.log('height4', height4);
        // console.log('offset', window.pageYOffset);
        // console.log('offset', scroll);
        console.log('combinedHeight', combinedHeight);
        console.log('height1body', height1body);


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

    // #endregion
    
      const handleCollapse = (name) => {
        console.log(name);
        if (name === 'open' && openTickets.length > 0){
            // console.log(openCollapsed);
            // ref1.current.scrollTop = -3000;
            setOpenCollapsed(!openCollapsed);
            window.scrollTo(0, (height1-height1body));
        }
        else if (name === 'closed' && resolvedTickets.length > 0){
            setClosedCollapsed(!closedCollapsed);
            window.scrollTo(0, (height2-height2body));
        }
        else if (name === 'comments' && commentedTickets.length > 0){
            setCommentsCollapsed(!commentsCollapsed);
            window.scrollTo(0, (height3-height3body));
        }
        else if (name === 'replies' && repliedTickets.length > 0){
            setRepliesCollapsed(!repliesCollapsed);
            window.scrollTo(0, (height4-height4body));
        }
      }

      const collapseAll = () => {
          setOpenCollapsed(true);
          setClosedCollapsed(true);
          setCommentsCollapsed(true);
          setRepliesCollapsed(true);
          if(window.pageYOffset == 0){
            window.scrollBy(0, 1);
          }
          else{
            window.scrollTo(0, 0);
          }
      }
      const expandAll = () => {
          setOpenCollapsed(false);
          setClosedCollapsed(false);
          setCommentsCollapsed(false);
          setRepliesCollapsed(false);
          window.scrollTo(0, 0);
      }

    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
        <StyledLoader active={loading} spinner text='Loading...'>
            {/* <div style={{height: '200px', backgroundColor: 'blue'}}></div> */}
            <Sdiv>
                <button className='button alignRight'>asdeafa</button>
                <button className='button alignRight' onClick={expandAll}>Expand All</button>
                <button ref={ref} className='button alignRight' onClick={collapseAll}>Collapse All</button>
            </Sdiv>
            <table className='tickettable' style={{top: `${height1}px`}}>
                <thead  style={{position: 'sticky', top: `${height1}px`, bottom: `${height1 + 20}px`}}> <tr className='pointer' onClick={()=>{handleCollapse('open')}}> <Th1 ref={ref1}>Open Tickets</Th1> <Th1>Subject</Th1> <Th1>Title</Th1> <Th1>Age</Th1> 
                <Th1 onClick={()=>{console.log('dasdasfasf')}}>Link</Th1> </tr> </thead>
                {/* {openTickets.length === 0 && <h2>None</h2>} */}
                {!openCollapsed && openTickets.length > 0 && //!collapsed
                    <tbody ref={ref1body}>
                        {openTickets.map(ticket=>{
                            return <tr key={`open ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }

                <thead> <tr className='pointer' onClick={()=>{handleCollapse('closed')}}> <Th2 ref={ref2}>Resolved Tickets</Th2> <Th2>Subject</Th2> <Th2>Title</Th2> <Th2>Age</Th2> 
                <Th2 onClick={()=>{console.log('dasdasfasf')}}>Link</Th2> </tr> </thead>
                {/* {resolvedTickets.length === 0 && <tbody><tr key='fsdfsdggs'><td align='center'><div style={{height: '40px', marginBottom: '30px'}}>none</div></td><td></td><td></td><td></td><td></td></tr></tbody>} */}
                {!closedCollapsed && resolvedTickets.length > 0 && //!collapsed
                    <tbody ref={ref2body}>
                        {resolvedTickets.map(ticket=>{
                            return <tr key={`open ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }

                <thead> <tr className='pointer' onClick={()=>{handleCollapse('comments')}}> <Th3 ref={ref3}>Threads</Th3> <Th3>Subject</Th3> <Th3>Title</Th3> <Th3>Age</Th3> 
                <Th3 onClick={()=>{console.log('dasdasfasf')}}>Link</Th3> </tr> </thead>
                {/* {commentedTickets.length === 0 && <h2>None</h2>} */}
                {!commentsCollapsed && commentedTickets.length > 0 && //!collapsed
                    <tbody ref={ref3body}>
                        {commentedTickets.map(ticket=>{
                            return <tr key={`comment ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }

                <thead> <tr className='pointer' onClick={()=>{handleCollapse('replies')}}> <Th4 ref={ref4}>Comments</Th4> <Th4>Subject</Th4> <Th4>Title</Th4> <Th4>Age</Th4> 
                <Th4 onClick={()=>{console.log('dasdasfasf')}}>Link</Th4> </tr> </thead>
                {/* {repliedTickets.length === 0 && <h2>None</h2>} */}
                {!repliesCollapsed && repliedTickets.length > 0 && //!collapsed
                    <tbody ref={ref4body}>
                        {repliedTickets.map(ticket=>{
                            return <tr key={`reply ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }

            {/* all hail */}
            {<div style={{position: 'relative', top: '230px', height: `${330}px`}}></div>}
            {/* if you delete this i will hurt you */}
                
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
