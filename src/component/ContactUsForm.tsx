import * as React from "react";
import { Form, } from "./Form";
import { Field } from "./Field";
import { required, isEmail, maxLength, isTel} from './validation';
import { IFields } from './Interface';



export const ContactUsForm: React.FunctionComponent = () => { 
  const fields: IFields = {
    name: {
      id: "name",
      label: "Full Name", 
      editor: "textbox",
       validation: { rule: required }
    },
    email: {
      id: "email",
      label: "Email",
      editor: "textbox",
      validation: { rule: isEmail }
    },
    tel: {
      id: "tel",
      label: "Phone number",
      editor: "telbox",
      placeholderTel: "+7 XXX XX XX XX",
      validation: { rule: isTel }
    },
    birthday:{
      id: "birthday",
      label: "Birthday",
      editor: "birthday"   
    },
    notes: {
      id: "notes",
      label: "Notes",
      editor: "multilinetextbox",
      validation: { rule:  maxLength, minLength: 10, args: 300 }
    }
  };
  return (
    <Form
      action='https://jsonplaceholder.typicode.com/posts'  //submitSuccess === true
         /*  "http://localhost:5000/api/contactus"   */    //submitSuccess === false
      fields={fields}
      render={() => (
        <React.Fragment>
          <h2> Enter the information below <br/> and we'll get back to you as soon as we can.</h2>
          <Field {...fields.name} />
          <Field {...fields.email} />
          <Field {...fields.tel} /> 
          <Field {...fields.birthday} />
          <Field {...fields.notes} />
        </React.Fragment>
      )}
    />
  );
};
