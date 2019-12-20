import axiosWithAuth from '../utils/axiosWithAuth.js';

export const SET_COURSES = 'SET_COURSES';
export const SELECT_COURSE = 'SELECT_COURSE';
export const SELECT_UNIT = 'SELECT_UNIT';
export const SELECT_WEEK = 'SELECT_WEEK';
export const SELECT_DAY = 'SELECT_DAY';

// export const CLEAR_COURSE = 'CLEAR_COURSE';
// export const CLEAR_UNIT = 'CLEAR_UNIT';
// export const CLEAR_WEEK = 'CLEAR_WEEK';
// export const CLEAR_DAY = 'CLEAR_DAY';


export const getCourses = () => dispatch => {
        axiosWithAuth()
          .get(`/courses`)
          .then(res => {
                // console.log(res.data);
                dispatch({ type: SET_COURSES, payload: res.data });
          })
          .catch(err => {
            console.log("CATCH ERROR: ", err);
          });
    }
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
