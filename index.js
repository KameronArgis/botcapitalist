/**
 * Simple bot that fetch cryptocurrencies information and post them as a slack bot
 */

const https = require('https');
const util = require('util');
const config = require('./config/config.js');
const qs = require('qs');

const baseQueryParams = {
  token: config.API_TOKEN,
  channel: config.CHANNEL_ID,
  as_user: true,
  text: encodeURI('Here is the update !'),
  attachments: '',
};


/**
 * fetch currencies
 * function from the NodeJS http.get documentation
 * https://nodejs.org/api/http.html
 *
 * @param  {String} apiUrl api url
 * @return {?String}   Api url or error
 */
function fetchCurrencies(apiUrl) {
  return new Promise((resolve, reject) => {
    https.get(apiUrl, (res) => {
      const  statusCode  = res.statusCode;
      const contentType = res.headers['content-type'];

      var error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
                          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
                          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        reject(error);
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      var rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
          resolve(parsedData);
        } catch (e) {
          console.error(e.message);
          reject(e);
        }
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
  });
}


/**
 * return a valid attachment to put in the attachments array for the slack request
 *
 * @param  {Object} obj object that contain currency information
 * @return {Object}     Attachment to put in the attachments array
 */
function createAttachments(obj) {
  return {
    title: `*** ${obj.name} ***`,
    color: obj.symbol === 'BTC' ? '#FFCE54' : '#4FC1E9',
    // pretext: "*_Current date_*",
    text: `${obj.symbol}\n*$USD*: $${obj.price_usd}\n*1h*: ${obj.percent_change_1h}%\n*24H*: ${obj.percent_change_24h}%\n *last week*: ${obj.percent_change_7d}%`,
    mrkdwn_in: [
        "text",
        "pretext"
    ],
  }
}

/**
 * Send a message to slack with the updated currencies statues
 *
 * @return {Function}  Call slack API with correct params
 */
function updateCurrencyStatuses() {
  const currencies = fetchCurrencies(config.COINMARKET_API_URL).then(data => {
  const attachments = data.map(currency => createAttachments(currency));
  const finalUrl_bis = `${config.API_URL}${encodeURIComponent(JSON.stringify(attachments))}`;
  const finalUrl = `${config.BASE_URL}${qs.stringify(Object.assign({}, baseQueryParams, { attachments }))}`;

    console.log(finalUrl_bis);
    console.log(finalUrl)
    return https.get(finalUrl, (res) => {
      if (res.statusCode !== 200) {
        console.error('an error has occcured');
        res.resume();
        return;
      }
    });
  });



}

updateCurrencyStatuses();
