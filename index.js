const functions = require('firebase-functions');
const axios = require('axios');
var HTMLParser = require('node-html-parser');
const phantom = require('phantom');

exports.udemy = functions.https.onRequest((request, response) => {
  return axios.get('https://www.udemy.com/user/guillaume-d-5/')
    .then((res) => {
      const count = HTMLParser.parse(res.data).querySelector('.udlite-heading-xl').textContent;
      return response.status(200).json({
        "frames": [
          {
            "icon": 43424,
            "text": parseInt(count.replace(',', ''))
          }
        ]
      })
    })
    .catch(() => {
      return response.status(500).json({
        "frames": [
          {
            "icon": 43424,
            "text": "Error"
          }
        ]
      })
    })
});

