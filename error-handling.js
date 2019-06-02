function createNotFoundStatus(res, errorMessage) {
  return res.status(404).json({
    status: '404',
    message: errorMessage
  })
};

function handleFalseyData({ response, result = {}, resultErrorMsg = '', internalError = null } = {}) {
  if (internalError) {
    return createNotFoundStatus(response, internalError);
  }

  if (!result) {
    return createNotFoundStatus(response, resultErrorMsg);
  }
}

module.exports = {
  createNotFoundStatus,
  handleFalseyData
}
