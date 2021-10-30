const { prefix } = require("./data/prefix");
const { specialCode } = require("./data/specialCode");

function checkPrefix(inputPrefix) {
  return inputPrefix in prefix ? true : false
}

function checkSpecialCode(inputSpecialCode) {
  return inputSpecialCode in specialCode ? true : false
}

exports.isValid = function (data) {
  // Check if the input value is a string
  if (typeof data === 'string' || data instanceof String) {

    // Remove all whitespaces and special characters and capitalize it
    const input = data.replace(/[^A-Z0-9]/ig, "").toUpperCase();

    // Check input length min 2, max 9
    if (input.length > 1 && input.length <= 9) {

      // Check if the first two characters are a letter
      if (/^[a-zA-Z()]+$/.test(input.substring(0, 2))) {
        const inputPrefix = input.substring(0, 2)
        // Check if prefix is special
        if (inputPrefix == 'CC' || inputPrefix == 'CD' || inputPrefix == 'CH') {
          const specialCode = input.match(/\d/g).join("")
          if(checkSpecialCode(specialCode)) {
            console.log(specialCode);
            return true
          } else {
            // Country code invalid
            return false
          }
        } else {
          // Check rest of the double prefix
          return checkPrefix(input.substring(0, 2))
        }
      } else {

        // Check if the first character is a letter and the second character is a number
        if (/^[a-zA-Z()]+$/.test(input.charAt(0)) && !/^[a-zA-Z()]+$/.test(input.charAt(1))) {
          return checkPrefix(input.charAt(0))
        } else {
          return false;
        }

      }

    } else {
      return false;
    }
  } else {
    return false;
  }
};