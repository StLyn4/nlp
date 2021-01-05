// Main JS file
import axios from 'axios';
import evs from './eventFuncs';

const input = document.getElementById('SA-Text');
const button = document.getElementById('AnalyzeBtn');

// Axios global error handling
axios.interceptors.response.use(response => response, error => {
  // Log error and reject
  console.error('Error detected: ' + error);
  return Promise.reject(error);
});

input.addEventListener('blur', evs.onInputBlur);
input.addEventListener('focus', evs.onInputFocus);
button.addEventListener('click', evs.onButtonClick);
