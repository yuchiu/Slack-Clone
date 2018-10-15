import React from "react";

const HOCForm = WrappedComponent => {
  class newForm extends React.Component {
    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }
  return newForm;
};

export default HOCForm;
