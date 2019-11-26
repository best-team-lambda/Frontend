import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const [currentUser] = useState(rest.props.currentUser)
  // console.log('privateRoute Rest: ', rest);
  // console.log('privateroute currentuser', currentUser);
  return (
    <Route
      {...rest}
      render={props => {
        console.log('route props?', rest.currentUser)
        if (sessionStorage.getItem('token') && rest.currentUser) {
          //render component if user is logged in and has a token
          return <Component {...props} />;
        }
        else {
          // console.log('PrivateRoute: token == false');
          alert('You must be logged in to view this page.');
          return <Redirect to='/Login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;