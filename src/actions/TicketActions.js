import axiosWithAuth from '../utils/axiosWithAuth.js';

export const LOADING_START = 'LOADING_START';
export const LOADING_DONE = 'LOADING_DONE';
export const SET_TICKET = 'SET_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';
export const DELETE_TICKET = 'DELETE_TICKET';
export const COLLAPSE_ALL = 'COLLAPSE_ALL';
export const EXPAND_ALL = 'EXPAND_ALL';
export const TOGGLE_COLLAPSE = 'TOGGLE_COLLAPSE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_REPLY = 'ADD_REPLY';
export const UPDATE_REPLY = 'UPDATE_REPLY';
export const DELETE_REPLY = 'DELETE_REPLY';
export const MARK_ANSWER = 'MARK_ANSWER';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';


export const loadingStart = () =>{
    return { type: LOADING_START, payload: null };
}
export const loadingDone = () =>{
    return { type: LOADING_DONE, payload: null };
}
export const getTicket = (props) => dispatch => {
    dispatch({ type: LOADING_START, payload: null });
    axiosWithAuth()
      .get(`/tickets/${props.match.params.id}`)
      .then(res => {
        // console.log('GetTicket Res', res.data);
        // console.log('GetTicket TicketDetails:', res.data.ticket_details);
        // console.log('GetTicket Comments:', res.data.ticket_comments);
        dispatch({ type: SET_TICKET, payload: res.data });
      })
      .catch(err => {
        console.log("CATCH ERROR: ", err.response.data.message, '');
        dispatch({ type: LOADING_DONE, payload: null });
        alert(err.response.data.message);
        props.history.push('/Dashboard/Unassigned');
      });
}
export const updateTicket = (ticketID, editedTicket) => dispatch => {
    console.log('updateTicket firing: ', ticketID, editedTicket);
    axiosWithAuth().put(`/tickets/${ticketID}`, { ...editedTicket })
    .then((res) =>{
        console.log('updateComment res data: ', res.data);
        dispatch({ type: UPDATE_TICKET, payload: res.data });
    })
    .catch(err => { console.log('updateComment CATCH ERROR: ', err.response) });
}
export const deleteTicket = (props) => dispatch => {
    dispatch({ type: LOADING_START, payload: null });
    axiosWithAuth()
      .delete(`/tickets/${props.match.params.id}`)
      .then(res => {
        alert('Ticket deleted successfully. Redirecting...');
        props.history.push('/Dashboard/Unassigned');
      })
      .catch(err => {
        console.log("CATCH ERROR: ", err.response.data.message, '');
        alert(err.response.data.message);
        props.history.push('/Dashboard/Unassigned');
      });
}
export const addComment = (ticketID, newCommentText) => dispatch => {
    axiosWithAuth().post(`/tickets/${ticketID}/comments`, {description: newCommentText})
    .then((res) =>{
        // console.log(res.data);
        dispatch({ type: ADD_COMMENT, payload: res.data });
    })
    .catch(err => { console.log('addComment CATCH ERROR: ', err) });
}
export const updateComment = (commentID, updatedText, collapsedStatus) => dispatch => {
    console.log('updateComment firing: ', commentID, updatedText);
    axiosWithAuth().put(`/tickets/comments/${commentID}`, { description: updatedText, collapsed: collapsedStatus})
    .then((res) =>{
        // console.log('updateComment res data: ',res.data);
        dispatch({ type: UPDATE_COMMENT, payload: res.data });
    })
    .catch(err => { console.log('updateComment CATCH ERROR: ', err.response) });
}
export const deleteComment = (commentID) => dispatch => {
    axiosWithAuth().delete(`/tickets/comments/${commentID}`)
    .then((res) =>{
        dispatch({ type: DELETE_COMMENT, payload: commentID });
    })
    .catch(err => { console.log('deleteComment CATCH ERROR: ', err) });
}
export const addReply = (commentID, newReplyText) => dispatch => {
    // console.log('addReply CommentID: ', commentID);
    axiosWithAuth().post(`/tickets/comments/${commentID}/replies`, {description: newReplyText})
    .then((res) =>{
        // console.log(res.data);
        dispatch({ type: ADD_REPLY, payload: res.data });
    })
    .catch(err => { console.log('addReply CATCH ERROR: ', err) });
}
export const updateReply = (replyID, updatedText) => dispatch => {
    axiosWithAuth().put(`/tickets/comments/replies/${replyID}`, {description: updatedText})
    .then((res) =>{
        console.log('updateReply res data: ', res.data);
        dispatch({ type: UPDATE_REPLY, payload: res.data });
    })
    .catch(err => { console.log('updateReply CATCH ERROR: ', err) });
}
export const deleteReply = (replyID) => dispatch => {
    axiosWithAuth().delete(`/tickets/comments/replies/${replyID}`)
    .then((res) =>{
        console.log('delete reply res: ', res.data);
        dispatch({ type: DELETE_REPLY, payload: replyID });
    })
    .catch(err => { console.log('deleteReply CATCH ERROR: ', err) });
}
export const markAsAnswer = (ticketID, commentOrReply) => dispatch => {
    console.log('markAsAnswer action commentOrReply: ', commentOrReply);
    let commentId = '';
    let replyId = '';
    replyId = commentOrReply.comment_id;
    console.log(replyId);
    let objToSend;
    if (commentOrReply.comment_id === undefined){
        objToSend = { reply_id: commentOrReply.id, solution: commentOrReply.description }
    }
    else if (commentOrReply.id !== undefined && commentOrReply.comment_id === undefined){
        objToSend = { comment_id: commentOrReply.id, solution: commentOrReply.description }
    }
    else {
        objToSend = { solution: commentOrReply.description }
    }
    console.log('objTosend'. objToSend);
    axiosWithAuth().post(`/tickets/${ticketID}/resolve`, objToSend)
    .then((res) =>{
        console.log('markAsAnswer res data', res.data)
        dispatch({ type: MARK_ANSWER, payload: res.data });
    })
    .catch(err => { console.log('markAsAnswer CATCH ERROR: ', err.response.data.message) });
}
export const removeAnswer = (ticketID) => dispatch => {
    // axiosWithAuth().post(`/tickets/${ticketID}/resolve`)
    // .then(() =>{
    //     dispatch({ type: REMOVE_ANSWER, payload: null });
    // })
    // .catch(err => { console.log('markAsAnswer CATCH ERROR: ', err.response.data.message) });
}
export const toggleCollapse = (commentID) => {
    return { type: TOGGLE_COLLAPSE, payload: commentID };
}
export const collapseAll = () => {
    return { type: COLLAPSE_ALL, payload: null };
}
export const expandAll = () => {
    return { type: EXPAND_ALL, payload: null };
}

