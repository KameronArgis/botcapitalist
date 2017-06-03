/**
 * Return an error with an additional param
 *
 * @param  {Object} error error
 * @param  {String} param  param ton insert in the error if needed
 * @return {String}
 */
function getError(error, param) {
  if (!error || (error.paramRequired && !param)) {
    throw new Error('One or more required params are not specified');
  }

  const result = error.paramRequired ? error.msg.replace(/%param%/gi, param) : error.msg;
  return result
}


module.exports = {
  getError,
};
