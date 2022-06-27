import * as React from "react";
import { IFormProps,IErrors,  IValues, IFormState, IFormContext, } from './Interface';


/**
 * Validates whether a field has a value
 * param {IValues} values - All the field values in the form
 * param {string} fieldName - The field to validate
 * returns {string} - The error message
 */
 export const required = (values: IValues, fieldName: string): string => {
    if( values[fieldName] === undefined ||
   values[fieldName] === null ||
   values[fieldName] === ""){
    return "This must be filled"
  }
  let lengthValue:number =  values[fieldName].split(' ').length
  
  if(lengthValue !== 2){
    return "Enter first and last name through one space"
  }
  let item:string = values[fieldName].trim()
  let lengthValue0:number = item.split(' ')[0].trim().length;
  let lengthValue1:number = item.split(' ')[1].trim().length;
  if(lengthValue0 < 3 || lengthValue0 > 30 || lengthValue1 < 3 || lengthValue1 > 30 ) {
    return " This is too short or too long name"
  }
  /*
  if(values[fieldName].split(' ').filter(el => el.length < 3 || el.length > 30)) {
    return "check first and last name"
  }*/
  if(values[fieldName].search(/^[a-zA-Z]+\s+[a-zA-Z]*$/ )) {
   return "This must be only latin letters"
  }
  return ""  
  
   // value.search(/[A-Za-z]+(\s+[A-Za-z]+)?/gi) !== -1. ? true : false : '' } }
  
     }
  /**
  * Validates whether a field is a valid email
  * param {IValues} values - All the field values in the form
  * param {string} fieldName - The field to validate
  * returns {string} - The error message
  */
  export const isEmail = (values: IValues, fieldName: string): string => 
   
   values[fieldName] &&
   values[fieldName].search(/^.+@.+\..+$/igm)
    /* /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/*/
   
     ? "This must be in a valid email format"
     : "";  
  
  
    
  /**
  * Validates whether a field is within a certain amount of characters
  * param {IValues} values - All the field values in the form
  * param {string} fieldName - The field to validate
  * param {number} length - The maximum number of characters
  * returns {string} - The error message
  */
  export const maxLength = (
   values: IValues,
   fieldName: string,
   minLength: number,
   length: number
  ): string => {
    if  ( values[fieldName] === undefined ||
      values[fieldName] === null ||
      values[fieldName] === "") {
        return  "This must be filled" 
      }
    if((values[fieldName] && values[fieldName].length > length) || (values[fieldName] && values[fieldName].length < minLength)){
      return `This  must be between ${minLength} and ${length}  characters `
    }
    else return ""
  }
   
  
  export const isTel = (values: IValues, fieldName: string): string =>  
      (values[fieldName] && values[fieldName].length < 15) ? "This must be in a valid tel format" :  ""
  
  
  