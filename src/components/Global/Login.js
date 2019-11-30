import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout, loadingStart, loadingDone } from '../../actions/AppActions.js';
import axios from 'axios';

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;
const LoginForm = styled.div`
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

        label {
            display: block;
            padding-bottom: 25px;
        }
    }
`;


function Login(props) {
    const [userCredentials, setUserCredentials] = useState({username: '', password: ''});
    
    const handleChange = (e) => {
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }
    // console.log(userCredentials);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        props.loadingStart();
        // console.log('Login.js handleSubmit userCredentials:', userCredentials);
        //send inputted user credentials and receive auth token and user object
        axios.post('https://ddq.herokuapp.com/api/auth/login', userCredentials)
        .then(res => {
            // console.log('axios: api/auth/login response: ', res);
            sessionStorage.setItem('token', res.data.token);
            props.login(res.data.user);
            props.loadingDone();
            //redirect to open queue
            props.history.push('/Dashboard/Unassigned');
        })
        .catch(err => {console.log('LOGIN CATCH ERROR: ', err);
        props.loadingDone();
        alert(err)});
        setUserCredentials({username: '', password: ''})
    }

    const logOut = () => {
        sessionStorage.removeItem('token');
        props.logout();
        props.history.push('/');
    }

    if (props.currentUser){
        return (
        <div>
            <h2>You're already logged in!</h2>
            <button className="button" onClick={logOut}>Sign out</button>
        </div>
        );
    }

    return (
        <StyledLoader active={props.loading} spinner text='Loading...'>   
            <LoginForm className="login-form">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input className="text-input" placeholder="Username" name='username' onChange={handleChange} />
                        </label>
                        <label>
                            <input className="text-input" placeholder="Password" type='password' name='password' onChange={handleChange} />
                        </label>
                        <button className="button fullwidth" type='submit'>Login</button>
                        <a href={`https://slack.com/oauth/authorize?scope=identity.basic&client_id=${process.env.CLIENT_ID}`}><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a>
                    </form>

                    <br />
                    <p>New here?</p>
                    <Link to='/Register'>Register an account</Link>
                </div>
            </LoginForm>
        </StyledLoader>   
    )
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        currentUser: state.AppReducer.currentUser,
        loading: state.AppReducer.loading,
        loginFailed: state.AppReducer.loginFailed,
    }
  }

export default connect(mapStateToProps, { login, logout, loadingStart, loadingDone })(Login)


