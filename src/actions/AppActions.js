import axiosWithAuth from '../utils/axiosWithAuth.js';

export const LOADING_START = 'LOADING_START';
export const LOADING_DONE = 'LOADING_DONE';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_OTHER_USER = 'GET_OTHER_USER';


// export const loadingStart = () =>{
//     return { type: LOADING_START, payload: null };
// }
export const loadingDone = () =>{
    return { type: LOADING_DONE, payload: null };
}
export const login = (user) => {
    return { type: SET_CURRENT_USER, payload: user };
}
export const logout = () =>{
    return { type: LOGOUT, payload: null };
}
export const getCurrentUser = () => dispatch => {
    dispatch({ type: LOADING_START, payload: null });
    axiosWithAuth().get('/users/user')
    .then(res =>{
        dispatch({ type: SET_CURRENT_USER, payload: res.data })
    })
    .catch(err => {dispatch({ type: LOGIN_FAILED, payload: err }); console.log('GetCurrentUser CATCH ERROR: ', err) });
    return null;
}
export const getOtherUser = (id) => dispatch => {
    axiosWithAuth().get(`/users/${id}`)
    .then(res =>{
        dispatch({ type: SET_OTHER_USER, payload: res.data })
    })
    .catch(err => {dispatch({ type: LOADING_DONE, payload: err }); console.log('GetOtherUser CATCH ERROR: ', err) });
    return null;
}
export const updateUser = (id, userObj) => dispatch => {
    axiosWithAuth().put(`/users/user`, userObj)
    .then(res =>{
        console.log(res);
        dispatch({ type: SET_CURRENT_USER, payload: res.data })
    })
    .catch(err => console.log('updateUser CATCH ERROR: ', err) );
    return null;
}
export const adminUpdateUser = (id, userObj) => dispatch => {
    axiosWithAuth().put(`/admin/users/${id}`, userObj)
    .then(res =>{
        console.log(res);
        dispatch({ type: SET_OTHER_USER, payload: res.data })
    })
    .catch(err => console.log('adminUpdateUser CATCH ERROR: ', err.response.data.message) );
    return null;
}
