const ERRORS = {
  REQUEST_FAILED: {
    msg: 'Request failed\n Status Code: %param%',
    paramRequired: true
  },
  INVALID_CONTENT_TYPE: {
    msg: 'Invalid content-type\n Expected application/json but received %param%',
    paramRequired: true
  }
};

module.exports = ERRORS;
