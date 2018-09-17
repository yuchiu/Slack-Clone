import React from "react";
import { Form, Button, Modal, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

import { channelAction } from "@/actions";
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
      members: [],
      channelName: ""
    });
  }

  handleChange = (e, { value }) => {
    e.persist();
    const { currentTeamMembers, currentUser } = this.props;
    let memberNameList = currentUser.username;
    if (value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < currentTeamMembers.length; j++) {
          if (value[i] === currentTeamMembers[j].id) {
            memberNameList = memberNameList.concat(
              `, ${currentTeamMembers[j].username}`
            );
          }
        }
      }
    }
    this.setState({
      members: value,
      channelName: memberNameList
    });
  };

  handleSubmit = async () => {
    // validate user's login info on client side
    const clientError = validateForm.addMessageGroup(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { createChannel, currentTeam, onClose } = this.props;
      const { members, channelName } = this.state;
      createChannel({
        teamId: currentTeam.id,
        messageGroup: true,
        isPublic: false,
        channelName,
        membersList: members
      });
      this.setState({
        clientError: {},
        members: [],
        channelName: ""
      });
      onClose();
    }
  };

  handleClose = e => {
    const { onClose } = this.props;
    e.preventDefault();
    this.setState({
      clientError: {},
      members: [],
      channelName: ""
    });
    onClose();
  };

  render() {
    const { open, currentUser, currentTeamMembers } = this.props;
    const { members, clientError } = this.state;

    return (
      <Modal open={open} onClose={this.handleClose}>
        <Modal.Header>Create Direct Message Group</Modal.Header>
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
                onChange={this.handleChange}
              />
            </Form.Field>
            <br />
            <Form.Group widths="equal">
              <Button type="button" onClick={this.handleSubmit} fluid>
                Start Direct Message
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
  createChannel: channelFormInfo => {
    dispatch(channelAction.createChannel(channelFormInfo));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(AddMessageGroupModal);
