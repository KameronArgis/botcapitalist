# Bot Capitalist

This tiny bot use the slack API to send you updates about some crypto currencies status.
For now it only sends you updates about Bitcoin and Ethereum but you can change the configuration so it will send the currency of your choice.

Big Thanks to Coinmarketcap that provide the API.
Before going down the application you should already have created a custom slackbot and get its ID
and the channel id you want the bot to send messages to

## Installation

Install the dependencies for the project
```
npm install
```

## Configuration

In order to allow the application send message throught slack as a bot you should create a configuration file that will contain all usefull information like API keys etc...

So first create a folder named `config` then a config file
Open your terminal, go to your project location
```
mkdir config
cd config
touch config.js
```

Once the file config is created inside the folder config we will edit the config file to it contain the required information to contact the slack API

So open the file `config.js` and write the code below (do not forget to replace the placeholders by your actual informations :) )
```
module.exports = {
  BASE_URL: 'https://slack.com/api/chat.postMessage?',
  API_TOKEN: YOUR_API_TOKEN,
  CHANNEL_ID: THE_CHANEL_ID_YOU_WANT_THE_BOT_TO_SEND_MESSAGE_TO,
  COINMARKET_API_URL: 'https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=2'
};
```

Then you can launch the server using `node index.js` or `nodemon index.js`
You can adjust the intervall between each message by changing the value of `refreshInterval` in the index.js for now it send a message every hour.

I will update this soon to allow you to choose the number of currencies you want to display, for now it's 2.
If you want more currencies supported or you want to change the colours i used you can edit `app/slackUtils/constants.js` and then update the number of currencies that we are requesting.

If you have any ideas that can improve this feel free to contact me, i will be glad to enhance it :) 
