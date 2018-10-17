import React from "react";

import validateField from "./validateField";

const HOCForm = getInitialState => WrappedComponent => {
  class newForm extends React.Component {
    constructor(props) {
      super(props);
      const normalizedState = this.normalizeState();
      this.state = { ...normalizedState };
    }

    normalizeState = () => {
      const normalizedState = getInitialState();
      if (!normalizedState.formFields) {
        console.error(
          "initial state formFields of type object is required to be passed in with HOC Form"
        );
        normalizedState.formFields = {};
      }
      if (!normalizedState.fieldsToValidate) {
        console.error(
          "initial state fieldsToValidate of type array is required to be passed in with HOC Form"
        );
        normalizedState.fieldsToValidate = [];
      }
      if (!normalizedState.fieldErrors) {
        normalizedState.fieldErrors = {};
      }
      return normalizedState;
    };

    resetForm = () => {
      const normalizedState = this.normalizeState();
      this.setState({
        ...normalizedState
      });
    };

    handleChange = e => {
      const { formFields } = this.state;
      const { name, value } = e.target;
      formFields[name] = value;
      this.setState({
        formFields
      });
    };

    fieldsValidation = () => {
      const { fieldsToValidate, formFields } = this.state;
      let errorList = {};
      fieldsToValidate.map(field => {
        const error = validateField(field, formFields[field]);
        if (error) {
          errorList = { ...errorList, [field]: error };
        }
        return field;
      });
      this.setState({
        fieldErrors: errorList
      });
      return errorList;
    };

    setClientErrors = receivedErrors => {
      const { fieldErrors } = this.state;
      const errorList = { ...fieldErrors, ...receivedErrors };
      this.setState({
        fieldErrors: errorList
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          resetForm={this.resetForm}
          setClientErrors={this.setClientErrors}
          handleChange={this.handleChange}
          fieldsValidation={this.fieldsValidation}
        />
      );
    }
  }
  return newForm;
};

export default HOCForm;
