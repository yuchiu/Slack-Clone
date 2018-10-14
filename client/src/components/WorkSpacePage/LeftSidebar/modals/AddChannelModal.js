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

import { ErrorInline } from "@/components/common";
import { validateForm } from "@/utils";
import { channelAction } from "@/actions";
import { teamSelector, userSelector } from "@/reducers/selectors";

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
      const {
        fetchCreateChannel,
        currentTeam,
        onClose,
        currentUser
      } = this.props;
      const { channelName, isChannelPrivate, members, purpose } = this.state;
      fetchCreateChannel({
        teamId: currentTeam.id,
        currentUserId: currentUser.id,
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
    const { open, currentTeamMemberList, currentUser } = this.props;
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
              <Input
                value={channelName}
                onChange={this.handleChange}
                name="channelName"
                fluid
                placeholder="# random channel"
              />
              {clientError.channelName && (
                <ErrorInline text={clientError.channelName} />
              )}
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
              <Form.TextArea
                value={purpose}
                onChange={this.handleChange}
                name="purpose"
                placeholder="purpose"
              />
              {clientError.purpose && (
                <ErrorInline text={clientError.purpose} />
              )}
            </Form.Field>
            {isChannelPrivate ? (
              <Form.Field>
                <label>Select members to join your private channel:</label>
                {clientError.members && (
                  <ErrorInline text={clientError.members} />
                )}
                <Dropdown
                  placeholder="# username"
                  fluid
                  multiple
                  search
                  selection
                  value={members}
                  options={currentTeamMemberList
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
                <span className="">{currentTeamMemberList.length} members</span>
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

AddChannelModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  currentTeam: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

  fetchCreateChannel: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentUser: userSelector.getCurrentUser(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});

const dispatchToProps = dispatch => ({
  fetchCreateChannel: channelFormData => {
    dispatch(channelAction.fetchCreateChannel(channelFormData));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(AddChannelModal);
