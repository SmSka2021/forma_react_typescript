import * as React from "react";
import { IFormProps, IErrors, IValues, IFormState, IFormContext} from "./Interface";

export const FormContext = React.createContext<IFormContext | undefined>(
  undefined
);

export class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    const placeholderTel: string = "+7 XXX XX XX XX";
    const errors: IErrors = {};
    const values: IValues = {};

    this.state = {
      errors,
      values,
      placeholderTel,
    };
  }

  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };

  private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
    Object.keys(errors).map((key: string) => {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  }

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

  private validateForm(): boolean {
    const errors: IErrors = {};
    Object.keys(this.props.fields).map((fieldName: string) => {
      errors[fieldName] = this.validate(fieldName);
    });
    this.setState({ errors });
    return !this.haveErrors(errors);
  }

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
      errors: { ...this.state.errors, [fieldName]: newError },
    });
    return newError;
  };

  private async submitForm(): Promise<boolean> {
    const btn = document.getElementById("btn") as HTMLButtonElement | null;
    if (btn != null) {
      btn.disabled = true;
      btn.style.backgroundColor = "gold";
      btn.style.color = "blue";
    }
    try {
      const response = await fetch(this.props.action, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify(this.state.values),
      });

      if (response.status === 400) {
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
      if (response.status === 200) {
        this.setState({ values: {} });
      }
      btn.disabled = false;
      btn.style.backgroundColor = "rgb(22, 165, 58)";
      btn.style.color = "";
      return response.ok;
    } catch (ex) {
      btn.disabled = false;
      btn.style.backgroundColor = "rgb(22, 165, 58)";
      btn.style.color = "";
      return false;
    }
  }

  public render() {
    const { submitSuccess, errors } = this.state;
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate,
    };
    return (
      <FormContext.Provider value={context}>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} noValidate={true}>
            {this.props.render()}

            <div className="form-group">
              <button id="btn"  type="submit"  className="btn"  disabled={this.haveErrors(errors)} >
                Submit </button>
            </div>
            {submitSuccess && (             
               <h3 className="alertSuccess">The form was successfully submitted!</h3>              
            )}
            {submitSuccess === false && !this.haveErrors(errors) && (             
               <h3 className="alert">Sorry, an unexpected error has occurred</h3>              
            )}
            {submitSuccess === false && this.haveErrors(errors) && (             
               <h3 className="alert"> Sorry, the form is invalid. Please review, adjust and try again</h3>
            )}
          </form>
        </div>
      </FormContext.Provider>
    );
  }
}
