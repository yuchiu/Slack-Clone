import React from "react";
import { Form, Button, Modal, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { messageGroupAction } from "@/actions";
import { InlineError } from "@/components/global";
import { validateForm } from "@/utils";

class AddMessageGroupModal extends React.Component {
  state = {
    clientError: {},
    members: []
  };

  componentWillUnmount() {
    this.setState({
      clientError: {},
      members: []
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    // validate user's login info on client side
    const clientError = validateForm.addMessageGroup(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { createMessageGroup, currentTeam, onClose } = this.props;
      const { members } = this.state;
      createMessageGroup({
        teamId: currentTeam.id,
        members
      });
      onClose();
    }
  };

  handleClose = e => {
    const { onClose } = this.props;
    e.preventDefault();
    this.setState({
      clientError: {},
      members: []
    });
    onClose();
  };

  render() {
    const { open, currentUser, currentTeamMembers } = this.props;
    const { members, clientError } = this.state;

    return (
      <Modal open={open} onClose={this.handleClose}>
        <Modal.Header>Add to Direct Message</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Select members for direct messaging:</label>
              {clientError.members && (
                <InlineError text={clientError.members} />
              )}
              <Dropdown
                placeholder="# username"
                fluid
                multiple
                search
                selection
                value={members}
                options={currentTeamMembers
                  .filter(member => member.id !== currentUser.id)
                  .map(member => ({
                    key: member.id,
                    value: member.id,
                    text: member.username
                  }))}
                onChange={(e, { value }) => {
                  this.setState({
                    members: value
                  });
                }}
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

AddMessageGroupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: state.teamReducer.currentTeam,
  currentUser: state.userReducer.currentUser,
  currentTeamMembers: state.teamReducer.currentTeamMembers
});
const dispatchToProps = dispatch => ({
  createMessageGroup: messageGroupFormInfo => {
    dispatch(messageGroupAction.createMessageGroup(messageGroupFormInfo));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(AddMessageGroupModal);
