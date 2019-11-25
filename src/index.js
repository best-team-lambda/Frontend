import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index.js'
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import './css/index.css';


const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><Router><App/></Router></Provider>, document.getElementById('root'));
