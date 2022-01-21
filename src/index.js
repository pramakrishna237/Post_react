import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
//React.render(, document.getElementById('app'));

reportWebVitals();
