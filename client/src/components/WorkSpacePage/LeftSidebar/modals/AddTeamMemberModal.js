import React from "react";
import { Form, Input, Button, Modal, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { InlineError } from "@/components/common";
import { validateForm } from "@/utils";
import { teamSelector } from "@/reducers/selectors";

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
    const { currentTeamMemberList } = this.props;
    const clientError = validateForm.inviteToTeam(
      this.state,
      currentTeamMemberList
    );
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { emitSocketAddTeamMember, currentTeam, onClose } = this.props;
      const { username } = this.state;
      emitSocketAddTeamMember({
        teamId: currentTeam.id,
        targetUsername: username
      });
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
              <Input
                value={username}
                onChange={this.handleChange}
                name="username"
                fluid
                placeholder="# username"
              />
              {clientError.username && (
                <InlineError text={clientError.username} />
              )}
            </Form.Field>
            <br />
            <Form.Group widths="equal">
              <Button primary type="button" onClick={this.handleSubmit} fluid>
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

AddTeamMemberModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  currentTeam: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

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
)(AddTeamMemberModal);
