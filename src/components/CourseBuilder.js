import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';





function CourseBuilder(props) {
    const [courses, setCourses] = useState('');
    const [units, setUnits] = useState('');
    const [weeks, setWeeks] = useState('');
    const [days, setDays] = useState('');

    const [selectingCourse, setSelectingCourse] = useState(true);
    const [selectingUnit, setSelectingUnit] = useState(false);
    const [selectingWeek, setSelectingWeek] = useState(false);
    const [selectingDay, setSelectingDay] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [selectedDay, setSelectedDay] = useState('');



    useEffect(() => {
        setCourses(
            [{
                id: 100564, 
                name: 'FSW', 
                units: 
                    [
                        {
                            id: 1231231,
                            name: 'abc',
                            weeks: 
                            [
                                {
                                    id: 122311, 
                                    name: 'abc', 
                                    Days: [
                                        {
                                            id: 221,
                                            name: 'monday'
                                        },
                                        {
                                            id: 222,
                                            name: 'tuesday'
                                        },
                                        {
                                            id: 223,
                                            name: 'wednesday'
                                        },
                                        {
                                            id: 224,
                                            name: 'thursday'
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
            }]);
    }, [])

    const handleChange = () => {

    }
    const handleSelect = (e) => {
        e.persist();
        console.log(e);
        console.log(e.target);
        console.log('e.target.name :', e.target.name);
        console.log(e.target.value);
        if (!selectedCourse && e.target.name === 'selectCourse' && e.target.value != 'AddCourse')
        {
            const newVar = 
                courses.filter(course => {
                console.log(course.id, e.target.value)
                return course.id == e.target.value;
                })
                console.log('course: ', newVar[0]);
                console.log('course.units: ', newVar[0].units);
            setSelectedCourse({...newVar[0]})
            setUnits([...newVar[0].units]);
            return null;
        }
        else {
            setSelectedCourse('');
        }
        if (selectedCourse && e.target.name === 'selectUnit' && e.target.value != 'AddUnit')
        {
            console.log(e.target.name)
            console.log('units: ', units);
            const newVar = 
                units.filter(unit => {
                console.log(unit.id, e.target.value)
                return unit.id == e.target.value;
                })
                console.log('unit: ', newVar);
            setSelectedUnit({...newVar[0]})
            setWeeks([...newVar[0].weeks]);
            return null;
        }
        else {
            setSelectedUnit('');
        }
        console.log(e.target.name);
        if (selectedUnit && e.target.name === 'selectWeek' && e.target.value != 'AddUnit')
        {
            console.log(e.target.name)
            const newVar = 
                units.filter(unit => {
                console.log(unit.id, e.target.value)
                return unit.id == e.target.value;
                })
                console.log('unit: ', newVar);
            setSelectedWeek({...newVar[0]})
            setWeeks([...newVar[0].weeks]);
            return null;
        }
        else {
            setSelectedWeek('');
        }
    }
    const addThing = () => {

    }

    return (            
        <div className='filterToolsDiv'>
        {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
            return(
                <>
                    <p>CourseBuilder:</p>
                    <div className="select">
                        <select id="selectCoufghrse" onChange={handleSelect} name="selectCourse">
                                <option default>Select Course</option>
                            {courses && courses.map(course => {
                                return (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                );
                            })}
                            <option value="AddCourse">Add Course</option>
                        </select>
                        {selectedCourse != '' && selectedCourse != 'AddCourse' && 
                        <>
                            <select id="selechfghtedUnit" onChange={handleSelect} name="selectUnit">
                                {units && units.map(unit => {
                                    console.log(selectedUnit)
                                    return (
                                        <option key={unit.id} value={unit.id}>{unit.name}</option>
                                    );
                                })}
                                <option value="AddUnit">Add Unit</option>
                            </select>
                            </>
                        } 
                        {selectedUnit != '' && selectedUnit != 'AddUnit' &&
                        <>
                            <select id="selectegfhdWeek" onChange={handleSelect} name="selectWeek">
                            {weeks && weeks.map(week => {
                                console.log('weekselect', selectedUnit)
                                console.log('weekselect')
                                return (
                                    <option key={week.id} value={week.id}>{week.name}</option>
                                );
                            })}
                            <option value="AddWeek">Add Week</option>
                            </select>
                            </>
                        } 

                        {selectedWeek != '' && selectedWeek != 'AddWeek' &&
                            <select id="selectedUnit" onChange={handleSelect} name="selectDay">
                            <option default>Select Day</option>
                            {days && days.map(day => {
                                return (
                                    <option key={day.id} value={day.id}>{day.name}</option>
                                );
                            })}
                            <option value="AddDay">Add Day</option>
                            </select>
                        }












                    </div>
                    <input  className='searchBox' name="searchTerm" type="text" onChange={handleChange} placeholder="Filter" />
                    <br />
                    <button className="button" onClick={addThing}>Add</button>
                    <button className="button" onClick={()=>{console.log(selectedCourse);}}>log</button>
                    <br />
                </>
            );
        })()}
</div>
    )
}

const mapStateToProps = state => {
    //console.log('mapstatetoprops: ', state);
    return {
        courseSelected: state.courseSelected,
        unitSelected: state.unitSelected,
        weekSelected: state.weekSelected,
        daySelected: state.daySelected,
    }
  }

export default connect(mapStateToProps, {  })(CourseBuilder)