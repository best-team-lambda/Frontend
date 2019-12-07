import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadingStart, loadingDone, getTicket, toggleCollapse, collapseAll, expandAll, markAsAnswer, removeAnswer, 
addComment, updateComment, deleteComment, addReply, updateReply, deleteReply, updateTicket, deleteTicket } from '../../actions/TicketActions';
import axios from 'axios';
import axiosWithAuth from "../../utils/axiosWithAuth";
import * as timeago from 'timeago.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUserCircle, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";
import process2 from '../../images/process2.jpg';
// import {faPencilAlt, faUserCircle, faCamera, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

function ViewTicket(props) {
// #region local state
  const [commentInputText, setCommentInputText] = useState('');
  const [replyInputText, setReplyInputText] = useState(''); //inputted text into reply box
  const [replyToComment, setReplyToComment] = useState(''); //set which comment has reply box active by comment ID.
  const [editQuestionObj, setEditQuestionObj] = useState({category: '', title: '',  description: ''});
  const [editingQuestion, setEditingQuestion] = useState(false);
  const [editCommentText, setEditCommentText] = useState('');
  const [editCommentID, setEditCommentID] = useState('');
  const [editReplyText, setEditReplyText] = useState('');
  const [editReplyID, setEditReplyID] = useState('');
  const [modalToggle, setModalToggle] = useState('none');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const ticketID = props.match.params.id;
  const Fragment = React.Fragment;
// #endregion
// #region console logs
  // console.log('ViewTicket Props',props)
  // console.log('props.currentUser: ', props.currentUser);
  console.log('props.ticket: ', props.ticket)
  console.log('props.comments: ', props.comments)
  // console.log('edit question obj: ', editQuestionObj);
//#endregion

  //load ticket on start
  useEffect(() => {
    if (!props.ticket || props.ticket.id != ticketID){
      props.loadingStart();
      props.getTicket(props);
    }
  }, [])

//#region toggle funcs
  const toggleReplies = (e) => {
    // console.log(e.target.value);
    props.toggleCollapse(e.target.value);
  }
  const collapseAll = (e) => {
    props.collapseAll();
  }
  const expandAll = (e) => {
    props.expandAll()
  }
// #endregion

//#region submit funcs
  const markAsAnswer = (e) => {
    // console.log('markAsAnswer e.target.value', JSON.parse(e.target.value));
    props.markAsAnswer(ticketID, JSON.parse(e.target.value));
  }
  const removeAnswer = () => {
    props.removeAnswer(ticketID);
  }
  const addComment = () => {
    if(commentInputText !== ''){
      props.addComment(ticketID, commentInputText);
      setCommentInputText('');
    }
    else{
      alert('Comment cannot be empty! Add an answer.');
    }
  }
  const submitReply = () => {
    if(replyInputText !== ''){
      props.addReply(replyToComment, replyInputText);
      setReplyInputText('');
      setReplyToComment('');
    }
    else{
      alert('Reply cannot be empty! Add an answer.');
    }
  }
  const editTicket = () => {
    if (editQuestionObj.title !== '' || editQuestionObj.category !== '' || editQuestionObj.description !== ''){
      // props.updateQuestion(editCommentID, editCommentText, collapsedStatus);
      // let editedTicket = {title: props.ticket.title, category: props.ticket.category, description: props.ticket.description};
      let editedTicket = {};
      if (editQuestionObj.title !== '')
      {
        editedTicket = {...editedTicket, title: editQuestionObj.title};
      }
      if (editQuestionObj.category !== '')
      {
        editedTicket = {...editedTicket, category: editQuestionObj.category};
      }
      if (editQuestionObj.description !== '')
      {
        editedTicket = {...editedTicket, description: editQuestionObj.description};
      }
      props.updateTicket(ticketID, editedTicket);
      setEditingQuestion(false);
      setEditQuestionObj({title: '', category: '', description: ''});
    }
    else{
      alert('No changes have been made. Modify the ticket before submitting');
    }
  }
  const editComment = () => {
    if (editCommentText !== ''){
      let collapsedStatus = props.comments.find(comment => {return comment.id == editCommentID}).collapsed;
      props.updateComment(editCommentID, editCommentText, collapsedStatus);
      setEditCommentID('');
      setEditCommentText('');
    }
    else{
      alert('You must add text to update the comment.');
    }
  }
  const editReply = () => {
    if (editReplyText !== ''){
      props.updateReply(editReplyID, editReplyText);
      setEditReplyID('');
      setEditReplyText('');
    }
    else{
      alert('You must add text to update the comment.');
    }
  }
// #endregion
  
//#region delete funcs
  const deleteComment = (e) => {
    props.deleteComment(e.target.value)
  }
  const deleteReply = (e) => {
    props.deleteReply(e.target.value);
  }
  const deleteTicket = () => {
    if(props.currentUser.id === props.ticket.author_id){
      props.deleteTicket(props);
    }
    else{
      alert('Only the author of the ticket may delete it. How did you even trigger this?');
    }
  }
// #endregion

//#region editSelector funcs
  const toggleEditingTicket = () => {
    setEditingQuestion(true);
    setEditQuestionObj({title: '', category: '', description: ''});
  }
  const pickReplyToComment = (e) => {
    // console.log('asfasfasfasf');
    // console.log('ReplyToComment set to: ', e.target.value);
    setReplyInputText(''); //wipe any reply text typed into another box
    setReplyToComment(e.target.value);
  }
  const pickCommentToEdit = (e) => {
    // console.log('editCommentID set to: ', e.target.value);
    setEditCommentText(''); //wipe any reply text typed into another box
    setEditCommentID(e.target.value);
  }
  const pickReplyToEdit = (e) => {
    // console.log('editReplyID set to: ', e.target.value);
    setEditReplyText(''); //wipe any reply text typed into another box
    setEditReplyID(e.target.value);
  }
//#endregion

//#region inputHandlerFuncs
  const handleCommentInput = (e) => {
    setCommentInputText(e.target.value);
    // console.log('comment input text: ', commentInputText);
  }
  const handleReplyInput = (e) => {
    setReplyInputText(e.target.value);
    // console.log('reply input text: ', replyInputText);
  }
  const handleEditCommentInput = (e) => {
    setEditCommentText(e.target.value);
    // console.log('edit comment input text: ', setEditCommentText);
  }
  const handleEditReplyInput = (e) => {
    setEditReplyText(e.target.value);
    // console.log('edit Reply input text: ', setEditReplyText);
  }
  const handleEditTicket = (e) => {
    if (e.target.name === 'category'){
      setEditQuestionObj({...editQuestionObj, category: e.target.value});
    }
    else if (e.target.name === 'title'){
      setEditQuestionObj({...editQuestionObj, title: e.target.value});
    }
    else if (e.target.name === 'description'){
      setEditQuestionObj({...editQuestionObj, description: e.target.value});
    }
  }
// #endregion

//#region cancelEdit funcs
  const cancelTicketEdit = () => {
    setEditingQuestion(false);
    setEditQuestionObj({title: '', category: '', description: ''});
  }
  const cancelCommentEdit = () => {
    setEditCommentID('');
    setEditCommentText('');
  }
  const cancelReplyEdit = () => {
    setEditReplyID('');
    setEditReplyText('');
  }
  const cancelReplyToComment = () => {
    setReplyInputText(''); //wipe any reply text typed into another box
    setReplyToComment('');
  }
// #endregion

const modalExpand = () => {
  if (modalToggle === 'none'){
    setModalToggle('block');
  }
  else if (modalToggle === 'block')
  {
    setModalToggle('none');
  }
}

//#region oldfuncs
  const updateQuestion = () => {
    // console.log('updateQuestion() firing. ')
    // if (props.currentUser.name === props.ticket.author_name && inputText !== null){
    //     props.loadingStart();
    //     axiosWithAuth()
    //       .put(`/tickets/${ticketID}`, {solution: inputText})
    //       .then(res => {
    //         console.log('updateQuestion res:', res.data);
    //         props.loadingDone();
    //         // setTicket(res.data.ticket_details);
    //       })
    //       .catch(err => {
    //         console.log("updateQuestion CATCH ERROR: ", err.response.data.message);
    //         props.loadingDone();
    //         alert(err.response.data.message);
    //       });
    // }
    // else {
    //   alert('Only the creator may modify the question.');
    // }
  }

  const updateAnswer = () => {
    // // console.log('updateAnswer() firing. ')
    // // console.log('updateQuestion() firing. ')
    // if ((props.currentUser.name === props.ticket.author_name || props.currentUser.name === props.ticket.teacher_name) && inputText !== ''){
    //     props.loadingStart();
    //     axiosWithAuth()
    //       .put(`/tickets/${ticketID}`, {solution: inputText})
    //       .then(res => {
    //         console.log('updateQuestion res:', res.data);
    //         props.loadingDone();
    //         // setTicket(res.data.ticket_details);
    //       })
    //       .catch(err => {
    //         console.log("updateQuestion CATCH ERROR: ", err.response.data.message);
    //         props.loadingDone();
    //         alert(err.response.data.message);
    //       });
    // }
    // else {
    //   alert('You must be the creator or helper assigned and updated text cannot be null.');
    // }
  }

  const resolveTicket = async () => {
    // console.log('ResolveTicket() ticket.solution: ', {solution: inputText})
    // const promises = [];
    // if (inputText !== ''){
    //     props.loadingStart();
    //     try{
    //       promises.push(axiosWithAuth().post(`/tickets/${ticketID}/resolve`, {solution: inputText}));
    //       // .then(res => {
    //       //   console.log('resolveTicket res:', res.data);
    //       //   setLoading(false);
    //       //   setTicket(res.data[0]);
    //       // })
    //       // .catch(err => {
    //       //   console.log("CATCH ERROR: ", err.response.data.message);
    //       //   setLoading(false);
    //       //   alert(err.response.data.message);
    //       // });
    //       if(video){
    //         const videoData = new FormData();
    //         videoData.append('video', video);
    //         const url  = await axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/${props.ticket.data.id}/video/resolved`, videoData);
    //         console.log(url);  
    //       }
    //       if(images.length){
    //         const imagesData = new FormData();
    //         for(let i = 1; i <= images.length; i++) {
    //             imagesData.append('image' + i, images[i-1]);
    //         }
    //         const urls  = await axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/${props.ticket.data.id}/pictures/resolved`, imagesData);
    //     }
    //       const result = await axios.all(promises);
    //       props.loadingDone();
    //     }catch(err){
    //       console.log("viewTicket.js deleteTicket() CATCH ERROR: ", err);
    //       props.loadingDone();
    //       alert(err);
    //     };
    // }
    // else {
    //   alert('You must submit an answer to close the ticket.');
    // }
  };
// #endregion

  return (
    <StyledLoader active={props.loading} spinner text='Loading...'>
    <section className="ticketContainer">
      {(()=>{
        if (props.ticket){
          return (
          <>
            <div className='ticketNav'>
              <div className='ticketNavLeft'>
                <div><h2>TICKET #{props.match.params.id}</h2></div>
                <div className='statusBox'><h3>Category: {props.ticket.category.toUpperCase()}</h3></div>
                <div className='statusBox'><h3>Current status: {props.ticket.status.toUpperCase()}</h3></div>
              </div> 
            </div>
{/* #region author question div  */}
            <div className='ticketComment'>
              <div className='ticketComment2'>
                <div className='commentFixer'>
                  {props.ticket.author_image && 
                    <div className='tooltip'><Link to={`/Dashboard/Account/${props.ticket.author_id}`}><img className="viewTicketPhoto" src={props.ticket.author_image} alt='author'/></Link>
                      <span className='tooltiptext'>View Profile</span>
                    </div>
                  }
                  {!props.ticket.author_image && 
                    <div className='tooltip'><Link to={`/Dashboard/Account/${props.ticket.author_id}`}><Fa icon={faUserCircle}/></Link>
                    <span className='tooltiptext'>View Profile</span>
                    </div>
                    } 
                  <div className='commentText'>
                    <h4>{props.ticket.author_name} asked:</h4>
                    <div><p><b>Title:{'\xa0\xa0'}</b> {props.ticket.title}</p></div>
                  </div>
                </div>
                <div className='secondDiv'><p>{timeago.format(props.ticket.created_at)}</p></div>
              </div>
              <p><b>Description:{'\xa0\xa0'}</b> {props.ticket.description}</p>

              {/* <!-- Trigger the Modal --> */}
              <img className="modalImg" onClick={modalExpand} src={process2} alt="process 2" />

              {/* <!-- The Modal --> */}
              <div id='myModal' className="modal" onClick={modalExpand} style={{display: modalToggle}}>

                {/* <!-- The Close Button --> */}
                <span className="close">&times;</span>

                {/* <!-- Modal Content (The Image) --> */}
                <img className="modal-content" id="img01" src={process2}/>

                {/* <!-- Modal Caption (Image Text) --> */}
                <div id="caption">process 2</div>
              </div>


              <div className='mediaDiv'>{props.openPictures.length > 0 && props.openPictures.map(image => <Image key={image} src={image.url}/>)}</div>
              <div className='mediaDiv'>{props.openVideo && <iframe src={props.openVideo}/>}</div>

              {props.comments.length > 0 && !editingQuestion && <button className='button alignRight' onClick={collapseAll}>Collapse All</button>}
              {props.comments.length > 0 && !editingQuestion && <button className='button alignRight' onClick={expandAll}>Expand All</button>}

              {props.currentUser.id === props.ticket.author_id && !editingQuestion && <button className='button alignRight' onClick={toggleEditingTicket}>Edit</button>}
              {props.currentUser.id === props.ticket.author_id && editingQuestion && <button className='button alignRight' onClick={cancelTicketEdit}>Cancel Edit</button>}

              {props.currentUser.id === props.ticket.author_id && !editingQuestion && <button className='button alignRight' onClick={deleteTicket}>Delete</button>}

              {props.ticket.status == 'resolved' && props.currentUser.id === props.ticket.author_id && !editingQuestion && <button className='button alignRight' onClick={removeAnswer}>Re-open ticket</button>}
            </div>
            
{/* //#endregion End author question div  */}

{/* Edit Question box */}
            {editingQuestion && <div>
              <div className='editTicketBox'>
                <h3>Edit Ticket:</h3>
                <label>Category:
                  <br/>
                  <input className='text-input' name='category' placeholder={props.ticket.category} onChange={handleEditTicket} type='text'/>
                </label>
                  <br/>
                <label>Title:
                  <br/>
                  <input className='text-input' name='title' placeholder={props.ticket.title} onChange={handleEditTicket} type='text' />
                </label>
                <br/>
                <label>Description:
                  <textarea name='description' placeholder={props.ticket.description} onChange={handleEditTicket}/>
                </label>
              </div>
              <div className='uploadDiv2'>
                <FileInput id='imageInput' className='input' type='file' onChange={e => setImages(e.target.files)} multiple/>
                <FileInput id='videoInput' className='input' type='file' onChange={e => setVideo(e.target.files[0])}/>
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
                <button className="button" onClick={editTicket}>Submit Changes</button>
              </div>
            </div>}
{/* End Edit Question box */}

{/* Comments div  */}
            {props.comments.length > 0 && <>
              {props.comments.map((comment)=>{
                if (comment.comment_replies.length === 0){
                  comment.collapsed = false;
                }
                return <Fragment key={comment.id}>
                  <>
                  <div className={`ticketComment ${props.ticket.solution_comment_id == comment.id ? 'solution' : null }`}>
                    <div className='ticketComment2'>
                      <div className='commentFixer'>
                        <div className='tooltip'>
                          <Link to={`/Dashboard/Account/${comment.author_id}`}><img className="viewTicketPhoto" src={comment.author_image} alt='comment author'/></Link>
                          <span className='tooltiptext'>View Profile</span>
                        </div>
                        <div className='commentText'>
                          <h4>{comment.author_name} replied:</h4>
                          <p>{comment.description}</p>    
                        </div>
                      </div>
                      <div className='secondDiv'><p>{timeago.format(comment.created_at)}</p></div>
                    </div>                
                    <div className='mediaDiv'>{comment.comment_pictures.length > 0 && comment.comment_pictures.map(image => <Image key={image} src={image.url}/>)}</div>
                    <div className='mediaDiv'>{comment.comment_video && <iframe src={comment.comment_video} />}</div>
                    
                    {comment.comment_replies.length > 0 && comment.collapsed && <button className='button alignRight' value={comment.id} onClick={toggleReplies}>+ {comment.comment_replies.length} replies</button>}
                    {comment.comment_replies.length > 0 && !comment.collapsed && <button className='button alignRight' value={comment.id} onClick={toggleReplies}>- {comment.comment_replies.length} replies</button>}

                    {comment.comment_replies.length === 0 && comment.id != editCommentID && comment.id != replyToComment && <button className='button alignRight' value={comment.id} onClick={pickReplyToComment}>Add Reply</button>}
                    {comment.comment_replies.length === 0 && comment.id != editCommentID && comment.id == replyToComment && <button className='button alignRight' value={comment.id} onClick={cancelReplyToComment}>Cancel Reply</button>}

                    {props.currentUser.id === comment.author_id && comment.id != editCommentID && <button className='button alignRight' value={comment.id} onClick={pickCommentToEdit}>Edit</button>}
                    {props.currentUser.id === comment.author_id && comment.id == editCommentID && <button className="button alignRight" onClick={cancelCommentEdit}>Cancel Edit</button>}
                    
                    {props.currentUser.id === comment.author_id && comment.id != editCommentID && <button className='button alignRight' value={comment.id} onClick={deleteComment}>Delete</button>}
                    
                    {props.ticket.status != 'resolved' && props.currentUser.id === props.ticket.author_id && comment.id != editCommentID && <button className='button alignRight' value={JSON.stringify(comment)} onClick={markAsAnswer}>Mark as Answer</button>}
                  </div>
          {/* Edit comment box */}
                  {comment.id == editCommentID && <div>
                      <div className='replyBox'>
                        <h3>Edit Comment:</h3>
                        <textarea onChange={handleEditCommentInput} placeholder={comment.description}></textarea>
                      </div>
                      <div className='uploadDiv2'>
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
                        <button className="button" onClick={editComment}>Submit Changes</button>
                      </div>
                    </div>}
          {/* End Edit comment box */}
                  </>
                  {!comment.collapsed && comment.comment_replies.length > 0 && comment.comment_replies.map((reply)=>{
                    return <Fragment key={reply.id}>
                    <div className='ticketCommentReply'>
                      <div className='ticketComment2'>
                        <div className='commentFixer'>
                          <div className='tooltip'>
                            <Link to={`/Dashboard/Account/${reply.author_id}`}><img className="viewTicketPhoto" src={reply.author_image} alt='reply author'/></Link>
                            <span className='tooltiptext'>View Profile</span>
                          </div>
                          <div className='commentText'>
                            <h4>{reply.author_name} replied:</h4>
                            <p>{reply.description}</p>    
                          </div>
                        </div>
                        <div className='secondDiv'><p>{timeago.format(reply.created_at)}</p></div>
                      </div>           
                      
                      {props.currentUser.id === reply.author_id && reply.id != editReplyID && <button className='button alignRight' value={reply.id} onClick={pickReplyToEdit}>Edit</button>}
                      {props.currentUser.id === reply.author_id && reply.id == editReplyID && <button className='button alignRight' value={reply.id} onClick={cancelReplyEdit}>Cancel Edit</button>}
                      
                      {props.currentUser.id === reply.author_id && reply.id != editReplyID && <button className='button alignRight' value={reply.id} onClick={deleteReply}>Delete</button>}
                      
                      {props.ticket.status != 'resolved' && props.currentUser.id === props.ticket.author_id && reply.id != editReplyID && <button className='button alignRight' value={JSON.stringify(reply)} onClick={markAsAnswer}>Mark as Answer</button>}
                      
                      <div className='mediaDiv'>{reply.reply_pictures.length > 0 && reply.reply_pictures.map(image => <Image key={image} src={image.url}/>)}</div>
                      <div className='mediaDiv'>{reply.reply_video && <iframe src={reply.reply_video} />}</div>
                  </div> 
          {/* Edit Reply Box */}
                  {reply.id == editReplyID && <div>
                      <div className='replyBox'>
                        <h3>Edit Reply:</h3>
                        <textarea onChange={handleEditReplyInput} placeholder={reply.description}></textarea>
                      </div>
                      <div className='uploadDiv2'>
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
                        <button className="button" onClick={editReply}>Submit Changes</button>
                      </div>
                    </div>}
          {/* End Edit Reply Box */}
                  </Fragment> })} 
{/* New Reply Box Here */}
  {/* if no repliess have add reply button on comment, else show answer box at bottom of replies if comment is expanded */}
                    <div className='replyBox'>
                      {comment.comment_replies.length > 0 && comment.id != editCommentID && comment.id != replyToComment && !comment.collapsed && <button className='button alignRight' value={comment.id} onClick={pickReplyToComment}>Add Reply</button>}
                      {comment.comment_replies.length > 0 && comment.id != editCommentID && comment.id == replyToComment && !comment.collapsed && <button className='button alignRight' value={comment.id} onClick={cancelReplyToComment}>Cancel Reply</button>}
                    </div>

                    {comment.id == replyToComment && !comment.collapsed && <div>
                      <div className='replyBox'>
                        <h3>Reply to thread:</h3>
                        <textarea onChange={handleReplyInput} value={replyInputText}></textarea>
                      </div>
                      <div className='uploadDiv2'>
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
                        <button className="button" onClick={submitReply}>Submit Reply</button>
                      </div>
                    </div>}
  {/* End New Reply Box */}</Fragment>  })}  </>}
{/* End Comments div */}

{/* New Comment div */}
  {/* create a new comment thread*/}
              <div>
                <div className='commentBox'>
                  <h3>Add new thread:</h3>
                  <textarea onChange={handleCommentInput} value={commentInputText}></textarea>
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
                  <button className="button" onClick={addComment}>Submit Reply</button>
                </div>
              </div>
{/* End New Comment div */}

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
      loading: state.TicketReducer.loading,
      ticket: state.TicketReducer.ticket,
      comments: state.TicketReducer.comments,
      openPictures: state.TicketReducer.openPictures,
      resolvedPictures: state.TicketReducer.resolvedPictures,
      openVideo: state.TicketReducer.openVideo,
      resolvedVideo: state.TicketReducer.resolvedVideo,
  }
}

export default connect(mapStateToProps, { loadingStart, loadingDone, getTicket, toggleCollapse, collapseAll, expandAll, 
  markAsAnswer, removeAnswer, addComment, updateComment, deleteComment, addReply, updateReply, deleteReply, updateTicket, deleteTicket })(ViewTicket)


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
