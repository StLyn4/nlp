import axios from 'axios';
import buildTable from './tableBuilder';

const input = document.getElementById('SA-Text');
const output = document.getElementById('output');
const results = document.getElementById('results');
const subResults = document.getElementById('sub_results');
const error = document.getElementById('error');
const errorMsg = document.getElementById('error_msg');

const SentimentAnalysisHREF = `${location.origin}/api/SentimentAnalysis`;

export default {
  onInputBlur: e => {
    if (!input.value) {
      input.classList.add('error');
    }
  },
  onInputFocus: e => {
    input.classList.remove('error');
  },
  onButtonClick: async e => {
    results.style.display = 'none';
    error.style.display = 'none';
    if (input.value) {
      const result = (await axios.get(SentimentAnalysisHREF, {
        params: {
          text: input.value
        }
      })).data;
      if (result.status === 'ok') {
        const data = result.data;
        output.innerHTML = buildTable(data);
        subResults.textContent = `Text is ${data.subjectivity.toLowerCase()} and ${data.irony.toLowerCase()}.`;
        results.style.display = 'flex';
      } else {
        const status = result.data.status;
        errorMsg.textContent = `(code #${status.code}) ${status.msg}.`;
        error.style.display = 'flex';
      }
    } else {
      input.classList.add('error');
    }
  }
};
