import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getOtherUser, updateUser, adminUpdateUser, addProfilePicture, updateProfilePicture, deleteProfilePicture,
adminAddProfilePicture, adminUpdateProfilePicture, adminDeleteProfilePicture,  } from '../../actions/AppActions.js';
import { isUsernameAvailable, isValidPassword, isValidUsername, validateInputs } from '../../utils/AppUtils.js';
import decode from 'jwt-decode';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUserCircle, faCamera } from "@fortawesome/free-solid-svg-icons";
// import {faPencilAlt, faUserCircle, faCamera, faImages, faFileVideo} from "@fortawesome/free-solid-svg-icons";
import LoadingOverlay from "react-loading-overlay";

import axiosWithAuth from "../../utils/axiosWithAuth"

function ViewAccount(props) {
    const [loading, setLoading] = useState(true);
    const [pictureLoading, setPictureLoading] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [usernameInvalid, setUsernameInvalid] = useState(false);
    // const [usernameLoading, setUsernameLoading] = useState(false);
    const [isAdmin] = useState(decode(sessionStorage.getItem('token')).admin)
    const [showEditForm, setShowEditForm] = useState(false);
    // state for when the user edits their account details
    const [editUserName, setEditUserName] = useState('');
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editCohort, setEditCohort] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const [enterPasswordField, setEnterPasswordField] = useState(false)
    // const [profilePicture, setProfilePicture] = useState(null);

// #region console logs
    // console.log('Current User', props.currentUser.id, 'Other User: ', props.match.params.id)
    // console.log('Decoded token', decode(sessionStorage.getItem('token')));
// #endregion

