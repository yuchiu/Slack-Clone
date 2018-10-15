import React from "react";

const HOCForm = propState => WrappedComponent => {
  class newForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { ...propState, clientError: {} };
    }

    logFormState = () => {
      console.log(this.state);
    };

    resetForm = () => {
      this.setState({
        ...propState,
        clientError: {}
      });
    };

    changeName = () => {
      this.setState({
        formData: {
          name: "salfalsfkasljf"
        }
      });
    };

    render() {
      return (
        <div>
          <WrappedComponent
            {...this.props}
            {...this.state}
            changeName={this.changeName}
            logFormState={this.logFormState}
          />
        </div>
      );
    }
  }
  return newForm;
};

export default HOCForm;
