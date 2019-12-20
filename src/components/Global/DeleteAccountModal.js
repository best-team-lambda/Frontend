import React,{useState} from 'react'
import styled from 'styled-components'
import axiosWithAuth from "../../utils/axiosWithAuth"
import {useHistory} from "react-router-dom"
import {wipeOtherUser} from "../../actions/AppActions"
import {connect} from "react-redux"
import {logout} from "../../actions/AppActions"

function DeleteAccountModal(props) {
    const [currentPassword,setCurrentPassword] = useState('')
    const [error,setError] = useState('')
    const history = useHistory();
    const handleChange = (e) => {
        setCurrentPassword(e.target.value)
    }

    const deleteAcc = () => {
            axiosWithAuth().delete('/users/user', {data: {password: currentPassword}}).then(()=>{
                sessionStorage.removeItem('token');
                props.logout()
                setCurrentPassword("")
                history.push('/');
            }).catch(err => {
                setError("Invalid Credentials")
                setCurrentPassword("")
                setTimeout(()=>{
                    setError("")
                },1500)
            })
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        deleteAcc()
    }

    const closeModal = () => {
        const modal = document.getElementById('modal') 
        modal.style.display='none'
    }


    return (
        <Modal id="modal">
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Are You Sure You Want To Delete Your Account?</ModalTitle>
                    <CloseBtn onClick={closeModal}>&times;</CloseBtn>
                </ModalHeader>
                <ModalBody>
                    <label>By entering your password and clicking on continue you will loose access to DevDesk immediately:</label>
                    <Input 
                        type='password' 
                        placeholder="Enter Password To Continue"
                        onChange={handleChange}
                        />
                    <p style={{color:'red'}}>{error}</p>
                    <ButtonContainer>
                        <button class='button' onClick={handleSubmit}>Delete</button>
                    </ButtonContainer>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default connect(null,{logout})(DeleteAccountModal);
const Modal = styled.div `
    display: none;
    position: fixed;
    z-index:100000;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5)
`
const ModalContent = styled.div `
    background-color: #f4f4f4;
    margin: 20% auto;
    padding: 20px;
    width: 50%;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2),0 7px 20px 0 rgba(0,0,0,0.17);

`

const CloseBtn = styled.div `
    display: flex;
    justify-content: flex-end;
    font-size: 3rem;
    margin: 0;
    padding: 0;
    &:hover, &:focus{
        cursor: pointer;
        color: #000;
        text-decoration:none;
    }
`

const ModalHeader = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px black solid;
`

const ModalTitle = styled.h3 `
    font-size: 2rem;
    margin: 0;
    padding: 0;
`

const ModalBody = styled.div `
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
`

const Input = styled.input `
    border: none;
    border-bottom: 1px #333 solid;
    background: #f4f4f4;
    padding-top: 1rem;
    margin-top: 0.7rem;
    outline: none;
    width: 230px;
`

const ButtonContainer = styled.div `
    display: flex;
    justify-content: flex-end;
` 