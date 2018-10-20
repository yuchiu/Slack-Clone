import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { errorAction } from "@/actions";
import { errorSelector } from "@/selectors/";
import HOCModal from "@/components/common/HOCModal/HOCModal";
import ErrorModal from "./ErrorModal.jsx";

class ErrorModalContainer extends React.Component {
  handleClose = () => {
    const { toggleModal, clearAllError } = this.props;
    clearAllError();
    toggleModal();
  };

  render() {
    const { error, toggleModal, isModalOpen } = this.props;
    return (
      <ErrorModal
        error={error}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        handleClose={this.handleClose}
      />
    );
  }
}
ErrorModalContainer.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  clearAllError: PropTypes.func.isRequired
};

const stateToProps = state => ({
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  clearAllError: () => {
    dispatch(errorAction.clearAllError());
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(ErrorModalContainer));
