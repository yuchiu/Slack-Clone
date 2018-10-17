import React from "react";

import validateField from "@/utils/validateField";

const HOCForm = propState => WrappedComponent => {
  class newForm extends React.Component {
    constructor(props) {
      super(props);
      const normalizedState = this.normalizeState();
      this.state = { ...normalizedState, clientErrors: {} };
    }

    normalizeState = () => {
      const normalizedState = { ...propState };
      if (!propState) {
        console.error(
          "initial state formFields of type object, fieldsToValidate of type array, are required to passed in with HOC Form"
        );
      }
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
      return normalizedState;
    };

    resetForm = () => {
      this.setState({
        ...propState,
        clientErrors: {}
      });
    };

    handleChange = e => {
      const { formFields } = this.state;
      const field = e.target.name;
      formFields[field] = e.target.value;
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
        clientErrors: errorList
      });
      return errorList;
    };

    setClientErrors = errorObj => {
      const { clientErrors } = this.state;
      const errorList = { ...clientErrors, ...errorObj };
      this.setState({
        clientErrors: errorList
      });
    };

    render() {
      return (
        <div>
          <WrappedComponent
            {...this.props}
            {...this.state}
            resetForm={this.resetForm}
            setClientErrors={this.setClientErrors}
            handleChange={this.handleChange}
            fieldsValidation={this.fieldsValidation}
          />
        </div>
      );
    }
  }
  return newForm;
};

export default HOCForm;
