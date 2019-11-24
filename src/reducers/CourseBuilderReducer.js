import { FETCH_POKEMON_START, } from '../actions/CourseBuilderActions.js';

const initialState = {
    courseSelected: false,
    unitSelected: false,
    weekSelected: false,
    daySelected: false,
  };


export const CourseBuilderReducer = (state = initialState, action) => {
    //console.log('Reducer initialState: ', initialState);
    //console.log('reducer firing: ', action);
    switch(action.type) {
        case FETCH_POKEMON_START:
            //console.log('FETCH_POKEMON_START', state);
            return {
                ...state,
                isFetching: true,
                error: ''
            };
        default: //console.log('REDUCER DEFAULT'); 
        return state;
  }
}
