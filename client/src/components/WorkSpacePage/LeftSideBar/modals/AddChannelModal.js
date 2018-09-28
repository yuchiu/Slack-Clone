import React from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Checkbox,
  Dropdown
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { InlineError } from "@/components/common";
import { validateForm } from "@/utils";
import { channelAction } from "@/actions";
import {
  teamSelector,
  userSelector,
  errorSelector
} from "@/reducers/selectors";

class AddChannelModal extends React.Component {
  state = {
    clientError: {},
    members: [],
    purpose: "",
    isChannelPrivate: false,
    channelName: ""
  };

  componentWillUnmount() {
    this.setState({
      clientError: {},
      members: [],
      isChannelPrivate: false,
      channelName: ""
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
    const clientError = validateForm.addChannel(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { createChannel, currentTeam, onClose } = this.props;
      const { channelName, isChannelPrivate, members, purpose } = this.state;
      createChannel({
        teamId: currentTeam.id,
        channelName,
        detail_description: purpose,
        isPublic: !isChannelPrivate,
        membersList: members
      });
      this.setState({
        clientError: {},
        members: [],
        purpose: "",
        isChannelPrivate: false,
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
      isChannelPrivate: false,
      channelName: "",
      purpose: ""
    });
    onClose();
  };

  toggleCheckboxValue = e => {
    this.setState({
      clientError: {},
      isChannelPrivate: !this.state.isChannelPrivate
    });
  };

  render() {
    const { open, currentTeamMembers, currentUser } = this.props;
    const {
      channelName,
      isChannelPrivate,
      members,
      purpose,
      clientError
    } = this.state;

    return (
      <Modal size="small" open={open} onClose={this.handleClose}>
        <Modal.Header>
          {!isChannelPrivate ? (
            <span>Create Public Channel</span>
          ) : (
            <span>Create Private Channel</span>
          )}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Channel name:</label>
              {clientError.channelName && (
                <InlineError text={clientError.channelName} />
              )}
              <Input
                value={channelName}
                onChange={this.handleChange}
                name="channelName"
                fluid
                placeholder="# random channel"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                toggle
                value={!isChannelPrivate}
                label="Private"
                onChange={this.toggleCheckboxValue}
              />
            </Form.Field>
            <Form.Field>
              <label>Purpose:</label>
              <Input
                value={purpose}
                onChange={this.handleChange}
                name="purpose"
                fluid
                placeholder="purpose"
              />
            </Form.Field>
            {isChannelPrivate ? (
              <Form.Field>
                <label>Select members to join your private channel:</label>
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
            ) : (
              <div style={{ fontSize: "20px" }}>
                <i className="users icon " />{" "}
                <span className="">{currentTeamMembers.length} members</span>
              </div>
            )}
            <br />
            <Form.Group widths="equal">
              <Button primary type="button" onClick={this.handleSubmit} fluid>
                Create Channel
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
  currentTeam: teamSelector.getCurrentTeam(state),
  currentUser: userSelector.getCurrentUser(state),
  currentTeamMembers: teamSelector.getCurrentTeamMembers(state),
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  createChannel: channelFormInfo => {
    dispatch(channelAction.createChannel(channelFormInfo));
  }
});
AddChannelModal.propTypes = {
  open: PropTypes.bool.isRequired,
  createChannel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default connect(
  stateToProps,
  dispatchToProps
)(AddChannelModal);
