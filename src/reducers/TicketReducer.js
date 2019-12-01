import { LOADING_START, LOADING_DONE, ADD_COMMENT, ADD_REPLY, SET_TICKET, TOGGLE_COLLAPSE } from '../actions/TicketActions.js';

const initialState = {
    loading: true,
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
        console.log('LOADING_START FIRING', state);
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
            // console.log('SET_TICKET FIRING', action.payload);
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
        case TOGGLE_COLLAPSE:
          // console.log('TOGGLE_COLLAPSE FIRING', action.payload)
          let newComments = state.comments.map((comment)=>{
            // console.log('commentid: ', comment.id, 'payload: ', action.payload)
            if (comment.id == action.payload){
              return {...comment, collapsed: !comment.collapsed}
            }
            else{
              return comment
            }
          });
          return {
            ...state,
            comments: newComments,
          }
          case ADD_COMMENT:
            console.log('ADD_COMMENT FIRING', action.payload)
          return{
            ...state, 
            comments: [...state.comments, action.payload]
          }
          case ADD_REPLY:
            console.log('ADD_REPLY FIRING', action.payload)
            let newComments = state.comments.map((comment)=>{
              // console.log('commentid: ', comment.id, 'payload: ', action.payload)
              if (comment.id == action.payload.comment_id){
                return {...comment, comment_replies: [...comment.comment_replies, action.payload],}
              }
              else{
                return comment
              }
            });
          return{
            ...state, 
            comments: newComments,
          }
        default: //console.log('REDUCER DEFAULT'); 
        return state;
  }
}


