import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./index.scss";
import { globalStateAction, channelAction } from "@/actions";
import {
  globalStateSelector,
  channelSelector,
  teamSelector
} from "@/reducers/selectors";

class TopicModal extends React.Component {
  state = {
    text: ""
  };

  toggleEdit = () => {
    const { toggleEditModal } = this.props;
    toggleEditModal();
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      text: ""
    });
    this.toggleEdit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSave = () => {
    const { text } = this.state;
    const { fetchEditChannel, currentChannel, currentTeam } = this.props;

    console.log(currentChannel);

    fetchEditChannel({
      brief_description: text,
      teamId: currentTeam.id,
      channelId: currentChannel.id
    });
    this.setState({
      text: ""
    });
  };

  render() {
    const { text } = this.state;
    const { topic, isEditModalOpen } = this.props;
    return (
      <React.Fragment>
        {isEditModalOpen && (
          <Modal size="small" open={isEditModalOpen} onClose={this.toggleEdit}>
            <Modal.Content>
              <Form>
                <Form.Field>
                  {topic ? (
                    <Form.TextArea
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      placeholder={`${topic}`}
                    />
                  ) : (
                    <Form.TextArea
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      placeholder="Add a topic"
                    />
                  )}
                </Form.Field>
                <Form.Group widths="equal">
                  <Button type="button" primary onClick={this.handleSave} fluid>
                    Set Topic
                  </Button>
                  <Button type="button" fluid onClick={this.handleClose}>
                    Cancel
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Content>
          </Modal>
        )}
        {!isEditModalOpen &&
          topic && (
            <React.Fragment>
              <span className="">
                {topic}{" "}
                <span onClick={this.toggleEdit} className="topic-edit-button">
                  <i className="fas fa-pencil-alt" />
                  edit
                </span>
              </span>
            </React.Fragment>
          )}
        {!isEditModalOpen &&
          !topic && (
            <span className="topic-edit-button" onClick={this.toggleEdit}>
              <i className="fas fa-pencil-alt" />
              add a topic
            </span>
          )}
      </React.Fragment>
    );
  }
}

TopicModal.propTypes = {
  topic: PropTypes.string,

  isEditModalOpen: PropTypes.bool.isRequired,
  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  fetchEditChannel: PropTypes.func.isRequired,
  toggleEditModal: PropTypes.func.isRequired
};

const stateToProps = state => ({
  isEditModalOpen: globalStateSelector.getIsEditModalOpen(state),
  currentTeam: teamSelector.getCurrentTeam(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});

const dispatchToProps = dispatch => ({
  toggleEditModal: () => {
    dispatch(globalStateAction.toggleEditModal());
  },
  fetchEditChannel: editChannelData => {
    dispatch(channelAction.fetchEditChannel(editChannelData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(TopicModal);
