import React, { useState } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { login } from '../../actions/AppActions.js';
import { isValidPassword , validateInputs } from '../../utils/AppUtils.js';

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

function SignUpForm(props) {
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserCohort, setNewUserCohort] = useState('');

  // console.log('newUser: ', newUser);

  const handleChange = e => {
    if (e.target.name === 'email'){
      setNewUserEmail(e.target.value);
    }
    else if (e.target.name === 'cohort'){
      setNewUserCohort(e.target.value);
    }
    else{
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // #region build user obj to send to validate
    if (newUserEmail !== "") {
      //email is not a required input- to validate check if it is not null then check the data
      //empty strings cannot be sent to the backend as they will be stored incorrectly- 
      //so if email/cohort is empty we will not send them on the user object

      //add to newUser obj since not null
      setNewUser({...newUser, email: newUserEmail})
    }
    if (newUserCohort !== "") {
      //cohort is not a required input- to validate check if it is not null then check the data
      //empty strings cannot be sent to the backend as they will be stored incorrectly- 
      //so if email/cohort is empty we will not send them on the user object

      //add to newUser obj since not null
      setNewUser({...newUser, cohort: newUserCohort});
    }
    // #endregion

    console.log('newUser: ', newUser);
    if (validateInputs(newUser) && isValidPassword(newUser.password)) {
      setLoading(true);
      axios
        .post("https://ddq.herokuapp.com/api/auth/register", newUser)
        .then(res => {
          // console.log('axios: api/auth/register response: ',res);
          // alert("Signed up! Logging in now..");
          axios
            .post("https://ddq.herokuapp.com/api/auth/login", {
              username: newUser.username,
              password: newUser.password
            })
            .then(res => {
              // console.log('axios: api/auth/login response: ', res);
              sessionStorage.setItem("token", res.data.token);
              props.login(res.data.user);
              // alert(res.data.message);
              // console.log('Decoded token', decode(res.data.token));

              //redirect to open queue
              setLoading(false);
              props.history.push('/Dashboard/OpenTickets');
            })
            .catch(err => {
              console.log("SignUp Login Catch Error: ", err.response.data.message);
              setLoading(false);
              alert(err.response.data.message);
            });
        })
        .catch(err => {
          console.log("SignUp Catch Error: ", err.response.data.message);
          setLoading(false);
          alert(err.response.data.message);
        });
    // console.log(newUser);
    } else {
      // console.log("SignUpForm.js validateInputs returned false");
    }
  };

  return (
    <StyledLoader active={loading} spinner text='Loading...'>
      <SignUpWrap className="sign-up-form">
        <div className="card">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input className="text-input" name="username" onChange={handleChange} placeholder="username" />
            <input className="text-input" name="password" type="password" onChange={handleChange} placeholder="password" />
            <input className="text-input" name="name" onChange={handleChange} placeholder="name" />
            <input className="text-input" name="email" type="email" onChange={handleChange} placeholder="email" />
            <input className="text-input" name="cohort" type="text" onChange={handleChange} placeholder="cohort" />
            <button className="button fullwidth" type="submit">Submit</button>
          </form>
        </div>
      </SignUpWrap>
    </StyledLoader>
  );
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        currentUser: state.AppReducer.currentUser,
        loginFailed: state.AppReducer.loginFailed,
    }
  }

export default connect(mapStateToProps, { login, })(SignUpForm)

//Styled Components

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;
const SignUpWrap = styled.div `
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: start;

        .card {
            width: 50%;
            margin-top: 40px;
            padding: 5%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        form {

          width: 360px;

          input:not([type=checkbox]) {
            margin-bottom: 15px;
          }

          label {
            display: block;
          }

          .checkbox-group {
            display: flex;
            justify-content: center;
            margin-top: 5px;
            margin-bottom: 20px;

            label {
              padding-right: 1.5rem;
              font-weight: 700;
            }

            input[type=checkbox] {
              
            }
          }
            
        }
    `