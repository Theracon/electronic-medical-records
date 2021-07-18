import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Encounter.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import checkValidity from "../../shared/utils/formValidation";
import updateObject from "../../shared/utils/updateObject";

class Encounter extends React.Component {
  state = {
    form: {
      visit: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "First time visit", displayValue: "First time visit" },
            { value: "Repeat visit", displayValue: "Repeat visit" },
          ],
        },
        value: "First time visit",
        validation: { isSelected: true },
        valid: false,
      },

      bloodPressure: {
        elementType: "input",
        elementConfig: {
          type: "number",
          step: "0.1",
          placeholder: "Blood pressure (in mmHg)",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      temperature: {
        elementType: "input",
        elementConfig: {
          type: "number",
          step: "0.1",
          placeholder: "Temperature (in Celsius)",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      respiratoryRate: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Respiratory rate",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      complaints: {
        elementType: "textarea",
        elementConfig: {
          placeholder: "Complaints",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },

      diagnosis: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "Hypertension", displayValue: "Hypertension" },
            { value: "Pnemonia", displayValue: "Pnemonia" },
            { value: "Malaria", displayValue: "Malaria" },
            { value: "Diabetes", displayValue: "Diabetes" },
          ],
        },

        treatmentPlan: {
          elementType: "textarea",
          elementConfig: {
            placeholder: "Treatment plan",
          },
          value: "",
          validation: { required: true },
          valid: false,
          touched: false,
        },

        value: "First time visit",
        validation: { isSelected: true },
        valid: false,
      },
    },
    formIsValid: false,
  };

  inputChangedHandler = (event, elementId) => {
    const updatedFormElement = updateObject(this.state.form[elementId], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.form[elementId].validation
      ),
      touched: true,
    });

    const updatedForm = updateObject(this.state.form, {
      [elementId]: updatedFormElement,
    });

    let formIsValid = true;
    for (let elementId in updatedForm) {
      formIsValid = updatedForm[elementId].valid && formIsValid;
    }

    this.setState({
      form: updatedForm,
      formIsValid: formIsValid,
    });
  };

  submitFormHandler = (event) => {
    event.preventDefault();
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let form = (
      <form className={styles.Profile} onSubmit={this.submitFormHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            isValid={formElement.config.valid}
            touched={formElement.config.touched}
          />
        ))}

        <Button
          btnType="Primary"
          btnDisabled={
            !this.state.formIsValid && !this.props.isPatientImageUploaded
          }
        >
          CREATE ENCOUNTER <i className="fas fa-user-md"></i>
        </Button>
      </form>
    );

    let redirectToLogin = null;
    if (!this.props.isAuthenticated) {
      redirectToLogin = <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        {redirectToLogin}
        <h3 className="text-muted" style={{ margin: "2em 0 1em 0" }}>
          Create an encounter
        </h3>
        {form}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Encounter);
