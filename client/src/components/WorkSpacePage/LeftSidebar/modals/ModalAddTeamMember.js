import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { validateForm } from "@/utils";
import { teamSelector } from "@/reducers/selectors";
import { HOCModal } from "@/components/common";
import ModalAddTeamMember from "./ModalAddTeamMember.jsx";

class ModalAddTeamMemberContainer extends React.Component {
  state = {
    clientError: {},
    username: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  resetState = () => {
    this.setState({
      clientError: {},
      username: ""
    });
  };

  handleSubmit = async () => {
    // validate user's login info on client side
    const { currentTeamMemberList } = this.props;
    const clientError = validateForm.inviteToTeam(
      this.state,
      currentTeamMemberList
    );
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { emitSocketAddTeamMember, currentTeam, toggleModal } = this.props;
      const { username } = this.state;
      emitSocketAddTeamMember({
        teamId: currentTeam.id,
        targetUsername: username
      });
      this.resetState();
      toggleModal();
    }
  };

  handleClose = e => {
    const { toggleModal } = this.props;
    e.preventDefault();
    this.resetState();
    toggleModal();
  };

  render() {
    const { isModalOpen, toggleModal } = this.props;
    const { username, clientError } = this.state;

    return (
      <ModalAddTeamMember
        isModalOpen={isModalOpen}
        username={username}
        clientError={clientError}
        handleChange={this.handleChange}
        handleClose={this.handleClose}
        handleSubmit={this.handleSubmit}
        toggleModal={toggleModal}
      />
    );
  }
}

ModalAddTeamMemberContainer.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

  toggleModal: PropTypes.func.isRequired,
  emitSocketAddTeamMember: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});

const dispatchToProps = () => ({
  emitSocketAddTeamMember: addMemberInfo =>
    teamAction.emitSocketAddTeamMember(addMemberInfo)
});

export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(ModalAddTeamMemberContainer));
