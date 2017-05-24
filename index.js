const https = require('https');
const util = require('util');




const test = https.get(COINMARKET_API_URL, (res) => {
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
    console.log(util.inspect(error,false, null));
    // consume response data to free up memory
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
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});

//GET request to this url to post a message on slack
const API_URL = ;

function updateCurrencyStatuses() {
  const currencies = fetch(COINMARKET_API_URL);
  const attachments = currencies.map(currency => createAttachments(currency));
  const finalUrl = `${API_URL}${encodeURIComponent(JSON.stringify(attachments))}`;
  return fetch(finalUrl);
}

//How data should look like in attachments params (take only the array of object not the key "attachments")
const message_sample = {
    "attachments": [
        {
            "title": "Title",
            "pretext": "Pretext _supports_ mrkdwn",
            "text": "Testing *right now!*",
            "mrkdwn_in": [
                "text",
                "pretext"
            ]
        },
		 {
            "title": "Title",
            "pretext": "*Pretext _supports_ mrkdwn*",
            "text": "Testing *right now!*\n Another test",
            "mrkdwn_in": [
                "text",
                "pretext"
            ]
        }
    ]
};

// How data should look like from the coinmarket API
const currencySample = [
	{
		"id": "bitcoin",
		"name": "Bitcoin",
		"symbol": "BTC",
		"rank": "1",
		"price_usd": "573.137",
		"price_btc": "1.0",
		"24h_volume_usd": "72855700.0",
		"market_cap_usd": "9080883500.0",
		"available_supply": "15844176.0",
		"total_supply": "15844176.0",
		"percent_change_1h": "0.04",
		"percent_change_24h": "-0.3",
		"percent_change_7d": "-0.57",
		"last_updated": "1472762067"
	},
	{
		"id": "ethereum",
		"name": "Ethereum",
		"symbol": "ETH",
		"rank": "2",
		"price_usd": "12.1844",
		"price_btc": "0.021262",
		"24h_volume_usd": "24085900.0",
		"market_cap_usd": "1018098455.0",
		"available_supply": "83557537.0",
		"total_supply": "83557537.0",
		"percent_change_1h": "-0.58",
		"percent_change_24h": "6.34",
		"percent_change_7d": "8.59",
		"last_updated": "1472762062"
	},
];


/**
 * return a valid attachment to put in the attachments array for the slack request
 *
 * @param  {Object} obj object that contain currency information
 * @return {Object}     Attachment to put in the attachments array
 */
function createAttachments(obj) {
  return {
    title: obj.name,
    pretext: "*_Current date_*",
    text: `${obj.symbol}\n${obj.price_usd}\n${obj.percent_change_1h}\n${obj.percent_change_24h}\n${obj.percent_change_7d}`,
    mrkdwn_in: [
        "text",
        "pretext"
    ],

  }
}
