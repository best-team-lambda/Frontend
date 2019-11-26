import axiosWithAuth from '../utils/axiosWithAuth.js';

export const LOADING_START = 'LOADING_START';
export const LOADING_DONE = 'LOADING_DONE';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_OTHER_USER = 'GET_OTHER_USER';
export const SET_OTHER_USER = 'GET_OTHER_USER';


export const loadingStart = () =>{
    return { type: LOADING_START, payload: null };
}
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
export const getOtherUser = () => dispatch => {
    dispatch({ type: LOADING_START, payload: null });
    // axiosWithAuth().get('/users/user')
    // .then(res =>{
    //     dispatch({ type: GET_OTHER_USER, payload: res.data })
    // })
    // .catch(err => {dispatch({ type: LOADING_DONE, payload: err }); console.log('GetOtherUser CATCH ERROR: ', err) });
    return null;
}
export const setOtherUser = () => dispatch => {
    dispatch({ type: LOADING_START, payload: null });
    // axiosWithAuth().get('/users/user')
    // .then(res =>{
    //     dispatch({ type: SET_OTHER_USER, payload: res.data })
    // })
    // .catch(err => {dispatch({ type: LOADING_DONE, payload: err }); console.log('SetOtherUser CATCH ERROR: ', err) });
    return null;
}