// console.log(props.otherUser);

    useEffect(() => {
        // console.log(props.match.params.id, props.otherUser.id, props.currentUser.id)
        if (!props.otherUser || props.match.params.id != props.otherUser.id){
            setLoading(true);
            props.getOtherUser(props.match.params.id);
        }
        else if (props.otherUser.id != props.currentUser.id && props.currentUser.id === props.match.params.id){
            setLoading(true);
            props.getOtherUser(props.match.params.id);
        }
        else{
            resetInputs();
        }
      }, [props.otherUser, props.currentUser, props.match.params.id])

      useEffect(()=>{
        if(editUserName || editName || editEmail || editCohort || newPassword){
            setEnterPasswordField(true)
        }else{
            setEnterPasswordField(false)
        }
      },[editName,editEmail,editCohort,newPassword,editUserName])

    const handleChange = e => {
        if (e.target.name === 'username'){
            if(isValidUsername(e.target.value))
            {
                setUsernameInvalid(false);
                isUsernameAvailable(e.target.value)
                .then(res => {
                setUsernameAvailable(res);
                })
            }
            else
            {
              setUsernameInvalid(true);
            }
            setEditUserName(e.target.value);
        }
        else if (e.target.name === 'name'){
            setEditName(e.target.value);
        }
        else if (e.target.name === 'email'){
            setEditEmail(e.target.value);
        }
        else if (e.target.name === 'cohort'){
            setEditCohort(e.target.value);
        }
        else if (e.target.name === 'newPassword'){
            setNewPassword(e.target.value);
        }
        else if (e.target.name === 'oldPassword'){
            setCurrentPassword(e.target.value);
        }
    };
    
    const resetInputs = () => {
        setLoading(false);
        setShowEditForm(false);
        setEditUserName('');
        setEditName('');
        setEditEmail('');
        setNewPassword('');
        setCurrentPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.target.reset();

        // console.log(JSON.stringify(props.currentUser));
        // console.log(props.currentUser.profile_picture)
        let userObj = { password: currentPassword }
        if (editUserName){
            userObj = {...userObj, username: editUserName}
        }
        if (editName){
            userObj = {...userObj, name: editName}
        }
        if (editEmail){
            userObj = {...userObj, email: editEmail}
        }
        if (editCohort){
            userObj = {...userObj, cohort: editCohort}
        }
        if (newPassword){
            userObj = {...userObj, newPassword: newPassword}
        }

        // console.log(editUserName)
        // console.log(userObj)
        if (currentPassword === ''){
            alert('You must enter your current password to make changes.');
            resetInputs();
        }
        else if (validateInputs(userObj) && (newPassword === '' || isValidPassword(newPassword))) {
            // console.log('passed validation');
            // props.loadingStart();
            if (props.currentUser.id == props.match.params.id)
            {
                setLoading(true);
                // CHECK IF NEEDED AND DO THIS FIRST, THEN UPDATE THE USER AND SPREAD THIS IN. USER UPDATER SHOULD ALWAYS SPREAD FULL OBJ IN AND
                //ONLY UPDATE VARS RETURNED IN THE SERVER RES.
                props.updateUser(userObj, setLoading);
            }
            //putting other first for now because its easier to set actions up that way
            //call admin code first in case admin has special edit powers that normal user doesn't, admin should be able to use said powers
            //on themselves
            else if (isAdmin)
            {
                setLoading(true);
                // CHECK IF NEEDED AND DO THIS FIRST, THEN UPDATE THE USER AND SPREAD THIS IN. USER UPDATER SHOULD ALWAYS SPREAD FULL OBJ IN AND
                //ONLY UPDATE VARS RETURNED IN THE SERVER RES.
                //USE ADMIN ENDPOINT FOR ADMIN BLOCK
                props.adminUpdateUser(props.otherUser.id, userObj);
            }
        }
    }

    const changeProfilePic = (picture) => {
        if(picture){
            const formData = new FormData();
            formData.append('image', picture);
            // console.log(picture);
            // console.log(formData);
            setPictureLoading(true);
            if (props.currentUser.id == props.match.params.id){
                if(props.currentUser.profile_picture){
                    //put
                    props.updateProfilePicture(formData, setPictureLoading);
                }else{
                    //post
                    props.addProfilePicture(formData, setPictureLoading);
                }
            }
            else if (isAdmin){
                if(props.otherUser.profile_picture){
                    //put
                    props.adminUpdateProfilePicture(props.match.params.id, formData, setPictureLoading);
                }else{
                    //post
                    props.adminAddProfilePicture(props.match.params.id, formData, setPictureLoading);
                }
            }
        }
    }

    const deleteProfilePic = () => {
        //add loading
        if (props.currentUser.id == props.match.params.id){
            props.deleteProfilePicture(setPictureLoading);
        }
        else if (isAdmin){
            props.adminDeleteProfilePicture(props.match.params.id, setPictureLoading);
        }
    }

    const deleteAcc = async () => {
        //e.preventDefault();
        let pass = {password: '@PP1e'}
        console.log('del acc firing')
        axiosWithAuth().delete('/users/user', {data: {password: currentPassword}})
        .then(res => {
            sessionStorage.clear();
            props.history.push('/login')
        })
        .catch(err => {
            console.log('error', err.response.data.message);
        })
       
    }

    
    return (
        //
        <Main>
            <MainChild>
        <StyledLoader active={loading} spinner text='Uploading...'> 
            {!showEditForm && <>
                    <ProfileWrapper>
                  
                            {props.otherUser.profile_picture ? (
                            <ProfileFilter>
                                <div >
                                    Edit
                                    <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                                </div>
                                <ProfileImg edit={false} style={{backgroundImage: `url('${props.otherUser.profile_picture}')`}}/>
                            </ProfileFilter>) : (
                            <ProfileFilter>
                                <div className='editPicture'>
                                    Edit
                                    <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                                </div>
                                <DefaultProfile edit={false} icon={faUserCircle}/>
                            </ProfileFilter>)}
                    <Info>
                        <Text1>{props.otherUser.name}</Text1>
                        <Text2>{props.otherUser.email !== null ? props.otherUser.email : 'None'}</Text2>
                        <Text3>{props.otherUser.cohort !== null ? props.otherUser.cohort : 'Unknown'}</Text3>
                    </Info>
                    {(props.currentUser.id == props.match.params.id || isAdmin) && 
                        <ButtonParent>
                            <MarginButton className="button" onClick={() => setShowEditForm(!showEditForm)}>Edit</MarginButton>
                        </ButtonParent>
                    }
                    </ProfileWrapper>
        
                {/* <ProfileInfo> */}
                    {/* <h3 className="bold">Username:</h3><p>{props.otherUser.username}</p> */}
               
                    </>} 
            
            {showEditForm && <>
            <OuterDiv2>
            <StyledLoader active={pictureLoading} spinner text='Uploading...'> 
                <ImageInput type='file' onChange={(e)=>{changeProfilePic(e.target.files[0])}} id='imageInput'/>
            </StyledLoader>
            </OuterDiv2>
            <ProOuter>
                <ProfileWrapper>
                    <label htmlFor='imageInput'>{props.otherUser.profile_picture ? (
                    <ProfileFilter>
                        <div className='editPicture'>
                            Edit
                            <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                        </div>
                        <ProfileImg  edit={true} style={{backgroundImage: `url('${props.otherUser.profile_picture}')`}}/>
                    </ProfileFilter>) : (
                    <ProfileFilter>
                        <div className='editPicture'>
                            Edit
                            <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                        </div>
                        <DefaultProfile edit={true} icon={faUserCircle}/>
                    </ProfileFilter>)}</label>
                     <SideContent>
                    <Name>{props.otherUser.name}</Name>
            
                </SideContent>
                </ProfileWrapper>
               
                {props.otherUser.profile_picture && <button className='button' onClick={deleteProfilePic}>Remove</button>}
            </ProOuter>
    
            <EditForm onSubmit={handleSubmit}>
    

            <Label><div><Title className="bold">Username</Title>    
                <div className='tooltip2'>
                 <Input className="text-input" name="username" onChange={handleChange} placeholder={props.otherUser.username} type="text"/> 
                 <span className={editUserName ? (usernameInvalid ? 'taken' : (usernameAvailable ? 'available' : 'taken')) : null}>{editUserName ? (usernameInvalid ? 'invalid' : (usernameAvailable ? 'available': 'taken')) : null}</span>
                </div></div>
           
            {/* <Label><h3 className="bold">Name</h3>
                <Input className="text-input" name="name" onChange={handleChange} placeholder={props.otherUser.name} />
            </Label>
  */}

            <div><Title className="bold">Email</Title>
                <Input className="text-input" name="email" type="email" onChange={handleChange} placeholder={props.otherUser.email !== null ? props.otherUser.email : ''} />
            </div></Label>
            <Label><div><Title className="bold">Cohort</Title>
                <Input className="text-input" name="cohort" type="text" onChange={handleChange} placeholder={props.otherUser.cohort !== null ? props.otherUser.cohort : ''} />
                </div>
        <div><Title className="bold">New password</Title>
                    <Input className="text-input" type='password' name="newPassword" onChange={handleChange} placeholder='New Password'/> </div>
            </Label>
           <PasswordDiv>
            {(enterPasswordField)&&<div>
                    <PassValidate>Re-enter password to save changes:</PassValidate>
                    <input className="text-input" type='password' name='oldPassword' onChange={handleChange} placeholder='Current Password' />
                </div>}
            </PasswordDiv> 
                {/* <br /><br /> */}
                <EditButton>
                {enterPasswordField && <ButtonParent><MarginButton className="button" type="submit">Submit Changes</MarginButton></ButtonParent>}
            {((props.currentUser.id == props.match.params.id || isAdmin) && !enterPasswordField) && <ButtonParent><MarginButton className="button" onClick={() => setShowEditForm(!showEditForm)}>{showEditForm && 'Cancel'}{!showEditForm && 'Edit'}</MarginButton></ButtonParent>}
            {/* DONT DELETE!! */}
            {/* {(props.currentUser.id == props.match.params.id || isAdmin) && 
                        <ButtonParent>
                            <button className="button" onClick={(e)=>{e.preventDefault();deleteAcc();}}>Delete Account</button>
                        </ButtonParent>
                    } */}
                </EditButton>
                
            </EditForm></>}

            </StyledLoader>  
            </MainChild>
        </Main>
    )
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        currentUser: state.AppReducer.currentUser,
        otherUser: state.AppReducer.otherUser,
    }
  }

