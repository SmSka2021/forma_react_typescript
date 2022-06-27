




/**
 * Validates whether a field has a value
 //* param {IValues} values - All the field values in the form
 * param {string} fieldName - The field to validate
 * returns {string} - The error message
 */
/*s export const required = (values: IValues, fieldName: string): string =>
 values[fieldName] === undefined ||
 values[fieldName] === null ||
 values[fieldName] === ""
   ? "This must be populated"
   : "";

/**
* Validates whether a field is a valid email
* param {IValues} values - All the field values in the form
* param {string} fieldName - The field to validate
* returns {string} - The error message
*/
/*export const isEmail = (values: IValues, fieldName: string): string =>
 values[fieldName] &&
 values[fieldName].search(
   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
 )
   ? "This must be in a valid email format"
   : "";

/**
* Validates whether a field is within a certain amount of characters
* param {IValues} values - All the field values in the form
* param {string} fieldName - The field to validate
* param {number} length - The maximum number of characters
* returns {string} - The error message
*/
/*export const maxLength = (
 values: IValues,
 fieldName: string,
 length: number,
// minlength: number
): string =>
( values[fieldName] && values[fieldName].length > length)  ? ` The message length must be at least ${length} and no more than characters  characters`
   : "";
//|| ( values[fieldName] && values[fieldName].length <  minlength))
  
  
  
*/
