import * as React from "react";
import "../styles.scss";
import { IErrors, IFormContext,  IFieldProps } from './Interface';
import { FormContext } from './Form';





export const Field: React.FunctionComponent<IFieldProps> = ({id, label, editor, options, value }) => {
 
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
          value={ id=== "name"? context.values.name : context.values.email }
          style={getEditorStyle(context.errors)}
          onChange={
            (e: React.FormEvent<HTMLInputElement>) =>
            id=== "name"?  context.setValues({ [id]: e.currentTarget.value.toUpperCase() }) :  context.setValues({ [id]: e.currentTarget.value })
       
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