Build Week: Lambda DevDesk

Server deployed at: https://ddq.herokuapp.com/api
Server Documentation: https://documenter.getpostman.com/view/9136579/SW7aY7up?version=latest#intro

App deployed at: https://lambdadevdesk.now.sh

Dependencies used:
- jwt-decode
- axios
- react-router-dom
- styled-components
- react-loading-overlay
- less
- javascript-time-ago
- formik
- yup

<!-- redux
react-redux
redux-thunk

@testing-library/react -->

### Work flow:

*Beginning of day* 
- git pull origin development
- npm install
- less-watch-compiler src/LESS src index.less
- npm start
- Post what you're working on to Slack 

*Beginning of day* 
- Send pull request; add team as reviewers
- Post what you worked on to Slack 

Temporary Documentation:

Login.js:

Enter username and password. onSubmit, axios.get server's /api/auth/login endpoint. If username/password match a user on the server, a token containing the user object is returned and saved into sessionStorage, and then the user is redirected to their dashboard (helper > author). Link to SignUpForm at the bottom of login form.

SignUpForm.js

Form to create a new user. On Submit, new user object is sent to server. If username has not already been taken, it returns a success message (else error) and the form calls the login endpoint using the new user's username and password. Once that succeeds the user is redirected to their dashboard.

SignUpForm Validation:

Username: must start with a letter and may only contain a-z, _, and numbers.

Password: must be between 5 and 20 characters long and include one capitol letter, number, and special character.

Name: Cannot be null

Helper/author: One or both must be selected

Email/cohort: Optional inputs, not currently validated except email has input type:email.


PrivateRoute:

Allows access or redirects based off currentUser and token status. Routes:

if token exists:

    if path = /authorDashboard

        if currentUser.author render component

        else return 'Must be author!' and redirect home

    else if path = /HelperDashboard

        if currentUser.helper render component

        else return 'Must be helper!!' and redirect home

    if path = /Login

        return 'Already logged in!' and redirect to LogOff


else (token does not exist): return 'Must be logged in!' alert and redirect to login page. 
