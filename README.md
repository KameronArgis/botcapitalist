Slack bot that slack you in real time the course of crypto money
Here it will be BitCoin and Ethereum

# Config file

In order to make the script work you have to create a folder named `config`'

Inside this folder create a file `config.js`, that file will contain all constant relative to the different API connection

the file should look like this ( replace 'XXX' by your API TOKEN and the channel ID )

```
module.exports = {
  API_URL: 'https://slack.com/api/chat.postMessage?token=XXXXXXXXXXXX&channel=XXXXXXXXXXX&as_user=true&text=_Here%20are%20the%20news%20!_&attachments=',
  COINMARKET_API_URL: 'https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=2'
};
```
