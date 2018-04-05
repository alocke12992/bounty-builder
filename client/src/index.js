import React from 'react';
import App from './components/App';
import ReactDOM from 'react-dom';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker, { unregister, } from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'react-quill/dist/quill.snow.css';
import './assets/stylesheets/quill-css-fix.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

navigator.serviceWorker
  .getRegistrations()
  .then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
