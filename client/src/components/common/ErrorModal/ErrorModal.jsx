import React from "react";
import { Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./ErrorModal.scss";
import HOCModal from "@/components/common/HOCModal/HOCModal";

class ErrorModal extends React.Component {
  handleClose = () => {
    const { closeModal, clearAllError } = this.props;
    clearAllError();
    closeModal();
  };

  render() {
    const { error, closeModal, openModal, isModalOpen } = this.props;
    return (
      <React.Fragment>
        {error && !isModalOpen ? openModal() : null}
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

  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  clearAllError: PropTypes.func.isRequire
};

export default HOCModal(ErrorModal);
