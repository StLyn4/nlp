const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

// Axios global error handling
axios.interceptors.response.use(response => response, error => {
  // Log error and reject
  console.error('Error detected: ' + error);
  return Promise.reject(error);
});

module.exports = {
  async analyze(text) {
    if (text) {
      const result = await axios.get(
        'https://api.meaningcloud.com/sentiment-2.1', {
          params:
          {
            key: API_KEY,
            lang: 'auto',
            ilang: 'en',
            txt: text,
            egp: 'y',
            uw: 'y'
          }
        });
      return {
        status: result.data.status.code === '0' ? 'ok' : 'err',
        data: result.data
      }
    }
  }
};
