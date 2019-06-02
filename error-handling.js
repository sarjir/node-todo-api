function createNotFoundStatus(res, errorMessage) {
  return res.status(404).json({
    status: '404',
    message: errorMessage
  })
};

module.exports = createNotFoundStatus;