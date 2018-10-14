import React from "react";

const ModalHOC = WrappedComponent => {
  class newModal extends React.Component {
    state = {
      isModalOpen: false
    };

    toggleModal = () => {
      const { isModalOpen } = this.state;
      this.setState({
        isModalOpen: !isModalOpen
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          toggleModal={this.toggleModal}
        />
      );
    }
  }
  return newModal;
};

export default ModalHOC;
