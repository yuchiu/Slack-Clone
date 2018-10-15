import React from "react";
import { Modal } from "semantic-ui-react";

const HOCForm = WrappedComponent => {
  class newForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      };
    }

    resetModal = () => {
      this.setState({
        isModalOpen: false
      });
    };

    toggleModal = () => {
      const { isModalOpen } = this.state;
      this.setState({
        isModalOpen: !isModalOpen
      });
    };

    openModal = () => {
      this.setState({
        isModalOpen: true
      });
    };

    closeModal = () => {
      this.resetModal();
      this.setState({
        isModalOpen: false
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          resetModal={this.resetModal}
          toggleModal={this.toggleModal}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
      );
    }
  }
  return newForm;
};

export default HOCForm;
