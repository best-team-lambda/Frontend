import { LOADING_START, LOADING_DONE, ADD_COMMENT, SET_TICKET } from '../actions/TicketActions.js';

const initialState = {
    loading: false,
    ticket: '',
    comments: '',
    openPictures: [],
    resolvedPictures: [],
    openVideo: null,
    resolvedVideo: null,
  };


export const TicketReducer = (state = initialState, action) => {
    // console.log('TicketReducer initialState: ', initialState);
    // console.log('TicketReducer firing: ', action);
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
        case SET_TICKET:
            console.log('SET_TICKET FIRING', state);
            return {
                ...state,
                ticket: action.payload.ticket_details,
                comments: action.payload.ticket_comments,
                openPictures: action.payload.open_pictures,
                resolvedPictures: action.payload.resolved_pictures,
                openVideo: action.payload.open_video,
                resolvedVideo: action.payload.resolved_video,
                loading: false,
            };
        case ADD_COMMENT:
            console.log('ADD_COMMENT FIRING', state);
            return {
                ...state,
                loading: true,
            };
        default: //console.log('REDUCER DEFAULT'); 
        return state;
  }
}
