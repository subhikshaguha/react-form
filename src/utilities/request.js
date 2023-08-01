function isOffline(status) {
  return status === 0;
}

function isUnauthorized(status) {
  return status === 401;
}

function isInvalid(status) {
  return status === 400 || status === 422;
}

function isSuccess(status) {
  return status >= 200 && status < 300;
}

export { isOffline, isUnauthorized, isInvalid, isSuccess };
