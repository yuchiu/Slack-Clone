import React from "react";
import { Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./ErrorModal.scss";

const ErrorModal = ({ error, toggleModal, handleClose, isModalOpen }) => (
  <React.Fragment>
    {error && !isModalOpen ? toggleModal() : null}
    <Modal
      className="error-modal"
      size="mini"
      open={isModalOpen}
      onClose={handleClose}
    >
      <Modal.Header>Oops</Modal.Header>
      <Modal.Content>
        <div className="error-modal__message">{error}</div>
        <br />
        <Button primary fluid onClick={handleClose}>
          OK
        </Button>
      </Modal.Content>
    </Modal>
  </React.Fragment>
);

ErrorModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ErrorModal;
