import { SET_CURRENT_USER, LOADING_START, LOADING_DONE, LOGIN_FAILED, LOGOUT, SET_OTHER_USER, SET_CURRENT_USER_PROFILE_PIC, SET_OTHER_USER_PROFILE_PIC,  } from '../actions/AppActions.js';

const initialState = {
    currentUser: '',
    otherUser: '',
    loading: true,
    loginFailed: false,
    usernameAvail: '',
  };


export const AppReducer = (state = initialState, action) => {
    // console.log('AppReducer initialState: ', initialState);
    // console.log('AppReducer firing: ', action);
    switch(action.type) {
        case LOADING_START:
            // console.log('LOADING_START FIRING', state);
            return {
                ...state,
                loading: true,
            };
            case LOADING_DONE:
                // console.log('LOADING_DONE FIRING', state);
                return {
                    ...state,
                    loading: false,
                };
        case SET_CURRENT_USER:
            console.log('SET_CURRENT_USER FIRING', state, action.payload);
            return {
                ...state,
                currentUser: {...state.currentUser, ...action.payload},
                loading: false,
            };
        case SET_OTHER_USER:
            // console.log('SET_OTHER_USER FIRING', state);
            return {
                ...state,
                otherUser: {...state.otherUser, ...action.payload},
                loading: false,
            };
        case SET_CURRENT_USER_PROFILE_PIC:
            // console.log('SET_CURRENT_USER_PROFILE_PIC FIRING', state);
            return {
                ...state,
                currentUser: {...state.currentUser, ...action.payload},
                loading: false,
            };
        case SET_OTHER_USER_PROFILE_PIC:
            // console.log('SET_OTHER_USER_PROFILE_PIC FIRING', state);
            return {
                ...state,
                otherUser: {...state.otherUser, ...action.payload},
                loading: false,
            };
        case LOGIN_FAILED:
            // console.log('SET_CURRENT_USER FIRING', state);
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
