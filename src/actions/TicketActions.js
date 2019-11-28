import axiosWithAuth from '../utils/axiosWithAuth.js';

export const LOADING_START = 'LOADING_START';
export const LOADING_DONE = 'LOADING_DONE';
export const SET_TICKET = 'SET_TICKET';
export const ADD_COMMENT = 'ADD_COMMENT';
// export const LOGIN_FAILED = 'LOGIN_FAILED';
// export const LOGOUT = 'LOGOUT';
// export const SET_CURRENT_USER = 'SET_CURRENT_USER';
// export const SET_OTHER_USER = 'GET_OTHER_USER';


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
        console.log('GetTicket Res', res.data);
        console.log('GetTicket TicketDetails:', res.data.ticket_details);
        console.log('GetTicket Comments:', res.data.ticket_comments);
        dispatch({ type: SET_TICKET, payload: res.data });
      })
      .catch(err => {
        console.log("CATCH ERROR: ", err.response.data.message, '');
        dispatch({ type: LOADING_DONE, payload: null });
        alert(err.response.data.message);
        props.history.push('/Dashboard/Unassigned');
      });
}

// Add/delete comment:
// Post /api/tickets/:id/comments  send comment text in object as {description}
// Delete /api/tickets/comments/:id
export const addComment = (id, comment) =>{
    axiosWithAuth().post(`/api/tickets/${id}/comments`, comment)
    .then(res =>{
        
    })
    .catch(err => { console.log('addComment CATCH ERROR: ', err) });
}

export const deleteComment = () =>{
    // return { type: LOADING_START, payload: null };
}

// export const login = (user) => {
//     return { type: SET_CURRENT_USER, payload: user };
// }
// export const logout = () =>{
//     return { type: LOGOUT, payload: null };
// }
// export const getCurrentUser = () => dispatch => {
//     dispatch({ type: LOADING_START, payload: null });
//     axiosWithAuth().get('/users/user')
//     .then(res =>{
//         dispatch({ type: SET_CURRENT_USER, payload: res.data })
//     })
//     .catch(err => {dispatch({ type: LOGIN_FAILED, payload: err }); console.log('GetCurrentUser CATCH ERROR: ', err) });
//     return null;
// }
// export const getOtherUser = (id) => dispatch => {
//     axiosWithAuth().get(`/users/${id}`)
//     .then(res =>{
//         dispatch({ type: SET_OTHER_USER, payload: res.data })
//     })
//     .catch(err => {dispatch({ type: LOADING_DONE, payload: err }); console.log('GetOtherUser CATCH ERROR: ', err) });
//     return null;
// }
