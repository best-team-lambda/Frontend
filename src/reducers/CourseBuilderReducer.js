import { SELECT_COURSE, SELECT_UNIT, SELECT_WEEK, SELECT_DAY } from '../actions/CourseBuilderActions.js';

const initialState = {
    courseSelected: false,
    unitSelected: false,
    weekSelected: false,
    daySelected: false,
    
    selectedCourse: '',
    selectedUnit: '',
    selectedWeek: '',
    selectedDay: '',

    courses: [
        {
        id: 1, 
        name: 'Full Stack Web Development', 
        units: 
            [
                {
                    id: 1231231,
                    name: 'Unit 1: Web Fundamentals',
                    weeks: 
                    [
                        {
                            id: 122311, 
                            name: 'Week 1: User Interface and Git', 
                            Days: [
                                {
                                    id: 221,
                                    name: 'User Interface 1'
                                },
                                {
                                    id: 222,
                                    name: 'Git for Web Development'
                                },
                                {
                                    id: 223,
                                    name: 'User Interface 2'
                                },
                                {
                                    id: 224,
                                    name: 'User Interface 3'
                                },
                            ] 
                        },
                        {
                            id: 231231231, 
                            name: 'week 3', 
                            Days: [
                                {
                                    id: 331,
                                    name: 'monday'
                                },
                                {
                                    id: 332,
                                    name: 'tuesday'
                                },
                                {
                                    id: 333,
                                    name: 'wednesday'
                                },
                                {
                                    id: 334,
                                    name: 'thursday'
                                },
                            ] 
                        },
                    ]
                },
                {
                    id: 323213212,
                    name: 'dacf',
                    weeks: 
                    [
                        
                        {
                            id: 1223311, 
                            name: 'abac', 
                            Days: [
                                {
                                    id: 2321,
                                    name: 'monday'
                                },
                                {
                                    id: 2232,
                                    name: 'tuesday'
                                },
                                {
                                    id: 2233,
                                    name: 'wednesday'
                                },
                                {
                                    id: 2234,
                                    name: 'thursday'
                                },
                            ] 
                        },
                        {
                            id: 23133231231, 
                            name: 'week 3', 
                            Days: [
                                {
                                    id: 3331,
                                    name: 'monday'
                                },
                                {
                                    id: 3332,
                                    name: 'tuesday'
                                },
                                {
                                    id: 3333,
                                    name: 'wednesday'
                                },
                                {
                                    id: 3334,
                                    name: 'thursday'
                                },
                            ] 
                        },
                    ]
                },
            ]
        }
    ],
    units: '',
    weeks: '',
    days: '',
    day: '',
  };


export const CourseBuilderReducer = (state = initialState, action) => {
    // console.log('CourseBuilderReducer initialState: ', initialState);
    // console.log('CourseBuilderReducer firing: ', action);
    switch(action.type) {
        case SELECT_COURSE:
            console.log('SELECT_COURSE FIRING', state);
            console.log('Payload: ', action.payload);
            let pickedCourse = state.courses.find(course => {
                console.log(course.id);
                console.log(action.payload);
                return course.id === action.payload;
            })
            console.log('pickedCourse', pickedCourse);
            return {
                ...state,
                courseSelected: true,
                selectedCourse: action.payload,
                units: [...pickedCourse.units]
            };
            case SELECT_UNIT:
                console.log('SELECT_UNIT FIRING', state);
                console.log('Payload: ', action.payload);
                let pickedUnit = state.units.find(unit => {
                    console.log(unit.id);
                    console.log(action.payload);
                    return unit.id === action.payload;
                })
                console.log('pickedUnit', pickedUnit);
                return {
                    ...state,
                    unitSelected: true,
                    selectedUnit: action.payload,
                    weeks: [...pickedUnit.weeks]
                };
            case SELECT_WEEK:
                console.log('SELECT_WEEK FIRING', state);
                console.log('Payload: ', action.payload);
                let pickedWeek = state.weeks.find(week => {
                    console.log(week.id);
                    console.log(action.payload);
                    return week.id === action.payload;
                })
                console.log('pickedWeek', pickedWeek);
                return {
                    ...state,
                    weekSelected: true,
                    selectedWeek: action.payload,
                    days: [...pickedWeek.Days]
                };
            case SELECT_DAY:
                console.log('SELECT_DAY FIRING', state);
                console.log('Payload: ', action.payload);
                let pickedDay = state.days.find(day => {
                    console.log(day.id);
                    console.log(action.payload);
                    return day.id === action.payload;
                })
                console.log('pickedDay', pickedDay);
                return {
                    ...state,
                    DaySelected: true,
                    selectedDay: action.payload,
                    day: pickedDay,
                };
        default: //console.log('REDUCER DEFAULT'); 
        return state;
  }
}
