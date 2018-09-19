import React from "react";
import { Form, Input, Button, Modal, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { InlineError } from "@/components/global";
import { validateForm } from "@/utils";

class AddTeamMemberModal extends React.Component {
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

  handleSubmit = async () => {
    // validate user's login info on client side
    const { currentTeamMembers } = this.props;
    const clientError = validateForm.inviteToTeam(
      this.state,
      currentTeamMembers
    );
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { addTeamMember, currentTeam, onClose } = this.props;
      const { username } = this.state;
      addTeamMember({ teamId: currentTeam.id, targetUsername: username });
      this.setState({
        clientError: {},
        username: ""
      });
      onClose();
    }
  };

  handleClose = e => {
    const { onClose } = this.props;
    e.preventDefault();
    this.setState({
      clientError: {},
      username: ""
    });
    this.setState({
      clientError: {},
      username: ""
    });
    onClose();
  };

  render() {
    const { open } = this.props;
    const { username, clientError } = this.state;

    return (
      <Modal size="small" open={open} onClose={this.handleClose}>
        <Modal.Header>Invite Team Member</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Add user to the team:</label>
              {clientError.username && (
                <InlineError text={clientError.username} />
              )}
              <Input
                value={username}
                onChange={this.handleChange}
                name="username"
                fluid
                placeholder="# username"
              />
            </Form.Field>
            <br />
            <Form.Group widths="equal">
              <Button type="button" onClick={this.handleSubmit} fluid>
                Invite
              </Button>
              <Button type="button" fluid onClick={this.handleClose}>
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const stateToProps = state => ({
  currentTeam: state.teamReducer.currentTeam,
  currentTeamMembers: state.teamReducer.currentTeamMembers,
  error: state.errorReducer.error
});

const dispatchToProps = dispatch => ({
  addTeamMember: addMemberInfo => {
    dispatch(teamAction.addTeamMember(addMemberInfo));
  }
});
AddTeamMemberModal.propTypes = {
  open: PropTypes.bool.isRequired,
  addTeamMember: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default connect(
  stateToProps,
  dispatchToProps
)(AddTeamMemberModal);
