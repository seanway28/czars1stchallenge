import React from 'react';
import ReactDOM from 'react-dom';
import jobSearch from './jobSearch';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
<React.StrictMode>
    <App />,
    </React.StrictMode>,
  document.getElementById('root'));

  export default function Indeed(url = 'http://api.indeed.com/', publisherId) {
  if (!publisherId) {
    throw Error('An Indeed publisher id is required');
  } else {
    return {
      jobSearch: () => new jobSearch(url, publisherId)
    };
  }
}


reportWebVitals();