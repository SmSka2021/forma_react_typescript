
/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IValidation {
  rule: (values: IValues, fieldName: string, minLength: number, args: any) => string;
  minLength?: number;
  args?: any;
}

export interface IFieldProps {  
  id: string;/* The unique field name */
  label?: string;  /* The label text for the field */
  editor?: Editor;  /* The editor for the field */
  options?: string[]; /* The drop down items for the field */
 value?: any;  /* The field value */
 validation?: IValidation;
}

export interface IFields {
    [key: string]: IFieldProps;
  }
  
  export interface IFormContext
    extends IFormState {
    /* Function that allows values in the values state to be set */
    setValues: (values: IValues) => void;
    
    /* Function that validates a field */
    validate: (fieldName: string) => void;
  }
  
export interface IFormProps {
    /* The http path that the form will be posted to */
    action: string;
     /* The props for all the fields on the form */
     fields: IFields;
    render: () => React.ReactNode;
  }
  
  export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: string;
  }
  
  export interface IErrors {
   [key: string]: string;   
  }
  
  export interface IFormState {
   values: IValues;  
    errors: IErrors; 
   submitSuccess?: boolean;  
  }