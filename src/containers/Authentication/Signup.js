import React from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import updateObject from "../../shared/utils/updateObject";
import checkValidity from "../../shared/utils/formValidation";
import * as authActionCreators from "../../store/action-creators/authentication";

class Signup extends React.Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false,
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm Password",
        },
        value: "",
        validation: { required: true, passwordsEqual: true },
        valid: false,
        touched: false,
      },
    },
    formIsValid: true,
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
    const redirectPath =
      this.props.userType === "hw"
        ? "/hw-create-profile"
        : "/patient-create-profile";

    this.props.onSignup(
      this.state.form.email.value,
      this.state.form.password.value,
      this.props,
      redirectPath,
      this.props.userMode
    );
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
      <form onSubmit={this.submitFormHandler}>
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
        <Button btnType="Primary" btnDisabled={!this.state.formIsValid}>
          SIGNUP <i className="fas fa-user-plus"></i>
        </Button>
      </form>
    );

    return (
      <React.Fragment>
        <h3 className="text-muted" style={{ margin: "2em 0 1em 0" }}>
          Create an account
        </h3>
        {form}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.auth.userType,
    userMode: state.userMode.userMode,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (email, password, props, redirectPath) =>
      dispatch(authActionCreators.signup(email, password, props, redirectPath)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
