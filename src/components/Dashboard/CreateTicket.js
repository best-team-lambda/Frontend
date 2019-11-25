import React, {useState} from 'react'
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileVideo, faImages} from "@fortawesome/free-solid-svg-icons";
import LoadingOverlay from "react-loading-overlay";

const StyledLoader = styled(LoadingOverlay)`
    width:100%;
`;

const OuterDiv = styled.div `
    width: 100%;
    flex-direction: column;
    align-items: center;
    background: #383651;
    justify-content: center;
`

const Div = styled.div `
    width: 60%;
    flex-direction: column;
    align-items: center;
    background: white;
    margin: 10rem auto;
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
// const Label = styled.label `
//     input[type = 'file'] {
//     // background-color: red;  

//         &::-webkit-file-upload-button {
//             // margin-left: 3rem;
//             font-size: 1.8rem;
//             background-color: #BF0033;
//             color: white;
//             border: none;
//             border-radius: 5px;
//             text-decoration: none;
//             padding: 1rem 2.5rem;
//             text-decoration: none;
//             font-weight: @bold-font-weight;
//             transition: 0.3s;
//             border: 0;

//             margin-bottom: 15px;
//             margin-top:15px;
//             &:hover {
//                 background-color: #880C23;
//             }
//         }
//     }
// ` 
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

//custom hook
const useInput = initialState => {
    const [value, setValue] = useState(initialState);

    const handleChange = updatedValue => {
        setValue(updatedValue);
    }

    return [value, setValue, handleChange];
}

export default function CreateTicket(props) {
    const [loading, setLoading] = useState('');
    const [images, setImages] = useInput([]);
    const [video, setVideo] = useInput(null);
    const [category, handleCategory] = useInput('');
    const [title, handleTitle] = useInput('');
    const [description, handleDescription] = useInput('');

    const handleSubmit = async e => {
        console.log(Array.from(images));
        e.preventDefault();
        const imagesData = new FormData();
        const ticketDetails = {category, title, description};

        if(images.length){
            for(let i = 1; i <= images.length; i++) {
                imagesData.append('image' + i, images[i-1]);
            }
        }
        
        try{
        setLoading(true);
        const ticket = await axiosWithAuth().post('https://ddq.herokuapp.com/api/tickets', ticketDetails);
    
        if(images){
          const urls  = await axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/${ticket.data.id}/pictures/open`, imagesData);
          console.log(urls);
        }

        if(video){
          const videoData = new FormData();
          videoData.append('video', video);
          const url  = await axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/${ticket.data.id}/video/open`, videoData);
          console.log(url);  
        }
        setLoading(false);
        console.log(ticket.data.id);
        props.history.push(`/Dashboard/Tickets/${ticket.data.id}`);
        }catch(err){
            setLoading(false);
            console.log(err.response.data.message);
            alert(err.response.data.message);
        }
    }

    return (
        <OuterDiv>
            <Div>
    <StyledLoader active={loading} spinner text='Uploading...'>
                <h1> Create a Ticket</h1>
                <Form onSubmit={handleSubmit}>
                <MarginDiv>
                    <InputDiv><input className='text-input' placeholder='Category' onChange={e => handleCategory(e.target.value)} type='text' required/></InputDiv>
                </MarginDiv>
                <MarginDiv>
                    <InputDiv> <input className='text-input' placeholder='Title' onChange={e => handleTitle(e.target.value)} type='text' required/></InputDiv>
                </MarginDiv>
                    <InputDiv> <textarea className='text-input' placeholder='Description' onChange={e => handleDescription(e.target.value)} required/></InputDiv>
                    <FileInput id='imageInput' className='input' type='file'  accept=".tiff,.jpeg,.gif,.png" onChange={e => setImages(e.target.files)} multiple/>
                    <FileInput id='videoInput' className='input' type='file' accept=".avi,.mov,.mp4" onChange={e => setVideo(e.target.files[0])}/>
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