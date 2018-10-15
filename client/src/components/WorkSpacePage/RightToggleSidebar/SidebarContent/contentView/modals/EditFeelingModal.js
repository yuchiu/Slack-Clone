import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "@/actions";
import { validateForm } from "@/utils";
import { HOCModal } from "@/components/common";
import EditFeelingModal from "./EditFeelingModal.jsx";

class EditFeelingModalContainer extends React.Component {
  state = {
    clientError: {},
    text: ""
  };

  componentWillUnmount() {
    this.setState({
      clientError: {},
      text: ""
    });
  }

  handleClose = e => {
    const { toggleModal } = this.props;
    e.preventDefault();
    toggleModal();
    this.resetState();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  resetState = () => {
    this.setState({
      text: ""
    });
  };

  handleSave = () => {
    const { text } = this.state;
    const { fetchEditUser } = this.props;
    const clientError = validateForm.editFeeling(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      fetchEditUser({ brief_description: text });
      this.resetState();
    }
  };

  render() {
    const { text, clientError } = this.state;
    const { feeling, toggleModal, isModalOpen } = this.props;
    return (
      <EditFeelingModal
        text={text}
        isModalOpen={isModalOpen}
        clientError={clientError}
        feeling={feeling}
        toggleModal={toggleModal}
        handleClose={this.handleClose}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
      />
    );
  }
}

EditFeelingModalContainer.propTypes = {
  feeling: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,

  toggleModal: PropTypes.func.isRequired,
  fetchEditUser: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  fetchEditUser: editUserData => {
    dispatch(userAction.fetchEditUser(editUserData));
  }
});

export default connect(
  null,
  dispatchToProps
)(HOCModal(EditFeelingModalContainer));
