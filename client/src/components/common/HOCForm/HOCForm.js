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
          "formFields of type object is required to be passed in with HOC Form as initial state"
        );
        normalizedState.formFields = {};
      }
      if (!normalizedState.fieldsToValidate) {
        console.error(
          "fieldsToValidate of type array is required to be passed in with HOC Form as initial state"
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

    setFieldErrors = receivedErrors => {
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
          setFieldErrors={this.setFieldErrors}
          handleChange={this.handleChange}
          fieldsValidation={this.fieldsValidation}
        />
      );
    }
  }
  return newForm;
};

export default HOCForm;
