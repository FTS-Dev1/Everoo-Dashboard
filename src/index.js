import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';

//  component
import App from './App';

// Redux
import { store } from './Redux/store';
import { Provider } from 'react-redux';

// GoogleAuth Provider :
import { GoogleOAuthProvider } from '@react-oauth/google';

// CSS :
import './index.scss';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ACCOUNT_CLIENT_ID}> */}
      <GoogleOAuthProvider clientId="305056338289-1av2tf59fbr6il7nilhuhcummmviarjr.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);