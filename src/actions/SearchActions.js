export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const SET_ASKED_ANSWERED = 'SET_ASKED_ANSWERED';
export const SET_OPEN_CLOSED = 'SET_OPEN_CLOSED';


export const setSearchTerm = (term) =>{
    return { type: SET_SEARCH_TERM, payload: term };
}
export const setSearchType = (term) =>{
    return { type: SET_SEARCH_TYPE, payload: term };
}

export const setAskedAnsweredBoth = (term) =>{
    return { type: SET_ASKED_ANSWERED, payload: term };
}

export const setOpenClosedAll = (term) =>{
    return { type: SET_OPEN_CLOSED, payload: term };
}