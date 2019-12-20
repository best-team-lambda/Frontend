import React, {useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { scrollToTop, scrollToBottom } from '../../../utils/AppUtils.js';
import OpenTicket from '../OpenTickets/OpenTicket.js';
import MyTicket from './MyTicket';
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
import ThreadTicket from "./ThreadTicket"

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
    z-index: 2;
`;

function UserTicketList(props) {
    //unsed, remove. its in for search box atm
    const [allUserTickets, setAllUserTickets] = useState([]);
// #region local state vars
    const [loading, setLoading] = useState(true);

    const [openTickets, setOpenTickets] = useState([]);
    const [resolvedTickets, setResolvedTickets] = useState([]);
    const [commentedTickets, setCommentedTickets] = useState([]);
    const [repliedTickets, setRepliedTickets] = useState([]);

    const [dimensions, setDimensions] = useState(0);
    const [scroll, setScroll] = useState(0);
    const [triggered, setTriggered] = useState(false);
    const [clickedOn, setClickedOn] = useState(null);

    const [openCollapsed, setOpenCollapsed] = useState(false);
    const [resolvedCollapsed, setResolvedCollapsed] = useState(false);
    const [commentsCollapsed, setCommentsCollapsed] = useState(false);
    const [repliesCollapsed, setRepliesCollapsed] = useState(false);
    const [tableOffset, setTableOffset] = useState(0);
//#endregion

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
    const buttonDivRef = useRef(null);
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
        window.scrollTo(0, 0);
        axiosWithAuth()
        .get(`/tickets/mine`)
        .then(res => {
            // console.log('commentedon', res.data.commentedOn)
            // console.log('repliedOn', res.data.repliedOn)
            setOpenTickets(res.data.openTickets);
            setResolvedTickets(res.data.resolvedTickets);
            setCommentedTickets(res.data.commentedOn);
            setRepliedTickets(res.data.repliedOn)
            setLoading(false);
        })
        .catch(err => {
            console.log("CATCH ERROR: ", err.response.data.message);
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
                setResolvedCollapsed(true);
            }
            if (commentedTickets.length === 0){
                setCommentsCollapsed(true);
            }
            if (repliedTickets.length === 0){
                setRepliesCollapsed(true);
            }
        }
        // #endregion
        // #region set sticky heights for the table headers
        setHeight(ref.current.getBoundingClientRect().bottom-65);
        setHeight1(ref.current.getBoundingClientRect().bottom + 10);
        if (ref1.current){
                setHeight2(ref1.current.getBoundingClientRect().bottom-1);
        }
        if (ref2.current){
            if (resolvedCollapsed){
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
                setHeight4(ref3.current.getBoundingClientRect().bottom -1);
            }
        }
        // #endregion

        let tableBody;
        let tableHeaders;
        let gap; 

        //set body lengths based off collapsed or not (and length)
        openCollapsed ? setHeight1body(0) : (ref1body.current &&  setHeight1body(ref1body.current.clientHeight));
        resolvedCollapsed ? setHeight2body(0) : (ref2body.current &&  setHeight2body(ref2body.current.clientHeight));
        commentsCollapsed ? setHeight3body(0) : (ref3body.current &&  setHeight3body(ref3body.current.clientHeight));
        repliesCollapsed ? setHeight4body(0) : (ref4body.current &&  setHeight4body(ref4body.current.clientHeight));
        
        //set totalbody to all body lengths added
        ref4.current && (tableBody = height1body + height2body + height3body + height4body);

        //set totalHeaders to header lengths
        ref4.current && (tableHeaders = ref1.current.clientHeight + ref2.current.clientHeight + ref3.current.clientHeight + ref4.current.clientHeight);

        buttonDivRef.current && (gap = window.innerHeight - (225 + buttonDivRef.current.clientHeight + tableBody + tableHeaders));
        // console.log('GAP: ', gap);
        setTableOffset(gap + tableBody );
        // console.log(tableOffset);
    }, [openTickets, resolvedTickets, commentedTickets, repliedTickets, dimensions, scroll, openCollapsed, resolvedCollapsed, commentsCollapsed, repliesCollapsed]);

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

      useEffect(() => {
          //if a section is partially hidden when it was collapsed this useeffect makes sure that it expands to full height when expanded.
          if(triggered){        
            if (clickedOn === 'open' && !openCollapsed){
                // console.log('bodytop, header bottom', ref1body.current.getBoundingClientRect().top, ref1.current.getBoundingClientRect().bottom)
                if(ref1body.current && ref1body.current.getBoundingClientRect().top < ref1.current.getBoundingClientRect().bottom){
                    // console.log('offset before: ', window.pageYOffset)
                    // console.log('difference', (ref1.current.getBoundingClientRect().bottom - ref1body.current.getBoundingClientRect().top), 'bodyheight', ref1body.current.clientHeight)
                    window.scrollBy(0, ((ref1.current.getBoundingClientRect().bottom - ref1body.current.getBoundingClientRect().top)*-1))
                    // console.log('offset after: ', window.pageYOffset)
                }
            }
            else if (clickedOn === 'closed' && !resolvedCollapsed){
                if(ref1body.current && ref2body.current.getBoundingClientRect().top < ref2.current.getBoundingClientRect().bottom){
                    window.scrollBy(0, ((ref2.current.getBoundingClientRect().bottom - ref2body.current.getBoundingClientRect().top)*-1))
                }
            }
            else if (clickedOn === 'comments' && !commentsCollapsed){
                if(ref1body.current && ref3body.current.getBoundingClientRect().top < ref3.current.getBoundingClientRect().bottom){
                    window.scrollBy(0, ((ref3.current.getBoundingClientRect().bottom - ref3body.current.getBoundingClientRect().top)*-1))
                }
            }
            else if (clickedOn === 'replies' && !repliesCollapsed){
                if(ref1body.current && ref4body.current.getBoundingClientRect().top < ref4.current.getBoundingClientRect().bottom){
                    window.scrollBy(0, ((ref4.current.getBoundingClientRect().bottom - ref4body.current.getBoundingClientRect().top)*-1))
                }
            }
            setTriggered(false);
          }
      }, [triggered])
    // #endregion

    // const getMyComment = (ticket) => {
    //     const comment = ticket.ticket_comments.find(comment => {
    //         return comment.author_id === props.currentUser.id
    //     })
    //     let commentStr = ""
    //     if(comment.description.length >= 100 ){
    //         commentStr += comment.description.substring(0,100) + "..."
    //     }else{
    //         commentStr += comment.description
    //     }
    //     return commentStr
    // }
    
// #region local funcs
    const handleCollapse = (name) => {
        let oldOffset = window.pageYOffset;
        //Toggle collapse and adjust the window position by toggle status and list body size
        if (name === 'open' && openTickets.length > 0){
            //Keep window in same spot
            if(openCollapsed){
                window.scrollTo(0, oldOffset);
                setOpenCollapsed(!openCollapsed);
            }
            //if section was fully hidden by scroll, instead of collapsing expand to full height.
            else if (ref1.current.getBoundingClientRect().top - ref1body.current.getBoundingClientRect().bottom >= (ref1body.current.clientHeight*-1)){
                window.scrollTo(0, ref1.current.getBoundingClientRect().bottom+ref1body.current.clientHeight);
            }
            else{
                setOpenCollapsed(!openCollapsed);
            }
        }
        else if (name === 'closed' && resolvedTickets.length > 0){
            if(resolvedCollapsed){
                window.scrollTo(0, oldOffset);
                setResolvedCollapsed(!resolvedCollapsed);
            }
            else if ((ref2.current.getBoundingClientRect().top - ref2body.current.getBoundingClientRect().bottom) >= (ref2body.current.clientHeight*-1)){
                window.scrollTo(0, ref2.current.getBoundingClientRect().bottom+ref2body.current.clientHeight);
            }
            else{
                setResolvedCollapsed(!resolvedCollapsed);
            }
        }
        else if (name === 'comments' && commentedTickets.length > 0){
            if(commentsCollapsed){
                window.scrollTo(0, oldOffset);
                setCommentsCollapsed(!commentsCollapsed);
            }
            else if ((ref3.current.getBoundingClientRect().top - ref3body.current.getBoundingClientRect().bottom) >= (ref3body.current.clientHeight*-1)){
                window.scrollTo(0, ref3.current.getBoundingClientRect().bottom+ref3body.current.clientHeight);
            }
            else{
                setCommentsCollapsed(!commentsCollapsed);
            }
        }
        else if (name === 'replies' && repliedTickets.length > 0){
            if(repliesCollapsed){
                window.scrollTo(0, oldOffset);
                setRepliesCollapsed(!repliesCollapsed);
            }
            else if ((ref4.current.getBoundingClientRect().top - ref4body.current.getBoundingClientRect().bottom) >= (ref4body.current.clientHeight*-1)){
                window.scrollTo(0, ref4.current.getBoundingClientRect().bottom+ref4body.current.clientHeight);
            }
            else{
                setRepliesCollapsed(!repliesCollapsed);
            }
        }
        setTriggered(true);
        setClickedOn(name);
    }
    const collapseAll = () => {
        setOpenCollapsed(true);
        setResolvedCollapsed(true);
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
        setResolvedCollapsed(false);
        setCommentsCollapsed(false);
        setRepliesCollapsed(false);
        window.scrollTo(0, 0);
    }
// #endregion

    return (
         <div className='helperDashboard'> {/* some styling is set in app.js to render dashboard correctly */}
        <StyledLoader active={loading} spinner text='Loading...'>
            {/* <div style={{height: '200px', backgroundColor: 'blue'}}></div> */}
            <Sdiv ref={buttonDivRef}>
                <button className='button alignRight' onClick={scrollToTop}>Top</button>
                <button className='button alignRight' onClick={scrollToBottom}>Bottom</button>
                <button className='button alignRight' onClick={expandAll}>Expand All</button>
                <button ref={ref} className='button alignRight' onClick={collapseAll}>Collapse All</button>
            </Sdiv>
            <table className='tickettable' style={{top: '75px'}} >
                <thead  style={{position: 'sticky', top: `${0}px`, bottom: `${0}px`}}> <tr className='pointer' onClick={()=>{handleCollapse('open')}}> <Th1 ref={ref1}>Open Tickets</Th1> <Th1>Subject</Th1><Th1>Title</Th1> <Th1>Age</Th1> 
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

                <thead> <tr className='pointer' onClick={()=>{handleCollapse('closed')}}> <Th2 ref={ref2}>Resolved Tickets</Th2> <Th2>Subject</Th2> <Th2>Subject</Th2> <Th2>Age</Th2> 
                <Th2 onClick={()=>{console.log('dasdasfasf')}}>Link</Th2> </tr> </thead>
                {/* {resolvedTickets.length === 0 && <tbody><tr key='fsdfsdggs'><td align='center'><div style={{height: '40px', marginBottom: '30px'}}>none</div></td><td></td><td></td><td></td><td></td></tr></tbody>} */}
                {!resolvedCollapsed && resolvedTickets.length > 0 && //!collapsed
                    <tbody ref={ref2body}>
                        {resolvedTickets.map(ticket=>{
                            return <tr key={`open ${ticket.id}`}><OpenTicket id={ticket.id} currentUser={props.currentUser} author_id={ticket.author_id} author_name={ticket.author_name} category={ticket.category} 
                            title={ticket.title} description={ticket.description} created_at={ticket.created_at} author_image={ticket.author_image}/></tr>
                        })}
                    </tbody>
                }
                <thead> <tr className='pointer' onClick={()=>{handleCollapse('comments')}}> <Th3 ref={ref3}>Threads</Th3> <Th3>Ticket Title</Th3> <Th3>Comment</Th3> <Th3>Status</Th3> 
                <Th3 onClick={()=>{console.log('dasdasfasf')}}>Link</Th3> </tr> </thead>
                {/* {commentedTickets.length === 0 && <h2>None</h2>} */}
                {!commentsCollapsed && commentedTickets.length > 0 && //!collapsed
                    <tbody ref={ref3body}>
                        {commentedTickets.map(comment=>{
                            return <tr key={`comment ${comment.id}`}><ThreadTicket id={comment.id} currentUser={props.currentUser} author_id={comment.author_id} author_name={comment.author_name} 
                                title={comment.ticket_title} description={comment.description} created_at={comment.created_at} status={comment.ticket_status} author_image={comment.author_image}/></tr>
                                    
                        })} 
                     </tbody>
                 }
                <thead> <tr className='pointer' onClick={()=>{handleCollapse('replies')}}> <Th4 ref={ref4}>Replies</Th4> <Th4>Ticket Title</Th4><Th4>Reply</Th4> <Th4>Status</Th4> 
                <Th4 onClick={()=>{console.log('dasdasfasf')}}>Link</Th4> </tr> </thead>
                {/* {repliedTickets.length === 0 && <h2>None</h2>} */}
                {!repliesCollapsed && repliedTickets.length > 0 && //!collapsed
                    <tbody ref={ref4body}>
                        {repliedTickets.map(reply=>{
                            return <tr key={`reply ${reply.id}`}><ThreadTicket id={reply.id} currentUser={props.currentUser} author_id={reply.author_id} author_name={reply.author_name} 
                                title={reply.ticket_title} description={reply.description} created_at={reply.created_at} status={reply.ticket_status} author_image={reply.author_image}/></tr>          
                        })} 
                    </tbody>
                }

            {/* all hail */}
            {/* {<div style={{backgroundColor: 'blue', height: `${tableOffset}px`}}></div>} */}
            {<div style={{height: `${tableOffset}px`}}></div>}
            {/* if you delete this i will hurt you */}
{/* this div is adjusting the height of the table based off all the refs so the page will be the correct height for the sticky tables to function */}

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


const RouteDiv = styled.div`


`