import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import ToggleColorModeProvider from './utils/ToggleColorMode';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorModeProvider>
        <Router>
          <App />
        </Router>
      </ToggleColorModeProvider>
    </Provider>
  </React.StrictMode>
);
