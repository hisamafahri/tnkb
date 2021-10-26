exports.isValid = function (data) {
  // Check if the input value is a string
  if (typeof data === 'string' || data instanceof String) {
    
    // Remove all whitespaces and special characters
    const input = data.replace(/[^A-Z0-9]/ig, "");

    // Check input length
    if (input.length > 1 && input.length <= 9) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};