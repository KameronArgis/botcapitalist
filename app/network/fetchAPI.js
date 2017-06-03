const errorService = require('../errors/index.js');
const ERRORS = errorService.ERRORS;
const getError = errorService.services.getError;

/**
 * fetch API url and return the result
 * function from the NodeJS http.get documentation
 * https://nodejs.org/api/http.html
 *
 * @param  {Object} protoco http/https
 * @param  {String} apiUrl api url
 * @return {?String}   Api url or error
 */
function fetchAPI(protocol, apiUrl) {
  return new Promise((resolve, reject) => {
    protocol.get(apiUrl, (res) => {
      const  statusCode  = res.statusCode;
      const contentType = res.headers['content-type'];

      var error;
      if (statusCode !== 200) {
        error = new Error(getError(ERRORS.REQUEST_FAILED, statusCode));
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(getError(ERRORS.INVALID_CONTENT_TYPE, contentType));
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

module.exports = fetchAPI;
