import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


navigator.serviceWorker.getRegistrations().then(

  function(registrations) {

      for(let registration of registrations) {
          registration.unregister();

      }

});
