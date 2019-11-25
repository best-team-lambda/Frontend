// import axios from 'axios';

export const SELECT_COURSE = 'SELECT_COURSE';
export const SELECT_UNIT = 'SELECT_UNIT';
export const SELECT_WEEK = 'SELECT_WEEK';
export const SELECT_DAY = 'SELECT_DAY';



export const selectCourse = (courseID) => {
        return { type: SELECT_COURSE, payload: courseID };
}
export const selectUnit = (ID) => {
        return { type: SELECT_UNIT, payload: ID };
}
export const selectWeek = (ID) => {
        return { type: SELECT_WEEK, payload: ID };
}
export const selectDay = (ID) => {
        return { type: SELECT_DAY, payload: ID };
}