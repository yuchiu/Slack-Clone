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
    this.setState({
      serverError: ""
    });
    // validate user's login info on client side
    const clientError = validateForm.invitePeople(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { addTeamMember, currentTeam, onClose } = this.props;
      const { username } = this.state;
      addTeamMember({ teamId: currentTeam.id, targetUsername: username });
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
    onClose();
  };

  render() {
    const { open } = this.props;
    const { username, clientError } = this.state;

    return (
      <Modal open={open} onClose={this.handleClose}>
        <Modal.Header>Invite Team Member</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                value={username}
                onChange={this.handleChange}
                name="username"
                fluid
                placeholder="username"
              />
            </Form.Field>
            {clientError.username && (
              <InlineError text={clientError.username} />
            )}
            <br />
            <Form.Group widths="equal">
              <Button onClick={this.handleSubmit} fluid>
                Invite
              </Button>
              <Button fluid onClick={this.handleClose}>
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
  error: state.teamReducer.error
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
