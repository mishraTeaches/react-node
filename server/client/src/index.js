import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom';
import App from './components/App';

import reduxThunk from 'redux-thunk';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

const store=createStore(()=>reducers,{},applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 