import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "@/actions";
import { validateForm } from "@/utils";
import EditFeelingModal from "./EditFeelingModal.jsx";

class EditFeelingModalContainer extends React.PureComponent {
  state = {
    clientError: {},
    text: "",
    isModalOpen: false
  };

  componentWillUnmount() {
    this.setState({
      clientError: {},
      text: ""
    });
  }

  toggleModalOpen = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      text: "",
      isModalOpen: false
    });
    this.toggleModalOpen();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
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
      this.setState({
        text: "",
        isModalOpen: false
      });
    }
  };

  render() {
    const { text, isModalOpen, clientError } = this.state;
    const { feeling } = this.props;
    return (
      <EditFeelingModal
        text={text}
        isModalOpen={isModalOpen}
        clientError={clientError}
        feeling={feeling}
        toggleModalOpen={this.toggleModalOpen}
        handleClose={this.handleClose}
        handleChange={this.handleChange}
        handleSave={this.handleSave}
      />
    );
  }
}

EditFeelingModalContainer.propTypes = {
  feeling: PropTypes.string,

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
)(EditFeelingModalContainer);
