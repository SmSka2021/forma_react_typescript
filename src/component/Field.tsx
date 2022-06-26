import * as React from "react";
import "../styles.scss";
import {  IErrors,  IFormContext,  FormContext,} from "./Form";

/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IFieldProps {  
  id: string;/* The unique field name */
  label?: string;  /* The label text for the field */
  editor?: Editor;  /* The editor for the field */
  options?: string[]; /* The drop down items for the field */
 value?: any;  /* The field value */
  
}

export const Field: React.FunctionComponent<IFieldProps> = ({
  id,   label,   editor,   options,   value }) => {
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
          onChange={
            (e: React.FormEvent<HTMLInputElement>) =>
            context.setValues({ [id]: e.currentTarget.value })
          }
          onBlur={
            (e: React.FormEvent<HTMLInputElement>) =>
              console.log(e) /* TODO: validate field value */
          }
          className="form-control"
        />
      )}

      {editor!.toLowerCase() === "multilinetextbox" && (
        <textarea
          id={id}
          value={value}
          onChange={
            (e: React.FormEvent<HTMLTextAreaElement>) =>
            context.setValues({ [id]: e.currentTarget.value })
          }
          onBlur={
            (e: React.FormEvent<HTMLTextAreaElement>) =>
              console.log(e) /* TODO: validate field value */
          }
          className="form-control"
        />
      )}

      {editor!.toLowerCase() === "dropdown" && (
        <select
          id={id}
          name={id}
          value={value}
          onChange={
            (e: React.FormEvent<HTMLSelectElement>) =>
            context.setValues({ [id]: e.currentTarget.value })
          }
          onBlur={
            (e: React.FormEvent<HTMLSelectElement>) =>
              console.log(e) /* TODO: validate field value */
          }
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

      {/* TODO - display validation error */}
      </div>
      )}
    </FormContext.Consumer>
);
};
Field.defaultProps = {
  editor: "textbox"
};