import React from 'react';
import ReactDOM from 'react-dom';
import browserHistory from './browser-history';
import {Router as BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import rootReducer from './store/root-reducer';
import App from './components/app/app';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById(`root`)
);

/**
 *
 * Minor functions
 *
 * window.log = (text) => {
 *  return console.log(text); // eslint-disable-line no-console
 * };
 *
 * window.s = store;
 *
 */
