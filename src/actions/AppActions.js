import axiosWithAuth from '../utils/axiosWithAuth.js';

export const SET_CURRENT_USER = 'GET_CURRENT_USER';
export const LOADING_START = 'LOADING_START';
export const LOADING_DONE = 'LOADING_DONE';


export const getCurrentUser = () => dispatch => {
    dispatch({ type: LOADING_START, payload: null });
    axiosWithAuth().get('/users/user')
    .then(res =>{
        dispatch({ type: SET_CURRENT_USER, payload: res.data })
    })
    .catch(err => {dispatch({ type: LOADING_DONE, payload: err }); console.log('GetCurrentUser CATCH ERROR: ', err) });
    return null;
}
