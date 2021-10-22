const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001;// 3001번을 사용

const request = require('request');
const api_url = 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation';
const client_id = 'nnvvqfld2i';
const client_secret = 'JnxPip9XK1Cqykgk2UOLiEeYFe3xIG4ghsThzpDI';
let results = '';
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const translate = (query) => {
  const options = {
    url: api_url,
    form: {
      source: 'ko',
      target: 'en',
      text: query,
    },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': client_id,
      'X-NCP-APIGW-API-KEY': client_secret,
    },
  };

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const obj = JSON.parse(body);
      results = obj.message.result.translatedText;
      console.log(results);
    } else {
      console.log('error = ' + response.statusCode);
    }
  });
}

app.post('/api', (req, res) => {
  const postmsg = req.body.post;
  translate(postmsg);
});

router.get("/",(req, res) => {
  res.send({host: results });
});

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

module.exports = router;