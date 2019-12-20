import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileVideo, faImages} from "@fortawesome/free-solid-svg-icons";
import LoadingOverlay from "react-loading-overlay";
import { getCourses, selectCourse, selectUnit, selectWeek, selectDay } from '../../actions/CourseBuilderActions.js';

//custom hook
const useInput = initialState => {
    const [value, setValue] = useState(initialState);

    const handleChange = updatedValue => {
        setValue(updatedValue);
    }

    return [value, setValue, handleChange];
}

function CreateTicket(props) {
    const [loading, setLoading] = useState('');
    const [images, setImages] = useInput([]);
    const [video, setVideo] = useInput(null);
    const [category, handleCategory] = useInput('');
    const [title, handleTitle] = useInput('');
    const [description, handleDescription] = useInput('');


    useEffect(() => {
        props.getCourses();
    }, [])

    useEffect(()=>{
        const dayOption = document.querySelector('#selectDay')
        if(dayOption && dayOption.value){
            dayOption.value = 'default'
            props.selectDay('default')
        }
    },[props.selectedWeek])

    // console.log(props)
    
    const handleCourse = (e) => {
        // console.log(e.target.name, e.target.value)
        props.selectCourse(e.target.value);
    }
    const handleUnit = (e) => {
        // console.log(e.target.name, e.target.value)
        props.selectUnit(e.target.value);
    }
    const handleWeek = (e) => {
        // console.log(e.target.name, e.target.value)
        props.selectWeek(e.target.value);
    }
    const handleDay = (e) => {
        // console.log(e.target.name, e.target.value)
        props.selectDay(e.target.value);
    }

    const handleSubmit = async e => {
        // console.log(Array.from(images));
        e.preventDefault();
        let queryObj = {};
        if (props.courseSelected){
            queryObj = {...queryObj, course: props.selectedCourse}
        }
        if (props.unitSelected){
            queryObj = {...queryObj, unit: props.selectedUnit}
        }
        if (props.weekSelected){
            queryObj = {...queryObj, week: props.selectedWeek}
        }
        if (props.daySelected){
            queryObj = {...queryObj, day: props.selectedDay}
        }
        // console.log('queryobj: ', queryObj)

        const imagesData = new FormData();
        const ticketDetails = {category, title, description, ...queryObj};
        // console.log(ticketDetails);
        if(images.length){
            for(let i = 1; i <= images.length; i++) {
                imagesData.append('image' + i, images[i-1]);
            }
        }
        
        try{
        setLoading(true);
        const ticket = await axiosWithAuth().post('/tickets', ticketDetails);
    
        if(images){
          const urls  = await axiosWithAuth().post(`/tickets/${ticket.data.id}/pictures/open`, imagesData);
        //   console.log(urls);
        }

        if(video){
          const videoData = new FormData();
          videoData.append('video', video);
          const url  = await axiosWithAuth().post(`/tickets/${ticket.data.id}/video/open`, videoData);
        //   console.log(url);  
        }
        setLoading(false);
        // console.log(ticket.data.id);
        props.history.push(`/Dashboard/Tickets/${ticket.data.id}`);
        }catch(err){
            setLoading(false);
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }
    }


    // console.log('Props Course',props.courses)
    // console.log('Props courseSelected',props.courseSelected)
    // console.log('Props Units',props.units)
    // console.log('Props unitSelected',props.unitSelected)
    // console.log('Props Weeks',props.weeks)
    // console.log('Props weekSelected',props.weekSelected)
    // console.log('Props Days',props.days)
    // console.log('Props daySelected',props.daySelected)
    // console.log('Props Day',props.day)
    // console.log('Props daySelected',props.selectedDay)

    return (
        <OuterDiv>
            <Div>
    <StyledLoader active={loading} spinner text='Uploading...'>
                <Create> Create a Ticket</Create>
                <Form onSubmit={handleSubmit}>
                <MarginDiv>
                    <InputDiv><input className='text-input' placeholder='Category' onChange={e => handleCategory(e.target.value)} type='text' required/></InputDiv>
                </MarginDiv>
                <MarginDiv>
                    <InputDiv> <input className='text-input' placeholder='Title' onChange={e => handleTitle(e.target.value)} type='text' required/></InputDiv>
                </MarginDiv>
                    <InputDiv> <textarea className='text-input' placeholder='Description' onChange={e => handleDescription(e.target.value)} required/></InputDiv>

{/* Dropdown Day Picker */}
                    <DayPicker className="select">
                        <Select className="text-input" id="selectCourse" onChange={handleCourse} name="selectCourse">
                            <Option default selected value='default'>Select Course</Option>
                            {props.courses && props.courses.map(course => {
                                return <Option key={course.id} value={course.id}>{course.name}</Option> })}
                        </Select>
                        {props.courseSelected && 
                        <Select className="text-input" onChange={handleUnit} name="selectUnit">
                            <Option default selected value='default'>Select Unit</Option>
                            {props.units && props.units.map(unit=>{
                            return <Option key={unit.id} value={unit.number}>{unit.name}</Option> })}
                        </Select>}
                        {props.unitSelected && 
                        <Select className="text-input" onChange={handleWeek} name="selectWeek" id="weekID">
                            <Option default selected value='default'>Select Week</Option>
                            {props.weeks && props.weeks.map(week=>{
                            return <Option key={week.id} value={week.number}>{week.name}</Option> })}
                        </Select>}
                        {props.weekSelected && 
                        <Select id='selectDay' className="text-input" onChange={handleDay} name="selectDay">
                            <Option selected default value='default' >Select Day</Option>
                            {props.days && props.days.map(day=>{
                            return <Option key={day.id} value={day.number}>{day.name}</Option> })}
                        </Select>}
                    </DayPicker>
{/* End Dropdown Div */}
                    
                    <FileInput id='imageInput' className='input' type='file' accept={props.imageFileTypes} onChange={e => setImages(e.target.files)} multiple/>
                    <FileInput id='videoInput' className='input' type='file' accept={props.videoFileTypes} onChange={e => setVideo(e.target.files[0])}/>
                    <Media>
                        <label style={{cursor: 'pointer'}} htmlFor='imageInput'>
                            <FileDiv>
                                <Fa icon={faImages}/><p>Add images</p>
                            </FileDiv>
                        </label>
                        {images && Array.from(images).map(image => <p key={image.name}>{image.name}</p>)}
                        <label style={{cursor: 'pointer'}} htmlFor='videoInput'>
                            <FileDiv>
                                <Fa icon={faFileVideo}/><p>Add a video</p>
                            </FileDiv>
                        </label>
                    </Media>
                    {video && <p>{video.name}</p>}
                <MarginDiv>
                    <Button className='input' type='submit'>Submit</Button>
                </MarginDiv>
                </Form>
    </StyledLoader>
            </Div>
        </OuterDiv>
    )
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
      imageFileTypes: state.AppReducer.imageFileTypes,
      videoFileTypes: state.AppReducer.videoFileTypes,

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

export default connect(mapStateToProps, { getCourses, selectCourse, selectUnit, selectWeek, selectDay })(CreateTicket)

// #region styled components
const StyledLoader = styled(LoadingOverlay)`
    width:100%;
    z-index: 2;
`;

const OuterDiv = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #383651;
    justify-content: center;
`

const Div = styled.div `
    width: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 3rem;
`
const InputDiv = styled.div `
    width: 100%
    display: flex;
    justify-content: space-around;
    
`
const FileInput = styled.input `
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 1px;
`

const Form = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;

    .input {
        max-width: 300px;
    }
`
const Button = styled.button `
    font-size: 1.8rem;
    background-color: #BF0033;
    color: white;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    padding: 1rem 2.5rem;
    text-decoration: none;
    font-weight: @bold-font-weight;
    transition: 0.3s;
    border: 0;

    &:hover {
        background-color: #880C23;
    }
`
const MarginDiv = styled.div `
    margin-bottom: 10px;
`
const Fa = styled(FontAwesomeIcon)`
    width: 60px !important;
    height: 60px;

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }
`

const FileDiv = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
`
const Create = styled.h1`
text-align: center;
`

const Media = styled.div`
display: flex;
width: 60%;
justify-content: space-evenly;
align-items: center;
margin: 2% 0 2% 0;


`
const DayPicker = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2%;

`

const Select = styled.select `
    color: #333
    height: 5vh;
    margin-bottom: 1rem;
`
const Option = styled.option `

`
// #endregion