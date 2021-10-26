exports.isValid = function (input) {
  // Check if the input value is a string
  if (typeof input === 'string' || input instanceof String) {
    return true
  } else {
    return false
  }
}