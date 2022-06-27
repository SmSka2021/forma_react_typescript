
/* The available editors for the field */
type Editor = "textbox" | "telbox"| "multilinetextbox" | "dropdown" | "birthday";

export interface IValidation {
  rule: ( values: IValues, fieldName: string, minLength: number, args: any) => string;
  minLength?: number;
  args?: any; 
}

export interface IFieldProps {
  id: string           /* The unique field name */;
  placeholderTel?: string;
  label?: string       /* The label text for the field */;
  editor?: Editor      /* The editor for the field */;
  options?: string[]   /* The drop down items for the field */;
  value?: any          /* The field value */;
  validation?: IValidation;
}

export interface IFields {
  [key: string]: IFieldProps;
}

export interface IFormContext extends IFormState { 
  setValues: (values: IValues) => void;
  validate: (fieldName: string) => void;
}

export interface IFormProps {
   action: string;      /* The http path that the form will be posted to */
   fields: IFields;     /* The props for all the fields on the form */
   render: () => React.ReactNode;
}

export interface IValues {
  [key: string]: string; /* Key value pairs for all the field values with key being the field name */
}

export interface IErrors {
  [key: string]: string;
}

export interface IFormState {
  values: IValues;
  errors: IErrors;
  placeholderTel: string;
  submitSuccess?: boolean;
}