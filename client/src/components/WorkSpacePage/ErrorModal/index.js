import React from "react";
import { Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./index.scss";

class PopUpModal extends React.Component {
  state = {
    displayError: false
  };

  handleClose = e => {
    const { onClose, clearError } = this.props;
    e.preventDefault();
    clearError();
    onClose();
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
PopUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired
};

export default PopUpModal;
