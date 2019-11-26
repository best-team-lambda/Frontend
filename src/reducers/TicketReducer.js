// import { LOADING_START } from '../actions/AppActions.js';

const initialState = {

  };


export const TicketReducer = (state = initialState, action) => {
    // console.log('TicketReducer initialState: ', initialState);
    // console.log('TicketReducer firing: ', action);
    switch(action.type) {
        // case LOADING_START:
        //     console.log('LOADING_START FIRING', state);
        //     return {
        //         ...state,
        //         loading: true,
        //     };
        default: //console.log('REDUCER DEFAULT'); 
        return state;
  }
}
