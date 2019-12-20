import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, useLocation } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

import Header from './components/Global/Header';
import LandingPage from './components/Global/LandingPage';
import Login from './components/Global/Login';
import SignUpForm from './components/Global/SignUpForm';
import Footer from './components/Global/Footer';
import Credits from './components/Global/Credits';
import Dashboard from './components/Dashboard/Dashboard.js'

import { getCurrentUser, wipeOtherUser, loadingDone } from './actions/AppActions.js';
import { wipeTicket } from './actions/TicketActions.js'

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    z-index: 2;
`;

function App(props) {
  const location = useLocation();
  // console.log('App Props.CurrentUser', props.currentUser)
  // console.log('App Props.Loading', props.loading)
  
  useEffect(() => {
    //if currentUser is null, load data from server if you have a token. 
    //otherwise if you don't have a token you will be unable to access private routes and will be redirected to login page if you try.
      if (!props.loginFailed && !props.currentUser && sessionStorage.getItem('token')){
        props.getCurrentUser();
      }
      else{
        props.loadingDone();
      }
  }, [props.currentUser, props.loading])

  useEffect(() => {
    // Wipe other user so that no data is carried through when clicking a different user to view. This way it will look blank every time.
    if(props.otherUser && location.pathname !== `/Dashboard/Account/${props.otherUser.id}`){
      props.wipeOtherUser();
    }
    if(props.ticket.id && location.pathname !== `/Dashboard/Tickets/${props.ticket.id}`){
      props.wipeTicket();
    }
  }, [props.otherUser, location, props.ticket])

  return (
      <StyledLoader active={props.loading} spinner text='Loading...'>
        <div className='App'>
          <Route path='/' render={props => <Header {...props} />} />
          <Route exact path='/' render={props => <LandingPage {...props} />} />
          <Route exact path='/Login' render={props => <Login {...props} />} />
          <Route exact path='/Credits' render={Credits} />
          {!props.loading && 
          <div className="main-content">
            <Route exact path='/Register' render={props => <SignUpForm {...props} />} />
            <PrivateRoute path='/Dashboard' component={Dashboard} currentUser={props.currentUser} />
          </div>}
          <Footer />
        </div>
      </StyledLoader>
  );
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        currentUser: state.AppReducer.currentUser,
        otherUser: state.AppReducer.otherUser,
        ticket: state.TicketReducer.ticket,
        loading: state.AppReducer.loading,
        loginFailed: state.AppReducer.loginFailed,
    }
  }

export default connect(mapStateToProps, { getCurrentUser, wipeOtherUser, wipeTicket, loadingDone })(App)

// import {useSelector, useDispatch} from 'react-redux';
// import {getCurrentUser, loadingDone} from './actions/AppActions.js';

// const dispatch = useDispatch();

//get state from store using useSelector
// const [currentUser, loading] = useSelector(state => [state.AppReducer.currentUser, state.AppReducer.loading]);

// ^^^ same thing as
// const currentUser = useSelector(state => state.AppReducer.currentUser);
// const loading = useSelector(state => state.AppReducer.loading);


// use actions with useDispatch 
// dispatch(getCurrentUser());
// dispatch(loadingDone());