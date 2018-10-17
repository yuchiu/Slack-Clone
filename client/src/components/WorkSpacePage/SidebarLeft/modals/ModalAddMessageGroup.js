import React from "react";
import { Form, Button, Modal, Dropdown, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { channelAction } from "@/actions";
import { HOCModal, ErrorInline } from "@/components/common";
import { validateForm } from "@/utils";
import { teamSelector, userSelector } from "@/reducers/";

class ModalAddMessageGroup extends React.Component {
  state = {
    clientError: {},
    members: []
  };

  resetState = () => {
    this.setState({
      clientError: {},
      members: [],
      channelName: ""
    });
  };

  handleChange = (e, { value }) => {
    e.persist();
    const { currentTeamMemberList, currentUser } = this.props;
    let memberNameList = currentUser.username;
    if (value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < currentTeamMemberList.length; j++) {
          if (value[i] === currentTeamMemberList[j].id) {
            memberNameList = memberNameList.concat(
              `, ${currentTeamMemberList[j].username}`
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
      const {
        fetchCreateChannel,
        currentTeam,
        toggleModal,
        currentUser
      } = this.props;
      const { members, channelName } = this.state;
      fetchCreateChannel({
        teamId: currentTeam.id,
        messageGroup: true,
        isPublic: false,
        currentUserId: currentUser.id,
        channelName,
        membersList: members
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
    const {
      isModalOpen,
      currentUser,
      toggleModal,
      currentTeamMemberList
    } = this.props;
    const { members, clientError } = this.state;

    return (
      <React.Fragment>
        {isModalOpen ? (
          <Modal size="small" open={isModalOpen} onClose={toggleModal}>
            <Modal.Header>Create Direct Message Group</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Select members for direct messaging:</label>
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
                    onChange={this.handleChange}
                  />
                  {clientError.members && (
                    <ErrorInline text={clientError.members} />
                  )}
                </Form.Field>
                <br />
                <Form.Group widths="equal">
                  <Button
                    primary
                    type="button"
                    onClick={this.handleSubmit}
                    fluid
                  >
                    Start Direct Message
                  </Button>
                  <Button type="button" fluid onClick={this.handleClose}>
                    Cancel
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Content>
          </Modal>
        ) : (
          <Icon
            className="plus-icon"
            onClick={toggleModal}
            name="plus circle"
          />
        )}
      </React.Fragment>
    );
  }
}

ModalAddMessageGroup.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  currentTeamMemberList: PropTypes.array.isRequired,

  toggleModal: PropTypes.func.isRequired,
  fetchCreateChannel: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentUser: userSelector.getCurrentUser(state),
  currentTeamMemberList: teamSelector.getCurrentTeamMemberList(state)
});
const dispatchToProps = dispatch => ({
  fetchCreateChannel: channelFormInfo => {
    dispatch(channelAction.fetchCreateChannel(channelFormInfo));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(HOCModal(ModalAddMessageGroup));
