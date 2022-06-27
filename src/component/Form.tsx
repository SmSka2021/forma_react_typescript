import * as React from "react";

import { IFormProps,IErrors,  IValues, IFormState, IFormContext, } from './Interface';






export const FormContext = React.createContext<IFormContext|undefined>(undefined);



export class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    const errors: IErrors = {};
    const values: IValues = {};
    this.state = {
      errors,
      values
    };
  }

  /**
 * Stores new field values in state
 * param {IValues} values - The new field values
 */
private setValues = (values: IValues) => {
  
  this.setState({ values: { ...this.state.values, ...values } });
 };
  /**
   * Returns whether there are any errors in the errors object that is passed in
   * param {IErrors} errors - The field errors
   */
  private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  }

  /**
   * Handles form submission
   * param {React.FormEvent<HTMLFormElement>} e - The form event
   */
  private handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log(this.state.values);
    if (this.validateForm()) {
      const submitSuccess: boolean = await this.submitForm();
      this.setState({ submitSuccess });
    }
  };

  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * returns {boolean} - Whether the form is valid or not
   */
   private validateForm(): boolean {
    const errors: IErrors = {};
    Object.keys(this.props.fields).map((fieldName: string) => {
      errors[fieldName] = this.validate(fieldName);
    });
    this.setState({ errors });
    return !this.haveErrors(errors);
  }

/**
 * Executes the validation rule for the field and updates the form errors
 * param {string} fieldName - The field to validate
 * returns {string} - The error message
 */
 private validate = (fieldName: string): string => {
  let newError: string = "";

  if (
    this.props.fields[fieldName] &&
    this.props.fields[fieldName].validation
  ) {
    newError = this.props.fields[fieldName].validation!.rule(
      this.state.values,
      fieldName,
      this.props.fields[fieldName].validation!.minLength,
      this.props.fields[fieldName].validation!.args
    );
  }
  this.state.errors[fieldName] = newError;
  this.setState({
     errors: { ...this.state.errors, [fieldName]: newError }
  });
  return newError;
};


  /**
   * Submits the form to the http api
   * returns {boolean} - Whether the form submission was successful or not
   */
   private async submitForm(): Promise<boolean> {
    try {
      const response = await fetch(this.props.action, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(this.state.values)
      });
      if (response.status === 400) {
        /* Map the validation errors to IErrors */
        let responseBody: any;
        responseBody = await response.json();
        const errors: IErrors = {};
        Object.keys(responseBody).map((key: string) => {
          // For ASP.NET core, the field names are in title case - so convert to camel case
          const fieldName = key.charAt(0).toLowerCase() + key.substring(1);
          errors[fieldName] = responseBody[key];
        });
        this.setState({ errors });
      } 

      return response.ok;
    } catch (ex) {
      return false;
    }
  }

  public render() {
    const { submitSuccess, errors } = this.state;
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate
    };
    return (
      <FormContext.Provider value={context}>
      <form onSubmit={this.handleSubmit} noValidate={true}>
        <div className="container">
        {this.props.render()}

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={this.haveErrors(errors)}
            >
              Submit
            </button>
          </div>
          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The form was successfully submitted!
            </div>
          )}
          {submitSuccess === false &&
            !this.haveErrors(errors) && (
              <div className="alert alert-danger" role="alert">
                Sorry, an unexpected error has occurred
              </div>
            )}
          {submitSuccess === false &&
            this.haveErrors(errors) && (
              <div className="alert alert-danger" role="alert">
                Sorry, the form is invalid. Please review, adjust and try again
              </div>
            )}
        </div>
      </form>
      </FormContext.Provider>
    );
  }
}



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
let lengthValue0:number = values[fieldName].split(' ')[0].length;
let lengthValue1:number = values[fieldName].split(' ')[1].length;
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
export const maxLength = (
 values: IValues,
 fieldName: string,
 minLength: number,
 length: number
): string => {
  if((values[fieldName] && values[fieldName].length > length) || (values[fieldName] && values[fieldName].length < minLength)){
    return `This  must be between ${minLength} and ${length}  characters `
  }
  else return ""
}
 
