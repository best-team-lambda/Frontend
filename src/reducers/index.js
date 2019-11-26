import { combineReducers } from 'redux';
import { AppReducer } from './AppReducer';
import { CourseBuilderReducer } from './CourseBuilderReducer.js';
import { TicketReducer } from './TicketReducer';

export default combineReducers({
    AppReducer,
    CourseBuilderReducer,
    TicketReducer,
})