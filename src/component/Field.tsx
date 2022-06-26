import * as React from "react";
import "../styles.scss";
import {  IErrors,  IFormContext,  FormContext,} from "./Form";
import { IValues } from './form';


/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IValidation {
  rule: (values: IValues, fieldName: string, args: any) => string;
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

export const Field: React.FunctionComponent<IFieldProps> = ({
  id,   label,   editor,   options,   value }) => {
 
const getError = (errors: IErrors): string => (errors ? errors[id] : "");

const getEditorStyle = (errors: IErrors): any =>
 getError(errors) ? { borderColor: "red" } : {};

    return (

    <FormContext.Consumer>
    {(context: IFormContext) => (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}

      {editor!.toLowerCase() === "textbox" && (
        <input
          id={id}
          type="text"
          value={value}
          style={getEditorStyle(context.errors)}
          onChange={
            (e: React.FormEvent<HTMLInputElement>) =>
            context.setValues({ [id]: e.currentTarget.value })
          }
          onBlur={() => context.validate(id)}
          className="form-control"
        />
      )}

      {editor!.toLowerCase() === "multilinetextbox" && (
        <textarea
          id={id}
          value={value}
          style={getEditorStyle(context.errors)}
          onChange={
            (e: React.FormEvent<HTMLTextAreaElement>) =>
            context.setValues({ [id]: e.currentTarget.value })
          }
          onBlur={() => context.validate(id)}
          className="form-control"
        />
      )}

      {editor!.toLowerCase() === "dropdown" && (
        <select
          id={id}
          name={id}
          value={value}
          style={getEditorStyle(context.errors)}
          onChange={
            (e: React.FormEvent<HTMLSelectElement>) =>
            context.setValues({ [id]: e.currentTarget.value })
          }
          onBlur={() => context.validate(id)}
          className="form-control"
        >
          {options &&
            options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      )}

      {getError(context.errors) && (
          <div style={{ color: "red", fontSize: "80%" }}>
            <p>{getError(context.errors)}</p>
          </div>
        )}
      </div>
      )}
    </FormContext.Consumer>
);
};
Field.defaultProps = {
  editor: "textbox"
};