export default connect(mapStateToProps, { getOtherUser, updateUser, adminUpdateUser, addProfilePicture, updateProfilePicture, deleteProfilePicture,
    adminAddProfilePicture, adminUpdateProfilePicture, adminDeleteProfilePicture, })(ViewAccount)


const StyledLoader = styled(LoadingOverlay)`
    width:100%;
    z-index: 2;
`;

const OuterDiv = styled.div `
    width: 100%;
    margin-top: 10rem;
    background: #fff;
`;
const OuterDiv2 = styled.div `
    width: 100%;
    ._loading_overlay_overlay{
        background: rgba(0, 0, 0, 0.5);
        margin-top: 23px;
    }
    ._loading_overlay_content{
        background: rgba(0, 0, 0, 0.5);
        padding: 50px;
    }
`;


const Div = styled.div `
    width: 100%;
`;
const ProOuter = styled.div `
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

`;
const MarginButton = styled.button `
 margin-bottom: 2%;
    
`;
const PasswordDiv = styled.div `
    margin-top: 50px;
    font-style: italic;
    color: #BF0033;
`;
const ImageInput = styled.input `
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 1px;
`;
const DefaultProfile = styled(FontAwesomeIcon) `
    position: absolute;
    width: 150px !important;
    height: 150px;
    /* border-radius: 50%; */
    background: white;
    ${props => props.edit && `
        &:hover {
            cursor: pointer;
            opacity: 0.2;
        }
    `
    }
`;
const ProfileImg = styled.div`
    position: absolute;
    /* border-radius: 50%; */
    width: 150px;
    height: 150px;
    border-radius: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    max-height: 100%;
    background-position: 50% 50%; 
    ${props => props.edit && `
        &:hover {
            cursor: pointer;
            opacity: 0.2;
        }
    `
    }
`;
const ProfileWrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    padding: 1%;
    width: 100%;
    
    `;
const ProfileFilter = styled.div `
    font-family: 'Patua One', sans-serif;
    width: 200px;
    height: 200px;
    display: flex;
    font-size: 3.5rem;
    align-items: center;
    justify-content: center;
    .editPicture {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const ProfileInfo = styled.div`
background: #fff;
display: flex;
justify-content: space-evenly;
align-items:center;

`

const Text1 = styled.h2 `
    text-transform: capitalize;
`
const Text2 =styled.h3`
    font-style: italic;
    font-size: 1.7rem;
`

const Text3 =styled.h5`
    text-transform: uppercase;
`

const Info = styled.div`

display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 80%;
`
// padding: 5%;

const Main = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;

background: #383651;
`

const MainChild = styled.div`
margin: 8% 0;
width: 65%;
background: #fff;
`

//here and down are edit form edits 
const EditForm = styled.form`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;


`

const EditContainer = styled.div`

`
// position: relative;
const Label = styled.label`
display: flex;
justify-content: space-evenly;
align-items: center;
max-width: 100%;
min-width: 100%;
width: 100%;
`
// text-align: center;
// display: flex;
// justify-content: space-between;
// align-items: center;
const Input = styled.input `
    @media (max-width: 1450px) {
        width:100%;
    }
`
//width: 100%;

const ButtonParent = styled.div `
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`
const EditButton = styled.div`
display: flex;
justify-content: space-evenly;
width: 70%;
margin: 5%;
align-items: center;
flex-direction: column;
`
const LabelContainer = styled.div `
    display: flex;
`

const LabelText = styled.h3 `
   
`

const PassValidate = styled.p`
text-align: center;


`

const SideContent = styled.div `
    display: flex;
    flex-direction:column;
    justify-content: space-evenly;
    align-items: center;
`
const Name = styled.h2 `
    text-transform: capitalize;
`

const Title = styled.h3`
text-align: center;
`