/**
 * Check if a string format is a valid plate number format or not. Throws an error if it's not valid.
 * @constructor
 * @param {string} plateNumber - The plate number string to parse.
 * @returns {boolean} True if the the plate number is valid.
 * @throws {TypeError} Throws an error if the plate number is not valid.
 */
function isValidFormat(str) {
  // Regular expression to match the required format
  const regex = /^[A-Za-z]{1,3}\d{1,4}[A-Za-z]{0,3}$/;

  // Check if the string matches the regular expression
  if (!regex.test(str)) {
    return false;
  }

  // Extract numeric part and check if it is between 1 and 9999
  const numericPart = str.match(/\d+/);
  if (numericPart) {
    const num = parseInt(numericPart[0], 10);
    if (num < 1 || num > 9999) {
      return false;
    }
  }

  return true;
}

/**
 * Check if a string is a valid plate number or not. Throws an error if it's not valid.
 * @constructor
 * @param {string} plateNumber - The plate number string to parse.
 * @returns {boolean} True if the the plate number is valid.
 * @throws {TypeError} Throws an error if the plate number is not valid.
 */
function isValidOrFail(plateNumber) {
  if (typeof plateNumber !== "string") {
    throw new Error("plate number must be a string");
  }

  if (plateNumber.length > 9) {
    throw new Error("plate number must be less than 9 characters");
  }

  if (!isValidFormat(plateNumber)) {
    throw new Error(
      `plate number: ${plateNumber} is not valid and must be in the format AA0000XXX`,
    );
  }

  return true;
}

/**
 * Check if a string is a valid plate number or not.
 * @constructor
 * @param {string} plateNumber - The plate number string to parse.
 * @returns {boolean} isValid - True if the plate number is valid, false otherwise.
 */
function isValid(plateNumber) {
  try {
    isValidOrFail(plateNumber);
    return true;
  } catch (error) {
    return false;
  }
}

export { isValid, isValidOrFail, isValidFormat };
