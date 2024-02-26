import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import ErrorBoundary from './ErrorBoundary';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // <ErrorBoundary>
  <Provider store={store}>
    <App />
  </Provider>,
  // </ErrorBoundary>
  // </React.StrictMode>
);


