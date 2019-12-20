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
export const WIPE_TICKET = 'WIPE_TICKET';
export const DELETE_PICTURE = "DELETE_PICTURE";
export const DELETE_VIDEO = "DELETE_VIDEO";


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
        console.log("CATCH ERROR: ", err.response.data.message);
        dispatch({ type: LOADING_DONE, payload: null });
        alert(err.response.data.message);
        props.history.push('/Dashboard/OpenTickets');
      });
}
export const updateTicket = (ticketID, formData, setLoading, setEditingQuestion, setEditQuestionObj, setImages, setVideo) => dispatch => {
    // console.log('updateTicket action firing');
    setLoading(true);
    axiosWithAuth().put(`tickets/${ticketID}/sendall/`, formData)
    .then(res =>{
        // console.log('updateTicket res: ', res);
        dispatch({ type: UPDATE_TICKET, payload: res.data });
        setEditingQuestion(false);
        setEditQuestionObj({title: '', category: '', description: ''});
        setImages(false);
        setVideo(false);
        setLoading(false);
    })
    .catch(err => {
        console.log('UpdateTicket Catch Error', err.response.data.message);
        setLoading(false);
    });
}
export const deleteTicket = (props) => dispatch => {
    dispatch({ type: LOADING_START, payload: null });
    axiosWithAuth()
      .delete(`/tickets/${props.match.params.id}`)
      .then(res => {
        alert('Ticket deleted successfully. Redirecting...');
        props.history.push('/Dashboard/OpenTickets');
      })
      .catch(err => {
        console.log("CATCH ERROR: ", err.response.data.message, '');
        alert(err.response.data.message);
        props.history.push('/Dashboard/OpenTickets');
      });
}
export const wipeTicket = () => dispatch => {
    dispatch({ type: WIPE_TICKET, payload: '' });
    return null;
}
export const addComment = (ticketID, newCommentText, setLoading, pictures, video) => dispatch => {
    let newCommentID = '';
    setLoading(true);
    axiosWithAuth().post(`/tickets/${ticketID}/comments`, {description: newCommentText})
    .then((res) =>{
        // console.log("comment response", res.data);
        newCommentID = res.data.id;
        // console.log('pictures', pictures)
        if (pictures){
            // console.log('pictures true')
            axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/comments/${newCommentID}/pictures`, pictures)
            .then(res => {
                // console.log('pictures success, res: ', res)
                if (video){
                    // console.log('video')
                    axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/comments/${newCommentID}/video`, video)
                    .then(()=>{
                        // console.log('picture and video comment');
                        axiosWithAuth().get(`/tickets/comments/${newCommentID}`)
                        .then(res => {
                            // console.log('comment axios res: ', res)
                            dispatch({ type: ADD_COMMENT, payload: res.data });
                            setLoading(false);
                        })}
                    );
                }
                else{
                    // console.log('picture but no video comment')
                    axiosWithAuth().get(`/tickets/comments/${newCommentID}`)
                    .then(res => {
                        // console.log('comment axios res: ', res)
                        dispatch({ type: ADD_COMMENT, payload: res.data });
                        setLoading(false);
                    })
                }
            })
        }
        else if (video){
            // console.log('else if video')
            axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/comments/${newCommentID}/video`, video)
            .then(()=>{
                // console.log('no picture, video true comment')
                axiosWithAuth().get(`/tickets/comments/${newCommentID}`)
                .then(res => {
                    // console.log('comment axios res: ', res)
                    dispatch({ type: ADD_COMMENT, payload: res.data });
                    setLoading(false);
                })
            });
        }
        else{
            // console.log('no picture or video comment')
            axiosWithAuth().get(`/tickets/comments/${newCommentID}`)
            .then(res => {
                // console.log('comment axios res: ', res)
                dispatch({ type: ADD_COMMENT, payload: res.data });
                setLoading(false);
            })
        }
    })
    .catch(err => { console.log('addComment CATCH ERROR: ', err) 
    setLoading(false); });
}
export const updateComment = (commentID, formData, setLoading, setEditCommentText, setEditCommentID, setImages, setVideo) => dispatch => {
    // console.log('updateComment firing');
    setLoading(true);
    axiosWithAuth().put(`tickets/comments/${commentID}/sendall/`, formData)
    .then(res =>{
    //   console.log('updateComment res: ', res);
      dispatch({ type: UPDATE_COMMENT, payload: res.data.comment });
      setEditCommentID('');
      setEditCommentText('');
      setImages(false);
      setVideo(false);
      setLoading(false);
    })
    .catch(err => {
      console.log('Update Comment Catch Error', err.response.data.message);
      setLoading(false);
    });
}
export const deleteComment = (commentID) => dispatch => {
    axiosWithAuth().delete(`/tickets/comments/${commentID}`)
    .then((res) =>{
        dispatch({ type: DELETE_COMMENT, payload: commentID });
    })
    .catch(err => { console.log('deleteComment CATCH ERROR: ', err) });
}
export const addReply = (commentID, newReplyText, setLoading, pictures, video) => dispatch => {
    let newReplyID = '';
    setLoading(true);
    axiosWithAuth().post(`/tickets/comments/${commentID}/replies`, {description: newReplyText})
    .then((res) =>{
        // console.log("reply response", res.data);
        newReplyID = res.data.id;
        // console.log('pictures', pictures)
        if (pictures){
            // console.log('pictures true')
            axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/comments/replies/${newReplyID}/pictures`, pictures)
            .then(res => {
                // console.log('pictures success, res: ', res)
                if (video){
                    // console.log('video')
                    axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/comments/replies/${newReplyID}/video`, video)
                    .then(()=>{
                        // console.log('picture and video reply');
                        axiosWithAuth().get(`/tickets/replies/${newReplyID}`)
                        .then(res => {
                            // console.log('reply axios res: ', res)
                            dispatch({ type: ADD_REPLY, payload: res.data });
                            setLoading(false);
                        })}
                    );
                }
                else{
                    // console.log('picture but no video reply')
                    axiosWithAuth().get(`/tickets/replies/${newReplyID}`)
                    .then(res => {
                        // console.log('reply axios res: ', res)
                        dispatch({ type: ADD_REPLY, payload: res.data });
                        setLoading(false);
                    })
                }
            })
        }
        else if (video){
            // console.log('else if video')
            axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/comments/replies/${newReplyID}/video`, video)
            .then(()=>{
                // console.log('no picture, video true reply')
                axiosWithAuth().get(`/tickets/replies/${newReplyID}`)
                .then(res => {
                    // console.log('reply axios res: ', res)
                    dispatch({ type: ADD_REPLY, payload: res.data });
                    setLoading(false);
                })
            });
        }
        else{
            // console.log('no picture or video reply')
            axiosWithAuth().get(`/tickets/replies/${newReplyID}`)
            .then(res => {
                // console.log('reply axios res: ', res)
                dispatch({ type: ADD_REPLY, payload: res.data });
                setLoading(false);
            })
        }
    })
    .catch(err => { console.log('addReply CATCH ERROR: ', err) 
    setLoading(false); });
}
export const updateReply = (editReplyID, formData, setLoading, setEditReplyText, setEditReplyID, setImages, setVideo) => dispatch => {
    // console.log('updateReply firing');
    setLoading(true);
    axiosWithAuth().put(`tickets/comments/replies/${editReplyID}/sendall/`, formData)
    .then(res =>{
    //   console.log('updateReply res: ', res);
      dispatch({ type: UPDATE_REPLY, payload: res.data.reply });
      setEditReplyID('');
      setEditReplyText('');
      setImages(false);
      setVideo(false);
      setLoading(false);
    })
    .catch(err => {
      console.log(err.response.data.message);
      setLoading(false);
    });
}
export const deleteReply = (replyID) => dispatch => {
    axiosWithAuth().delete(`/tickets/comments/replies/${replyID}`)
    .then((res) =>{
        // console.log('delete reply res: ', res.data);
        dispatch({ type: DELETE_REPLY, payload: replyID });
    })
    .catch(err => { console.log('deleteReply CATCH ERROR: ', err) });
}
export const markAsAnswer = (ticketID, commentOrReply) => dispatch => {
    // console.log('markAsAnswer action commentOrReply: ', commentOrReply);
    let objToSend;
    if (commentOrReply.comment_id !== undefined){
        objToSend = { reply_id: commentOrReply.id, solution: commentOrReply.description }
    }
    else if (commentOrReply.id !== undefined && commentOrReply.comment_id === undefined){
        objToSend = { comment_id: commentOrReply.id, solution: commentOrReply.description }
    }
    else {
        objToSend = { solution: commentOrReply.description }
    }
    // console.log('objTosend', objToSend);
    axiosWithAuth().post(`/tickets/${ticketID}/resolve`, objToSend)
    .then((res) =>{
        // console.log('markAsAnswer res data', res.data)
        dispatch({ type: MARK_ANSWER, payload: res.data });
    })
    .catch(err => { console.log('markAsAnswer CATCH ERROR: ', err.response.data.message) });
}
export const removeAnswer = (ticketID) => dispatch => {
    axiosWithAuth().post(`/tickets/${ticketID}/reopen`)
    .then(() =>{
        dispatch({ type: REMOVE_ANSWER, payload: null });
    })
    .catch(err => { console.log('removeAnswer CATCH ERROR: ', err.response.data.message) });
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
export const deletePicture = (type, parentID ,id) => dispatch => {
    // console.log('deletePic firing: ', type, id)
    if (type === 'open'){
        axiosWithAuth().delete(`/tickets/picture/open/${id}`)
        .then((res) =>{
            dispatch({ type: DELETE_PICTURE, payload: {type: type, parentID: parentID, id: id} });
        })
        .catch(err => { console.log('deleteOpenTicketPic CATCH ERROR: ', err.response.data.message) });
    }
    else if (type === 'resolved'){
        axiosWithAuth().delete(`/tickets/picture/resolved/${id}`)
        .then((res) =>{
            dispatch({ type: DELETE_PICTURE, payload: {type: type, parentID: parentID, id: id} });
        })
        .catch(err => { console.log('deleteResolveTicketPic CATCH ERROR: ', err.response.data.message) });
    }
    else if (type === 'comment'){
        axiosWithAuth().delete(`/tickets/comments/picture/${id}`)
        .then((res) =>{
            dispatch({ type: DELETE_PICTURE, payload: {type: type, parentID: parentID, id: id} });
        })
        .catch(err => { console.log('deleteCommentPic CATCH ERROR: ', err.response.data.message) });
    }
    else if (type === 'reply'){
        axiosWithAuth().delete(`/tickets/comments/replies/picture/${id}`)
        .then((res) =>{
            dispatch({ type: DELETE_PICTURE, payload: {type: type, parentID: parentID, id: id} });
        })
        .catch(err => { console.log('deleteReplyPic CATCH ERROR: ', err.response.data.message) });
    }
}
export const deleteVideo = (type, parentID ,id) => dispatch => {
    // console.log('deleteVid firing: ', type, parentID, id)
    if (type === 'open'){
        axiosWithAuth().delete(`/tickets/video/open/${id}`)
        .then((res) =>{
            dispatch({ type: DELETE_VIDEO, payload: {type: type, parentID: parentID, id: id} });
        })
        .catch(err => { console.log('deleteOpenTicketVid CATCH ERROR: ', err.response.data.message) });
    }
    else if (type === 'resolved'){
        axiosWithAuth().delete(`/tickets/video/resolved/${id}`)
        .then((res) =>{
            dispatch({ type: DELETE_VIDEO, payload: {type: type, parentID: parentID, id: id} });
        })
        .catch(err => { console.log('deleteResolveTicketVid CATCH ERROR: ', err.response.data.message) });
    }
    else if (type === 'comment'){
        axiosWithAuth().delete(`/tickets/comments/video/${id}`)
        .then((res) =>{
            dispatch({ type: DELETE_VIDEO, payload: {type: type, parentID: parentID, id: id} });
        })
        .catch(err => { console.log('deleteCommentVid CATCH ERROR: ', err.response.data.message) });
    }
    else if (type === 'reply'){
        axiosWithAuth().delete(`/tickets/comments/replies/video/${id}`)
        .then((res) =>{
            dispatch({ type: DELETE_VIDEO, payload: {type: type, parentID: parentID, id: id} });
        })
        .catch(err => { console.log('deleteReplyVid CATCH ERROR: ', err.response.data.message) });
    }
}