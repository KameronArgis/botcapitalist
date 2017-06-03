const expect = require('chai').expect;
const ERRORS = require('./constants.js');
const getError = require('./service.js').getError;

describe('service', () => {
  it('Should return message with param %param% replaced by the given param', () => {
    const param = '404';
    const expectedResult = getError(ERRORS.REQUEST_FAILED, param).includes(param);
    const notExpectedResult = getError(ERRORS.REQUEST_FAILED, param).includes('%param%');

    expect(expectedResult).to.equal(true);
    expect(notExpectedResult).to.equal(false);
  });

  it('Should return an error if a required param is not specified', () => {
    try {
      getError(ERRORS.REQUEST_FAILED)
    } catch(e) {
      expect(e.message).to.equal('One or more required params are not specified');

    }
  });
});
