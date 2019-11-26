import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
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

import { getCurrentUser, loadingDone } from './actions/AppActions.js';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';

const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
`;

function App(props) {

  const [searchType, setSearchType] = useState('Category');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByHelperStudentBoth, setFilterByHelperStudentBoth] = useState('All');
  const [filterByOpenClosedAll, setFilterByOpenClosedAll] = useState('All');

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
  
  console.log('App Props.CurrentUser', props.currentUser)
  console.log('App Props.Loading', props.loading)


  return (
    <CurrentUserContext.Provider value={{ 
      searchTerm, setSearchTerm, filterByHelperStudentBoth, setFilterByHelperStudentBoth,
      filterByOpenClosedAll, setFilterByOpenClosedAll, searchType, setSearchType }}>
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
          </div>
          }
          <Footer />
        </div>
      </StyledLoader>
    </CurrentUserContext.Provider>
  );
}

const mapStateToProps = state => {
    // console.log('mapstatetoprops: ', state);
    return {
        currentUser: state.AppReducer.currentUser,
        loading: state.AppReducer.loading,
        loginFailed: state.AppReducer.loginFailed,
    }
  }

export default connect(mapStateToProps, { getCurrentUser, loadingDone })(App)