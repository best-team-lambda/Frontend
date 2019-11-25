import React from 'react'
import { connect } from 'react-redux';
import { selectCourse, selectUnit, selectWeek, selectDay } from '../actions/CourseBuilderActions.js';





function CourseBuilder(props) {
    const handleChange = (e) => {
        e.persist();
        // console.log(e);
        // console.log(e.target);
        // console.log('e.target.name :', e.target.name);
        // console.log(e.target.value);
        if (e.target.value === 'AddCourse')
        {
            
            // setSelectedCourse({...newVar[0]})
            // setUnits([...newVar[0].units]);
            return null;
        }
        else if (e.target.value && e.target.value !== 'default' && !props.courseSelected){
            console.log('o ya')
            props.selectCourse(e.target.value);
        }
        else if (e.target.value && e.target.value !== 'default' && !props.unitSelected){
            console.log('o yaaaa')
            props.selectUnit(e.target.value);
        }
        else if (e.target.value && e.target.value !== 'default' && !props.weekSelected){
            console.log('o yaaaa week')
            props.selectWeek(e.target.value);
        }
    }
    // const handleInput = e => {

    // }

    // const addThing = () => {

    // }

    // console.log('Props Course',props.courses)
    // console.log('Props courseSelected',props.courseSelected)
    // console.log('Props Units',props.units)
    // console.log('Props unitSelected',props.unitSelected)
    // console.log('Props Weeks',props.weeks)
    // console.log('Props weekSelected',props.weekSelected)
    // console.log('Props Days',props.days)
    // console.log('Props daySelected',props.daySelected)

    return (            
        <div className='filterToolsDiv'>
        {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
            return(
                <>
                    <p>CourseBuilder:</p>
{/* Start Dropdown Div */}
                    <div className="select">
{/* Start Course Select Dropdown */}
                        <select id="selectCoufghrse" onChange={handleChange} name="selectCourse">
                                <option default value='default'>Select Course</option>
                            {props.courses && props.courses.map(course => {
                                return (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                );
                            })}
                            <option value="AddCourse">Add Course</option>
                        </select>
{/* End Course Select Dropdown */}
{/* Start Unit Select Dropdown */}
                        {props.courseSelected && 
                        <select onChange={handleChange} name="selectUnit">
                            <option default value='default'>Select Unit</option>
                            {props.units && props.units.map(unit=>{
                            return <option key={unit.id} value={unit.id}>{unit.name}</option>
                            })}
                            <option value="AddUnit">Add Unit</option>
                        </select>
                        }
{/* End Unit Select Dropdown */}
{/* Start Week Select Dropdown */}
                        {props.unitSelected && 
                        <select onChange={handleChange} name="selectWeek">
                            <option default value='default'>Select Week</option>
                            {props.weeks && props.weeks.map(week=>{
                            return <option key={week.id} value={week.id}>{week.name}</option>
                            })}
                            <option value="AddWeek">Add Week</option>
                        </select>
                        }
{/* End Week Select Dropdown */}
{/* Start Day Select Dropdown */}
                        {props.weekSelected && 
                        <select onChange={handleChange} name="selectDay">
                            <option default value='default'>Select Day</option>
                            {props.days && props.days.map(day=>{
                            return <option key={day.id} value={day.id}>{day.name}</option>
                            })}
                            <option value="AddDay">Add Day</option>
                        </select>
                        }
{/* End Day Select Dropdown */}
                    </div>
{/* End Dropdown Div */}

                    {/* <input  className='searchBox' name="searchTerm" type="text" onChange={handleChange} placeholder="Filter" /> */}
                    <br />
                    {/* <button className="button" onClick={addThing}>Add</button>
                    <button className="button" onClick={()=>{console.log(selectedCourse);}}>log</button> */}
                    <br />
                </>
            );
        })()}
        </div>
    )
}

//test

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        courseSelected: state.CourseBuilderReducer.courseSelected,
        unitSelected: state.CourseBuilderReducer.unitSelected,
        weekSelected: state.CourseBuilderReducer.weekSelected,
        daySelected: state.CourseBuilderReducer.daySelected,
        
        selectedCourse: state.CourseBuilderReducer.selectedCourse,
        selectedUnit: state.CourseBuilderReducer.selectedUnit,
        selectedWeek: state.CourseBuilderReducer.selectedWeek,
        selectedDay: state.CourseBuilderReducer.selectingDay,

        courses: state.CourseBuilderReducer.courses,
        units: state.CourseBuilderReducer.units,
        weeks: state.CourseBuilderReducer.weeks,
        days: state.CourseBuilderReducer.days,
        day: state.CourseBuilderReducer.day,
    }
  }

export default connect(mapStateToProps, { selectCourse, selectUnit, selectWeek, selectDay })(CourseBuilder)