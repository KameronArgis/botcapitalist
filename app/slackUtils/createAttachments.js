const constants = require('./constants.js');

/**
 * return a valid attachment to put in the attachments array for the slack request
 *
 * @param  {Object} obj object that contain currency information
 * @return {Object}     Attachment to put in the attachments array
 */
function createAttachments(obj) {
  return {
    title: `*** ${obj.name} ***`,
    color: constants.COLORS[obj.symbol],
    // pretext: "*_Current date_*",
    text: `${obj.symbol}\n*$USD*: $${obj.price_usd}\n*1h*: ${obj.percent_change_1h}%\n*24H*: ${obj.percent_change_24h}%\n *last week*: ${obj.percent_change_7d}%`,
    mrkdwn_in: [
        "text",
        "pretext"
    ],
  }
}

module.exports = createAttachments;
