import { SET_CURRENT_USER, LOADING_START, LOADING_DONE, LOGIN_FAILED, LOGOUT, } from '../actions/AppActions.js';

const initialState = {
    currentUser: '',
    loading: true,
    loginFailed: false,
  };


export const AppReducer = (state = initialState, action) => {
    console.log('AppReducer initialState: ', initialState);
    console.log('AppReducer firing: ', action);
    switch(action.type) {
        case LOADING_START:
            console.log('LOADING_START FIRING', state);
            return {
                ...state,
                loading: true,
            };
            case LOADING_DONE:
                console.log('LOADING_DONE FIRING', state);
                return {
                    ...state,
                    loading: false,
                };
        case SET_CURRENT_USER:
            console.log('SET_CURRENT_USER FIRING', state);
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
            };
        case LOGIN_FAILED:
            console.log('SET_CURRENT_USER FIRING', state);
            return {
                ...state,
                loading: false,
                loginFailed: true,
            };
        case LOGOUT: 
            return{
                ...state,
                currentUser: '',
            }
        default: //console.log('REDUCER DEFAULT'); 
        return state;
  }
}
