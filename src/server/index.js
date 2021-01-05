const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SA = require('./SA');
const argv = require('yargs').argv;

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
app.listen(port, function () {
  console.log(`SA app listening on port ${port}!`);
})
