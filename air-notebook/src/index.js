import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import './css/general.css';
import './css/replace_antDesign.css';
import './css/custome_antDesign.css';
import './css/scrollingBar.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
          <App />
      </Provider>
);

