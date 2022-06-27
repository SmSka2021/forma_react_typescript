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
            id=== "name"?  context.setValues({ [id]: e.currentTarget.value.toUpperCase() }) :  context.setValues({ [id]: e.currentTarget.value
             })
       
          }
          onBlur={() => context.validate(id)}
          className="form-control"
        />
      )}
       {editor!.toLowerCase() === "telbox" && (
        <input
          id={id}
          type="tel"
          placeholder={context.placeholderTel}
          value={ context.values.tel }
          style={getEditorStyle(context.errors)}
          onChange={
            (e: React.FormEvent<HTMLInputElement>) => {
            let itemTel:(string |Array<string>) = e.currentTarget.value.replace(/[^\d+]/g,'')
            itemTel = itemTel.replace(/^\+7/, "");
             itemTel = itemTel.replace(/\D/g, "").match(/(\d{0,3})(\d{0,2})(\d{0,2})(\d{0,2})/);
             itemTel = !itemTel[2]
               ? itemTel[1]
               : itemTel[1] + " " + itemTel[2] + (itemTel[3] ? `-${itemTel[3]}` : "") + (itemTel[4] ? `-${itemTel[4]}` : "");
               itemTel = itemTel.startsWith("+7 ") ? itemTel : "+7 " + itemTel;             
           context.setValues({ [id]:itemTel})
          
            }
            
                        
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