import { isValidOrFail } from "./validate.js";

/**
 * @typedef {Object} Plate
 * @property {string} area - The area id of the vehicle.
 * @property {number} id - Id number of the vehicle.
 * @property {string} serial - Serial string of the vehicle.
 */

/**
 * Parses a vehicle's sign/registration number.
 * @constructor
 * @param {string} plateNumber - The plate number string to parse.
 * @returns {Plate} Plate - Parsed plate number.
 */
function parse(plateNumber) {
  isValidOrFail(plateNumber);

  const match = plateNumber.match(/^([A-Z]+)(\d+)([A-Z]*)$/);

  if (!match) {
    throw new Error("Invalid format");
  }

  const [_, area, id, serial] = match;
  return {
    area,
    id: parseInt(id, 10),
    serial,
  };
}

export { parse };
