import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { CourseBuilderReducer } from './reducers/CourseBuilderReducer.js'
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import './css/index.css';


const store = createStore(CourseBuilderReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><Router><App/></Router></Provider>, document.getElementById('root'));
