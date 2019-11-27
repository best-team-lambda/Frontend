import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadingStart, loadingDone } from '../../actions/AppActions.js';
import axios from 'axios';
import axiosWithAuth from "../../utils/axiosWithAuth";
import * as timeago from 'timeago.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUserCircle, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";
// import {faPencilAlt, faUserCircle, faCamera, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

function ViewTicket(props) {
  const [ticket, setTicket] = useState('')
  const [helperAnswer, setHelperAnswer] = useState('');
  const [openPictures, setOpenPictures] = useState([]);
  const [resolvedPictures, setResolvedPictures] = useState([]);
  const [openVideo, setOpenVideo] = useState(null);
  const [resolvedVideo, setResolvedVideo] = useState(null);
  // const [authorPicture, setauthorPicture] = useState(null);
  // const [helperPicture, setHelperPicture] = useState(null);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const ticketID = props.match.params.id;
  
  // console.log('ViewTicket Props',props)
  // console.log('currentUser: ', currentUser);
  // console.log(ticket);

  // get ticket by props.match.params.ID
  useEffect(() => {
    props.loadingStart();
    axiosWithAuth()
      .get(`/tickets/${ticketID}`)
      .then(res => {
        console.log('getTicket res:', res.data);
        props.loadingDone();
        // setImages(res.data.resolved)
        setTicket(res.data.ticket_details);
        setOpenPictures(res.data.open_pictures);
        setResolvedPictures(res.data.resolved_pictures);
        setOpenVideo(res.data.ticket_details.open_video);
        setResolvedVideo(res.data.ticket_details.resolved_video);
      })
      .catch(err => {
        console.log("CATCH ERROR: ", err.response.data.message, '');
        props.loadingDone();
        alert(err.response.data.message);
        props.history.push('/Dashboard/Unassigned');
      });
  }, [ticketID, props.history]);

  const handleInput = (e) => {
    setHelperAnswer(e.target.value);
    console.log(helperAnswer);
  }

  const updateQuestion = () => {
    console.log('updateQuestion() firing. ')
    if (props.currentUser.name === ticket.author_name && helperAnswer !== null){
        props.loadingStart();
        axiosWithAuth()
          .put(`/tickets/${ticketID}`, {solution: helperAnswer})
          .then(res => {
            console.log('updateQuestion res:', res.data);
            props.loadingDone();
            setTicket(res.data.ticket_details);
          })
          .catch(err => {
            console.log("updateQuestion CATCH ERROR: ", err.response.data.message);
            props.loadingDone();
            alert(err.response.data.message);
          });
    }
    else {
      alert('Only the creator may modify the question.');
    }

  }

  const updateAnswer = () => {
    // console.log('updateAnswer() firing. ')
    // console.log('updateQuestion() firing. ')
    if ((props.currentUser.name === ticket.author_name || props.currentUser.name === ticket.teacher_name) && helperAnswer !== ''){
        props.loadingStart();
        axiosWithAuth()
          .put(`/tickets/${ticketID}`, {solution: helperAnswer})
          .then(res => {
            console.log('updateQuestion res:', res.data);
            props.loadingDone();
            setTicket(res.data.ticket_details);
          })
          .catch(err => {
            console.log("updateQuestion CATCH ERROR: ", err.response.data.message);
            props.loadingDone();
            alert(err.response.data.message);
          });
    }
    else {
      alert('You must be the creator or helper assigned and updated text cannot be null.');
    }
  }

  const deleteTicket = () => {
    // need to figure out a confirm button!
    console.log('deleteTicket() firing. Say goodbye to Hollywood')
    if (props.currentUser.name === ticket.author_name)
    {
        props.loadingStart();
        axiosWithAuth()
          .delete(`/tickets/${ticketID}`)
          .then(res => {
            console.log('deleteTicket res:', res.data);
            props.loadingDone();
            alert('Ticket deleted successfully. Sending you back to your dashboard...');
            props.history.push('/Dashboard/Unassigned');
          })
          .catch(err => {
            console.log("viewTicket.js deleteTicket() CATCH ERROR: ", err.response.data.message);
            props.loadingDone();
            alert(err.response.data.message);
          });
    }
    else {
      alert('Only the creator of a ticket may close it.');
    }
  };

  const resolveTicket = async () => {
    console.log('ResolveTicket() ticket.solution: ', {solution: helperAnswer})
    const promises = [];
    if (helperAnswer !== ''){
        props.loadingStart();
        try{
          promises.push(axiosWithAuth().post(`/tickets/${ticketID}/resolve`, {solution: helperAnswer}));
          // .then(res => {
          //   console.log('resolveTicket res:', res.data);
          //   setLoading(false);
          //   setTicket(res.data[0]);
          // })
          // .catch(err => {
          //   console.log("CATCH ERROR: ", err.response.data.message);
          //   setLoading(false);
          //   alert(err.response.data.message);
          // });
          if(video){
            const videoData = new FormData();
            videoData.append('video', video);
            const url  = await axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/${ticket.data.id}/video/resolved`, videoData);
            console.log(url);  
          }
          if(images.length){
            const imagesData = new FormData();
            for(let i = 1; i <= images.length; i++) {
                imagesData.append('image' + i, images[i-1]);
            }
            const urls  = await axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/${ticket.data.id}/pictures/resolved`, imagesData);
        }
          const result = await axios.all(promises);
          props.loadingDone();
        }catch(err){
          console.log("viewTicket.js deleteTicket() CATCH ERROR: ", err);
          props.loadingDone();
          alert(err);
        };
    }
    else {
      alert('You must submit an answer to close the ticket.');
    }
  };

  const claimTicket = () => {
    console.log('claimTicket() firing', ticket.helper_name)
    if (props.currentUser.name !== ticket.author_name && ticket.status === 'open'){
        props.loadingStart();
        axiosWithAuth()
          .post(`/tickets/${ticketID}/help`)
          .then(res => {
            console.log('claimTicket res:', res.data.ticket_details);
            props.loadingDone();
            setTicket(res.data.ticket_details);
          })
          .catch(err => {
            console.log("claimTicket CATCH ERROR: ", err.response.data.message);
            props.loadingDone();
            alert(err.response.data.message);
          });
    }
    else {
      alert("You can't claim your own ticket.");
    }
  }

  const releaseTicket = () => {
    console.log('releaseTicket() firing')
    if (ticket.helper_name === props.currentUser.name && ticket.status === 'assigned'){
        props.loadingStart();
        axiosWithAuth()
          .delete(`/tickets/${ticketID}/queue`)
          .then(res => {
            console.log('releaseTicket res:', res.data);
            axiosWithAuth()
              .get(`/tickets/${ticketID}`)
              .then(res => {
                console.log('getTicket res:', res.data);
                props.loadingDone();
                setTicket(res.data.ticket_details);
                setOpenPictures(res.data.open_pictures);
                setResolvedPictures(res.data.resolved_pictures);
                setOpenVideo(res.data.ticket_details.open_video);
                setResolvedVideo(res.data.ticket_details.resolved_video);
              })
              .catch(err => {
                console.log("CATCH ERROR: ", err.response.data.message);
                props.loadingDone();
                alert(err.response.data.message);
              });
          })
          .catch(err => {
            console.log("CATCH ERROR: ", err.response.data.message);
            props.loadingDone();
            alert(err.response.data.message);
          });
    }
    else {
      alert('You may only release a ticket that you are assigned to.');
    }
  }

  return (

    <StyledLoader active={props.loading} spinner text='Loading...'>
    <section className="ticketContainer">
      {(()=>{
        if (ticket){
          return (
          <>
            <div className='ticketNav'>
              <div className='ticketNavLeft'>
                <div><h2>TICKET #{ticketID}</h2></div>      
              </div> 
              <nav className='ticketNavRight'>
                {ticket.author_name === props.currentUser.name && <button className='navLinkInternal button' onClick={deleteTicket}>Delete</button>}
                {ticket.author_name !== props.currentUser.name && ticket.helper_name === null && <button className='button' onClick={claimTicket}>Claim</button>}
                {ticket.helper_name === props.currentUser.name &&  <button className='button' onClick={releaseTicket}>Release</button>}
              </nav>
            </div>

{/* Status div */}
            <div className='statusDiv'>
              <div className='statusBox'><h3>Category:</h3> <p>{ticket.category.toUpperCase()}</p></div>
              <div className='statusBox'><h3>Current status:</h3> <p>{ticket.status.toUpperCase()}</p></div>
              {ticket.helper_image && <div className='statusBox'><h3>Expert:</h3><img className="photo" src={ticket.helper_image} alt='Expert'/></div>}
              {ticket.author_image && <div className='statusBox'><h3>author:</h3><Link to={`/Dashboard/Account/${ticket.author_id}`}><img className="photo" src={ticket.author_image} alt='author'/></Link></div>}
              {ticket.helper_name && !ticket.helper_image && <div className='statusBox'><h3>Expert:</h3><Fa icon={faUserCircle}/></div>}
              {!ticket.author_image && <div className='statusBox'><h3>author:</h3><Fa icon={faUserCircle}/></div>} 
            </div> 
{/* End Status Div */}

{/* Top div */}

{/* End Top div */}
            
{/* author question div  */}

            <div className='authorDiv'>
              <div className='authorDivHeader'>
                <div><p>{ticket.author_name} asked:</p></div>
                <div className='secondDiv'><p>{timeago.format(ticket.created_at)}</p></div>
              </div>
              <div><p>Title: {ticket.title}</p></div>
              <p>Description: {ticket.description}</p>

              <div className='mediaDiv'>{openPictures.length > 0 && openPictures.map(image => <Image key={image} src={image.url}/>)}</div>
              <div className='mediaDiv'>{openVideo && <iframe src={openVideo}/>}</div>
              {props.currentUser.name === ticket.author_name && <button className='button' onClick={updateQuestion}>Update</button>}
            </div>

{/* End author question div  */}

{/* Answer div  */}

              {ticket.solution && 
              <div className='helperDiv'>
                <div>{ticket.helper_name} replied:</div>
                <p>{timeago.format(ticket.resolved_at)}</p>
                <p>{ticket.solution}</p>

                <div className='mediaDiv'>{resolvedPictures.length > 0 && openPictures.map(image => <Image key={image} src={image.url}/>)}</div>
                <div className='mediaDiv'>{resolvedVideo && <iframe src={resolvedVideo} />}</div>
                {props.currentUser.name === ticket.author_name && <button className='button' onClick={updateAnswer}>Update</button>}
              </div>}
{/* End answer div */}

{/* Answer box div */}
    {/* displays only if user is assigned to the ticket (creator or helper assigned) */}
              {(props.currentUser.name === ticket.helper_name || props.currentUser.name === ticket.author_name) && 
              <div className='answerContainer'>
              <div className='answerBox'>
                <h3>Write answer here:</h3>
                <textarea onChange={handleInput}></textarea>
              </div>
              <div className='uploadDiv'>
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
                {ticket.status === 'open' && <button className="button" onClick={resolveTicket}>Submit Answer</button>}
                {ticket.status === 'assigned' && <button className="button" onClick={updateAnswer}>Update Answer</button>}
                </div>
              </div>}
          </>
          );}})()}
   
    </section>
    </StyledLoader>
  );
}

const mapStateToProps = state => {
  // console.log('mapstatetoprops: ', state);
  return {
      currentUser: state.AppReducer.currentUser,
      loading: state.AppReducer.loading,
  }
}

export default connect(mapStateToProps, { loadingStart, loadingDone })(ViewTicket)



const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;

// const InputDiv = styled.div `
//     width: 100%
//     display: flex;
//     justify-content: space-around;
// `
const FileInput = styled.input `
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 1px;
`

// const ImagesDiv = styled.div `
//   display: flex;
//   justify-content: spaced-evenly
// `

const Image = styled.img `
  max-width: 400px;
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

// {
//   "ticket_details": {
//     "id": 14,
//     "title": "How do I style a select dropdown with only CSS?",
//     "category": "CSS",
//     "description": "Is tari",
//     "created_at": "2019-11-22T09:08:28.189Z",
//     "open_video": null,
//     "author_image": null,
//     "helper_image": null,
//     "resolved_video": null,
//     "solution": null,
//     "author_name": "Chelsea Wetzel",
//     "helper_name": null,
//     "status": "open",
//     "resolved_at": null
//   },
//   "open_pictures": [],
//   "resolved_pictures": []
// }