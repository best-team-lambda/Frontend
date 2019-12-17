import { LOADING_START, LOADING_DONE, ADD_COMMENT, ADD_REPLY, SET_TICKET, TOGGLE_COLLAPSE, UPDATE_COMMENT, COLLAPSE_ALL, 
  EXPAND_ALL, MARK_ANSWER, REMOVE_ANSWER, DELETE_COMMENT, UPDATE_REPLY, DELETE_REPLY, UPDATE_TICKET, WIPE_TICKET, DELETE_PICTURE } from '../actions/TicketActions.js';

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
        case UPDATE_TICKET:
          // console.log('UPDATE_COMMENT FIRING', action.payload)
        return{
          ...state, 
          ticket: {...state.ticket, category: action.payload.category, title: action.payload.title, description: action.payload.description },
        }
        case WIPE_TICKET: 
          // console.log('WIPE_TICKET FIRING', state, action.payload);
          return{
              ...state,
              ticket: '',
          }
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
          case COLLAPSE_ALL:
            // console.log('COLLAPSE_ALL FIRING', action.payload)
            let collapsed = state.comments.map((comment)=>{
              // console.log('commentid: ', comment.id, 'payload: ', action.payload)
                return {...comment, collapsed: true}
            });
            return {
              ...state,
              comments: collapsed,
            }
          case EXPAND_ALL:
            // console.log('EXPAND_ALL FIRING', action.payload)
            let expanded = state.comments.map((comment)=>{
              // console.log('commentid: ', comment.id, 'payload: ', action.payload)
                return {...comment, collapsed: false}
            });
            return {
              ...state,
              comments: expanded,
            }
          case ADD_COMMENT:
            // console.log('ADD_COMMENT FIRING', action.payload)
          return{
            ...state, 
            comments: [...state.comments, action.payload]
          }
          case UPDATE_COMMENT:
            // console.log('UPDATE_COMMENT FIRING', action.payload)
            let updatedComment = state.comments.map((comment)=>{
              // console.log('commentid: ', comment.id, 'payloadid: ', action.payload.id)
              if (comment.id == action.payload.id){
                // console.log('REPLACING- OLD, NEW', comment, action.payload)
                return {...action.payload};
              }
              else{
                return comment
              }
            });
            // console.log('updated comments: ', updatedComment);
          return{
            ...state, 
            comments: [...updatedComment]
          }
          case DELETE_COMMENT:
            // console.log('DELETE_COMMENT FIRING', action.payload)
            let deletedCommentRemoved = state.comments.filter((comment)=>{
              // console.log('commentid: ', comment.id, 'payload: ', action.payload)
              if (comment.id != action.payload){
                return comment
              }
            });
          return{
            ...state, 
            comments: [...deletedCommentRemoved],
          }
          case ADD_REPLY:
            // console.log('ADD_REPLY FIRING', action.payload)
            let addedReply = state.comments.map((comment)=>{
              // console.log('commentid: ', comment.id, 'payload: ', action.payload)
              if (comment.id == action.payload.comment_id){
                return {...comment, comment_replies: [...comment.comment_replies, action.payload],}
              }
              else{
                return comment
              }
            });
            // console.log('addedReply: ', addedReply);
          return{
            ...state, 
            comments: [...addedReply],
          }
          case UPDATE_REPLY:
            // console.log('UPDATE_REPLY FIRING', action.payload)
            let updatedReply = state.comments.map((comment)=>{
              // console.log('commentid: ', comment.id, 'payload: ', action.payload)
              if (comment.id == action.payload.comment_id){
                return {...comment, 
                  comment_replies: comment.comment_replies.map((reply)=>{
                    if (reply.id == action.payload.id){
                      return action.payload;
                    }
                    else {
                      return reply;
                    }
                  })
                }  
              }
              else{
                return comment
              }
            });
            // console.log('updatedReply: ', updatedReply);
          return{
            ...state, 
            comments: [...updatedReply],
          }
          case DELETE_REPLY:
            // console.log('DELETE_REPLY FIRING', action.payload) 
            let deletedReplyRemoved = state.comments.map((comment)=>{
              // console.log('commentid: ', comment.id, 'payload: ', action.payload)
              let newReplies = [];
              if (comment.comment_replies){
                newReplies = comment.comment_replies.filter((reply)=>{
                  return reply.id != action.payload;
                  }
                )
                // console.log('newReplies', newReplies);
              }
              return {...comment, comment_replies: [...newReplies]};
            });
            // console.log('deletedpreplyremoved: ', deletedReplyRemoved)
          return{
            ...state, 
            comments: [...deletedReplyRemoved],
          }
          case MARK_ANSWER:
              // console.log('MARK_ANSWER FIRING', action.payload)
          return{
            ...state,
            ticket: {...state.ticket, status: 'resolved', resolved_at: action.payload.resolved_at, 
            solution: action.payload.solution, solution_comment_id: action.payload.solution_comment_id, solution_reply_id: action.payload.solution_reply_id,
           }
          }
          case REMOVE_ANSWER:
              console.log('REMOVE_ANSWER FIRING', action.payload)
          return{
            ...state,
            ticket: {...state.ticket, solution: '', status: 'open'}
          }
          case DELETE_PICTURE:
            // console.log('DELETE_PICTURE FIRING', action.payload)
            let newArray;
            let newPicArray;
            if (action.payload.type === 'open'){
              newPicArray = state.openPictures.filter(picture => {
                if (picture.id !== action.payload.id){
                  return picture;
                }
              })
              return{
                ...state,
                openPictures: [...newPicArray],
              }
            }
            else if (action.payload.type === 'resolved'){
              console.log('delete_pic resolved is not currently implemented');
            }
            else if (action.payload.type === 'comment'){
              newArray = state.comments.map(comment => {
                if (comment.id === action.payload.parentID){
                  let newPicArray = comment.comment_pictures.filter(picture => {
                    if (picture.id !== action.payload.id){
                      return picture;
                    }
                  })
                  return {...comment, comment_pictures: [...newPicArray] }
                }
                else {
                  return comment;
                }
              })  
              return{
                ...state,
                comments: [...newArray],
              }
            }
            else if (action.payload.type === 'reply'){
              newArray = state.comments.map(comment => {
                let newReplies = comment.comment_replies.map(reply => {
                  if (reply.id === action.payload.parentID){
                    newPicArray = reply.reply_pictures.filter(picture => {
                      if (picture.id !== action.payload.id){
                        return picture;
                      }
                    })
                    return {...reply, reply_pictures: [...newPicArray] }
                  }
                  else {
                    return reply;
                  }
                })
                return {...comment, comment_replies: [...newReplies]}
              }) 
              return{
                ...state,
                comments: [...newArray],
              }
            }
            console.log('DELETE_PICTURE error: Default return reached');
            return{
              ...state,
            }
        default: 
        console.log('REDUCER DEFAULT- how did you get here?'); 
        return state;
  }
}


