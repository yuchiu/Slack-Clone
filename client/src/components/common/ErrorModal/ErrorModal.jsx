import React from "react";
import { Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./ErrorModal.scss";
import HOCModal from "@/components/common/HOCModal/HOCModal";

class ErrorModal extends React.Component {
  handleClose = () => {
    const { toggleModal, clearAllError } = this.props;
    clearAllError();
    toggleModal();
  };

  render() {
    const { isModalOpen, toggleModal, error } = this.props;
    return (
      <React.Fragment>
        {error && !isModalOpen ? toggleModal() : null}
        <Modal
          className="error-modal"
          size="mini"
          open={isModalOpen}
          onClose={this.handleClose}
        >
          <Modal.Header>Oops</Modal.Header>
          <Modal.Content>
            <div className="error-modal__message">{error}</div>
            <br />
            <Button primary fluid onClick={this.handleClose}>
              OK
            </Button>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}
ErrorModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  clearAllError: PropTypes.func.isRequired
};

export default HOCModal(ErrorModal);
