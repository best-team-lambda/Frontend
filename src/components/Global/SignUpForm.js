import React, { useState } from "react";
import axios from "axios";

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

export default function SignUpForm(props) {
  const [loading, setLoading] = useState('');
  const [setCurrentUser] = useState('');
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    name: "",
    helper: true,
    student: true,
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
    // console.log(newUser);
  };

  // const toggleBool = e => {
  //   // console.log('e.target.name: ', e.target.name);
  //   if (e.target.name === "helper") {
  //     setNewUser({ ...newUser, helper: !newUser.helper });
  //   } else if (e.target.name === "student") {
  //     setNewUser({ ...newUser, student: !newUser.student });
  //   }
  // };

  const handleSubmit = e => {
    e.preventDefault();
    // e.target.reset();
    console.log('newUser: ', newUser);
    if (validateInputs()) {
      // console.log('SignUpForm.js validateInputs returned true');
        setLoading(true);
      axios
        .post("https://ddq.herokuapp.com/api/auth/register", newUser)
        .then(res => {
          // console.log('axios: api/auth/register response: ',res);
          alert("Signed up! Logging in now..");
          axios
            .post("https://ddq.herokuapp.com/api/auth/login", {
              username: newUser.username,
              password: newUser.password
            })
            .then(res => {
              // console.log('axios: api/auth/login response: ', res);
              setCurrentUser({...res.data.user});
              sessionStorage.setItem("token", res.data.token);
              alert(res.data.message);
              // console.log('Decoded token', decode(res.data.token));

              //redirect to open queue
            setLoading(false);
              props.history.push('/Dashboard/Unassigned');
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

  const isValidPassword = password => {
    if (password === "") {
      alert("You must enter a password.");
      return false;
    }
    if (password.length < 5 || password.length > 20) {
      alert("Password cannot be less than 5 or greater than 20 characters");
      return false;
    }
    if (!/(!|@|#|\$|&|\*|%|^)/.test(password)) {
      alert("Password must contain at least one special character");
      return false;
    }
    if (!/([A-Z])/.test(password)) {
      alert("Password must contain at least one capitalized letter");
      return false;
    }
    if (!/([0-9])/.test(password)) {
        alert("Password must contain at least one number");
        return false;
    }
    return true;
  };

  const validateInputs = () => {
    // console.log("validate Firing");
    if (newUser.username === "") {
      alert("You must enter a username.");
      return false;
    }
    else if(!(/^[a-z][a-z0-9_]*$/i.test(newUser.username))) {
      alert("Username must start with a letter and may only contain a-z, _, or numbers.");
      return false;
    }
    if (!isValidPassword(newUser.password)) {
      return false;
    }
    if (newUser.name === "") {
      alert("You must enter your name.");
      return false;
    }
    if (newUser.helper === false && newUser.student === false) {
      alert("You must choose to enroll as a helper, student, or both.");
      return false;
    }
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
    return true;
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
{/*             
            <div className="checkbox-group">
            <label> I'm a Student&nbsp;
                <input name="student" type="checkbox" onChange={toggleBool} />
              </label>
              <label> I'm a Helper&nbsp;
                <input name="helper" type="checkbox" onChange={toggleBool} />
              </label>
              
            </div> */}
            
            <button className="button fullwidth" type="submit">Submit</button>
          </form>
        </div>
      </SignUpWrap>
    </StyledLoader>
  );
}

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