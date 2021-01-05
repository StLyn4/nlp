const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const argv = require('yargs').argv;
const child_process = require('child_process');
const SA = require('./SA');

const app = express();
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
})

/*
 If I understand correctly,
 we need to redirect the request "through ourselves"
*/
app.get('/api/SentimentAnalysis', async function (req, res) {
  res.json(
    await SA.analyze(
      req.query.text
    )
  );
})

// designates what port the app will listen to for incoming requests
// Optionally, specify the port in the arguments: --port=3000
const port = argv.port || process.env.PORT || 3000;
app.listen(argv.mode === 'dev' ? 3000 : port, function () {
  if (argv.mode === 'dev') {
    console.log('The server for the API started on the 3000th port.');
    console.log('The development server will run on port 8080 (just wait).');
    child_process.spawn(
     'webpack-dev-server',
      ['--open', '--config', argv.config],
      {
        shell: true,
        stdio: "inherit"
      }
    );
  } else {
    console.log(`SA app listening on port ${port}!`);
  }
})
