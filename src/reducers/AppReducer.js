import { SET_CURRENT_USER, LOADING_START, LOADING_DONE } from '../actions/AppActions.js';

const initialState = {
    currentUser: '',
    loading: false,
  };


export const AppReducer = (state = initialState, action) => {
    // console.log('Reducer initialState: ', initialState);
    // console.log('reducer firing: ', action);
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
        default: //console.log('REDUCER DEFAULT'); 
        return state;
  }
}
