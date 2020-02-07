import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/line-awesome/dist/line-awesome/css/line-awesome.min.css'; 
import './assets/styles/stack-interface.css';
import './assets/styles/theme.css';
import './assets/styles/bootstrap.css';
import './assets/styles/common.scss';
import 'toasted-notes/src/styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "./store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
