import { combineReducers } from 'redux';
import { CourseBuilderReducer } from './CourseBuilderReducer.js';
import { AppReducer } from './AppReducer';

export default combineReducers({
    AppReducer,
    CourseBuilderReducer,
})