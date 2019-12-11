import { SET_SEARCH_TERM, SET_SEARCH_TYPE, SET_ASKED_ANSWERED, SET_OPEN_CLOSED } from "../actions/SearchActions";

// import { LOADING_START } from '../actions/AppActions.js';

const initialState = {
    searchType: 'Category',
    searchTerm: '',
    filterByAskedAnsweredBoth: 'All',
    filterByOpenClosedAll: 'All',
  };


export const SearchReducer = (state = initialState, action) => {
    // console.log('SearchReducer initialState: ', initialState);
    // console.log('SearchReducer firing: ', action);
    switch(action.type) {
        case SET_SEARCH_TERM: 
            return{
                ...state,
                searchTerm: action.payload,
            }
        case SET_SEARCH_TYPE:
            return{
                ...state,
                searchType: action.payload,
            }
        case SET_ASKED_ANSWERED:
            return{
                ...state,
                filterByAskedAnsweredBoth: action.payload,
            }
            case SET_OPEN_CLOSED:
                return{
                    ...state,
                    filterByOpenClosedAll: action.payload,
                }
        default: //console.log('REDUCER DEFAULT'); 
        return state;
  }
}