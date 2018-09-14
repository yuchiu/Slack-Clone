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

import { InlineError } from "@/components/global";
import { validateForm } from "@/utils";
import { channelAction } from "@/actions";

class AddChannelModal extends React.Component {
  state = {
    clientError: {},
    members: [],
    isChannelPrivate: true,
    channelName: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };

  handleSubmit = async () => {
    // validate user's login info on client side
    const clientError = validateForm.addChannel(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      const { createChannel, currentTeam, onClose } = this.props;
      const { channelName } = this.state;
      createChannel({ teamId: currentTeam.id, channelName });
      onClose();
    }
  };

  handleClose = e => {
    const { onClose } = this.props;
    e.preventDefault();
    this.setState({
      clientError: {},
      members: [],
      isChannelPublic: true,
      channelName: ""
    });
    onClose();
  };

  toggleCheckboxValue = e => {
    this.setState({
      isChannelPrivate: !this.state.isChannelPrivate
    });
  };

  saveMember;

  render() {
    const { open, currentTeamMembers, currentUser } = this.props;
    const { channelName, isChannelPrivate, members, clientError } = this.state;

    return (
      <Modal open={open} onClose={this.handleClose}>
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
              <Input
                value={channelName}
                onChange={this.handleChange}
                name="channelName"
                fluid
                placeholder="channel name"
              />
            </Form.Field>
            {clientError.channelName && (
              <InlineError text={clientError.channelName} />
            )}
            <br />
            <Form.Field>
              <Checkbox
                toggle
                value={!isChannelPrivate}
                label="Public"
                onChange={this.toggleCheckboxValue}
              />
            </Form.Field>
            {isChannelPrivate ? (
              <Form.Field>
                <Dropdown
                  placeholder="select members to join your private channel"
                  fluid
                  multiple
                  search
                  selection
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
              <span style={{ fontSize: "20px" }}>
                <i className="users icon " />{" "}
                <span className="">{currentTeamMembers.length} members</span>
              </span>
            )}
            <br />
            <Form.Group widths="equal">
              <Button type="button" onClick={this.handleSubmit} fluid>
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
  currentTeam: state.teamReducer.currentTeam,
  currentUser: state.userReducer.currentUser,
  currentTeamMembers: state.teamReducer.currentTeamMembers,
  error: state.teamReducer.error
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
