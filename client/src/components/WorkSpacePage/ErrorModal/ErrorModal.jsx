import React from "react";
import { Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./ErrorModal.scss";

class ErrorModal extends React.Component {
  handleClose = () => {
    const { toggleErrorModal, clearAllError } = this.props;
    clearAllError();
    toggleErrorModal();
  };

  render() {
    const { open, error } = this.props;
    return (
      <Modal
        className="error-modal"
        size="mini"
        open={open}
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
    );
  }
}
ErrorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  toggleErrorModal: PropTypes.func.isRequired,
  clearAllError: PropTypes.func.isRequired
};

export default ErrorModal;
