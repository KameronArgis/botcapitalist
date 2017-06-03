/**
 * Simple bot that fetch cryptocurrencies information and post them as a slack bot
 */

const https = require('https');
const util = require('util');
const config = require('./config/config.js');
const qs = require('qs');
const fetchAPI = require('./app/network/fetchAPI.js');
const slackUtils = require('./app/slackUtils/index.js');

// time between each request, by default it's 1h
const refreshInterval = 60000 * 60;

// Query parameter to forge the request url
const queryParams = {
  token: config.API_TOKEN,
  channel: config.CHANNEL_ID,
  as_user: true,
  text: 'Here is the update !',
  attachments: [],
};


/**
 * Send a message to slack with the updated currencies statues
 *
 * @return {Function}  Call slack API with correct params
 */
function updateCurrencyStatuses() {
  const currencies = fetchAPI(https, config.COINMARKET_API_URL).then(data => {
  const attachments = data.map(currency => slackUtils.createAttachments(currency));

  const finalUrl = `${config.BASE_URL}${qs.stringify(
      Object.assign(
        {},
        queryParams,
        { attachments: encodeURIComponent(JSON.stringify(attachments)) }
      ),
      { encode: false}
    )}`;

    return fetchAPI(https, finalUrl).then((res) => {
      if (!res.ok) {
        console.error(' An error has occured');
        res.resume();
        return;
      }
    })
  });
}

setInterval(updateCurrencyStatuses, refreshInterval);
