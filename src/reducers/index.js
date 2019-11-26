import { combineReducers } from 'redux';
import { AppReducer } from './AppReducer';
import { CourseBuilderReducer } from './CourseBuilderReducer.js';
import { SearchReducer } from './SearchReducer.js';
import { TicketReducer } from './TicketReducer';

export default combineReducers({
    AppReducer,
    CourseBuilderReducer,
    SearchReducer,
    TicketReducer,
})