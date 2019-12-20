import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { setSearchTerm, setSearchType, setAskedAnsweredBoth, setOpenClosedAll } from '../../actions/SearchActions.js';
import { getCourses, selectCourse, selectUnit, selectWeek, selectDay } from '../../actions/CourseBuilderActions';
import unclaimed from '../../images/unclaimed.png'
import mine from '../../images/mine.png'
import closed from '../../images/closed.png'

function SidebarNav(props) {
    const [step,setStep] = useState(null)
    const [lambda,setLambda] = useState({
        weeks: null,
        days: null
    })
    // #region Local State
    // #endregion 

    // #region Console Logs
    console.log('SideBarNav props.courses: ', props.courses);
    console.log('SideBarNav props.selectedCourse: ', props.selectedCourse);
    console.log('SideBarNav props.units: ', props.units);
    // #endregion

    // #region Use Effects
    useEffect(() => {
        if (!props.courses){
            props.getCourses();
        }
            // props.selectCourse('Full Stack Web');
        // if(props.m)
    }, [props.courses])
    useEffect(() => {
        console.log('SideBarNav props.units: ', props.units);
    }, [props.units, props.courses])

    
    // #endregion

    // #region Local Funcs
    // #endregion


        // useEffect(()=>{
        //     if(props.weeks){
        //         setLambda({
        //             ...lambda,
        //             weeks: [...props.weeks]
        //         })
        //     }
        //     if(props.days){
        //         setLambda({
        //             ...lambda,
        //             days: [...props.days]
        //         })
        //     }},[props.units,props.weeks,props.days])

        // useEffect(()=>{
        //     if(lambda.weeks && lambda.days){

        //         if(props.daySelected){
        //             props.days.find(day => day)
        //             setLambda({...lambda, days: [props.daySelected]})
        //         }else if(!props.daySelected){
        //             setLambda({...lambda,days: [...props.days]})
        //         }
        //         if(props.weekSelected){
        //             setLambda({...lambda, week: [props.weekSelected]})
        //         }else if(!props.daySelected){
        //             setLambda({...lambda, week: [...props.weeks]})
        //         }
        //     }
        // },[props.daySelected,props.weekSelected])



    const handleChange = e => {
        props.setSearchTerm(e.target.value)
      };
    
    const clearSearchTerm = () => {
        props.setSearchTerm('');
    }

    const handleSelect = e => {
        props.setSearchType(e.target.value);
    }

    const handleAskedAnswered = () => {
        if (props.filterByAskedAnsweredBoth === 'All') {
            props.setAskedAnsweredBoth('Asked');
        }
        else if (props.filterByAskedAnsweredBoth === 'Asked') {
            props.setAskedAnsweredBoth('Answered');
        }
        else if (props.filterByAskedAnsweredBoth === 'Answered') {
            props.setAskedAnsweredBoth('All');
        }
    }

    const handleOpenClosed = () => {
        if (props.filterByOpenClosedAll === 'All') {
            props.setOpenClosedAll('Open');
        }
        else if (props.filterByOpenClosedAll === 'Open') {
            props.setOpenClosedAll('Resolved');
        }
        else if (props.filterByOpenClosedAll === 'Resolved') {
            props.setOpenClosedAll('All');
        }
    }
    // console.log(props)
    // console.log(lambda)
    const handleClickLambda = (e) => {
        e.preventDefault();
        setStep(1)
    }
    const history = useHistory()
    const handleClickCourse = (e) => {
        e.preventDefault()
        props.selectCourse(e.target.name);
        history.push('/Dashboard/Browse/Full%20Stack%20Web')
        setStep(2)
    }

    const handleClickUnit = (e) => {
        e.preventDefault()
        props.selectUnit(e.target.name);
        setStep(3)
        // history.push('/Dashboard/Browse/Full%20Stack%20Web&unit=1')
    }
    const handleClickWeek = (e) => {
        e.preventDefault()
        const theWeek = props.weeks.find((week)=> week.id != e.target.value)
        setLambda({...lambda, weeks: theWeek })
        props.selectWeek(e.target.name);
        setStep(4)
    }
    const handleClickDay = (e) => {
        e.preventDefault()
        const theDay = props.days.find((day)=>day.id !== e.target.value)
        setLambda({...lambda, days: theDay  })
        props.selectDay(e.target.name);

        setStep(5)
    }



    // const handleUnit = (e) => {
    //     // console.log(e.target.name, e.target.value)
    //     props.selectUnit(e.target.name);
    // }
    // const handleWeek = (e) => {
    //     // console.log(e.target.name, e.target.value)
    //     props.selectWeek(e.target.name);
    // }
    // const handleDay = (e) => {
    //     // console.log(e.target.name, e.target.value)
    //     props.selectDay(e.target.name);
    // }
    // console.log(props)

    function oneOrMore(){
        if(lambda.days){
            return (
                <div>
                    <img className="ml-4" src={closed} alt="Closed tickets" />
                    <NavLink key={lambda.days.id} name={lambda.days.number} className='navLink ml-4' exact to='/' value={lambda.days.id} onClick={handleClickDay}>{lambda.days.name}</NavLink>
                </div>
            )
        }else{
            props.days.map(day=>{ 
                return (
                    <div>
                        <img className="ml-4" src={closed} alt="Closed tickets" />
                        <NavLink key={day.id} name={day.number} className='navLink ml-4' exact to='/' value={day.id} onClick={handleClickDay}>{day.name}</NavLink>
                    </div>
                )})}
        }

        // console.log(lambda.weeks);
  
    function oneOrMoreWeek(){
        if(lambda.weeks){
            return (
                <div>
                    <img className="ml-4" src={closed} alt="Closed tickets" />
                    <NavLink key={lambda.weeks.id} name={lambda.weeks.number} className='navLink ml-3' exact to='/' value={lambda.weeks.id} onClick={handleClickWeek}>{lambda.weeks.name}</NavLink>
                </div>
            )
        }else{
            props.weeks.map(week=>{ 
                return (
                    <div>
                        <img className="ml-4" src={closed} alt="Closed tickets" />
                        <NavLink key={week.id} name={week.number} className='navLink ml-4' exact to='/' value={week.id} onClick={handleClickWeek}>{week.name}</NavLink>
                    </div>
                )})}
        }


    return (
        <div className='sidebarDiv'>
            <nav className='sidebarNav'>
            <div>
                <img src={unclaimed} alt="Unclaimed tickets" />
                <NavLink className='navLink' to='/Dashboard/OpenTickets'>Open</NavLink> 
            </div>
            <div>
                <img src={mine} alt="My tickets" />
                <NavLink className='navLink' to='/Dashboard/Mine'>Mine</NavLink>
            </div>
            <div>
                <img src={closed} alt="Closed tickets" />
                <NavLink className='navLink' to='/Dashboard/Resolved'>Resolved</NavLink>
            </div>
            
        {props.props.location.pathname === '/Dashboard/Browse/' &&
            <div>search links will only show when at Dashboard/Browse</div>
        }
            <div>
                <img src={closed} alt="Closed tickets" />
                <NavLink className='navLink' exact to='/Dashboard/Browse' >Browse</NavLink>
            </div>
            {(step >= 1) && 
                <div>
                    {props.courses && props.courses.map(course=>{ 
                        return (
                        <>
                        <img className="ml-1" src={closed} alt="Closed tickets" />
                        <NavLink key={course.id} name={course.name} className='navLink ml-1' to='/Dashboard/Query/FullStackWeb' onClick={handleClickCourse}>{course.name}</NavLink>
                        </>
                    )})}
                </div>
            }
            {(step >= 2) && 
                <div>
                    {/* link to selected course */}
                    {/* {props.units && props.units.map(unit=>{ 
                        return (       
                            <>
                            <img className="ml-2" src={closed} alt="Closed tickets" />
                            <NavLink key={unit.id} name={unit.number} className='navLink ml-2' exact to='/' onClick={handleClickUnit}>{unit.name}</NavLink>
                            </>
                        )})} */}
                </div>
            }
            {(step >= 3) && oneOrMoreWeek()
                // <>
                //     {/* link to selected unit */}
                //     {lambda.weeks && lambda.weeks.map(week=>{ 
                //         return (
                //             <div>
                //             <img className="ml-3" src={closed} alt="Closed tickets" />
                //             <NavLink key={week.id} name={week.number} className='navLink ml-3' value={week.id} exact to='/' onClick={handleClickWeek}>{week.name}</NavLink>
                //             </div>
                //         )})}
                // </>
            }
            {(step >= 4) && oneOrMore()
            }
            {/* {(step >= 5) && 
                oneOrMore()
            } */}
            
            {/* {props.courseSelected && props.course.units.map(unit => {
                    if (props.unitSelected && props.selectedUnit === unit.id){

                    }
                })//CourseSelected  */}
            {/* } */}

            </nav>

            
                
            <div className='filterToolsDiv'>
                {(()=>{ //immediately invoked function to allow javascript inside JSX. syntax: {(()=>{})()}
                        if(props.props.location.pathname === '/Dashboard/OpenTickets' | props.props.location.pathname === '/Dashboard/Mine' | props.props.location.pathname === '/Dashboard/Resolved')
                        {   //only if at any of the three above routes display filter tools.
                            return(
                                <>
                                    <p> Filter by:</p>
                                    <div className="select">
                                        {/* <label for="select-box"> */}
                                        <select id="select-box" onChange={handleSelect} name="searchBy">
                                            <option value="Category">Category</option>
                                            <option value="author">Author Name</option>
                                            {/* {props.props.location.pathname !== '/Dashboard/OpenTickets' && <option value="Helper">Helper Name</option>} */}
                                            <option value="Title">Title</option>
                                            <option value="Description">Description</option>
                                            {props.props.location.pathname !== '/Dashboard/OpenTickets' && <option value="Solution">Solution</option>}
                                        </select>
                                    </div>
                                    <input  className='searchBox' name="searchTerm" type="text" onChange={handleChange} value={props.searchTerm} placeholder="Filter" />
                                    <br />
                                    <button className="button" onClick={clearSearchTerm}>Clear</button>
                                    <br />
                                    {props.props.location.pathname === '/Dashboard/Mine' &&
                                        <>
                                        {/* <label> Asked/Answered:
                                        <button className="button" onClick={handleAskedAnswered}>{props.filterByAskedAnsweredBoth}</button>
                                        </label>
                                        <br /> */}
                                        <label> Status:
                                        <button className="button" onClick={handleOpenClosed}>{props.filterByOpenClosedAll}</button>
                                        </label>
                                        </>
                                    }
                                </>
                            );
                        }
                })()}
            </div>
        </div>  
    )
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        searchType: state.SearchReducer.searchType,
        searchTerm: state.SearchReducer.searchTerm,
        filterByAskedAnsweredBoth: state.SearchReducer.filterByAskedAnsweredBoth,
        filterByOpenClosedAll: state.SearchReducer.filterByOpenClosedAll,


        courseSelected: state.CourseBuilderReducer.courseSelected,
        unitSelected: state.CourseBuilderReducer.unitSelected,
        weekSelected: state.CourseBuilderReducer.weekSelected,
        daySelected: state.CourseBuilderReducer.daySelected,
        
        selectedCourse: state.CourseBuilderReducer.selectedCourse,
        selectedUnit: state.CourseBuilderReducer.selectedUnit,
        selectedWeek: state.CourseBuilderReducer.selectedWeek,
        selectedDay: state.CourseBuilderReducer.selectedDay,
  
        courses: state.CourseBuilderReducer.courses,
        units: state.CourseBuilderReducer.units,
        weeks: state.CourseBuilderReducer.weeks,
        days: state.CourseBuilderReducer.days,
        day: state.CourseBuilderReducer.day,
    }
  }

export default connect(mapStateToProps, { getCourses, selectCourse, selectUnit, selectWeek, selectDay, 
    setSearchTerm, setSearchType, setAskedAnsweredBoth, setOpenClosedAll })(SidebarNav)