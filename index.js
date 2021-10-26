exports.isValid = function (data) {
  // Check if the input value is a string
  if (typeof data === 'string' || data instanceof String) {

    // Remove all whitespaces and special characters
    const input = data.replace(/[^A-Z0-9]/ig, "");

    // Check input length min 2, max 9
    if (input.length > 1 && input.length <= 9) {
        // Check if the first character is a letter and the second character is a number
        if (/^[a-zA-Z()]+$/.test(input.charAt(0)) && !/^[a-zA-Z()]+$/.test(input.charAt(1))) {
          return 'One character prefix';
          // Check if the first two characters are a letter
      } else if (/^[a-zA-Z()]+$/.test(input.substring(0, 2))) {
        return 'Two characters prefix'
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};