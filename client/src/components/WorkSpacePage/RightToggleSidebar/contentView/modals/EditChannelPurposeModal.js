import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { teamSelector, channelSelector } from "@/reducers/selectors";
import { channelAction } from "@/actions";

class EditChannelPurposeModal extends React.Component {
  state = {
    text: "",
    isModalOpen: false
  };

  componentDidMount() {}

  toggleModalOpen = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      text: "",
      isModalOpen: false
    });
    this.toggleModalOpen();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSave = () => {
    const { text } = this.state;
    const { fetchEditChannel, currentTeam, currentChannel } = this.props;
    fetchEditChannel({
      detail_description: text,
      channelId: currentChannel.id,
      teamId: currentTeam.id
    });
    this.setState({
      isModalOpen: false,
      text: ""
    });
  };

  render() {
    const { text, isModalOpen } = this.state;
    const { purpose } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={this.toggleModalOpen}>
            <Modal.Content>
              <Form>
                <Form.Field>
                  {purpose ? (
                    <Form.TextArea
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      placeholder={`${purpose}`}
                    />
                  ) : (
                    <Form.TextArea
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      placeholder="Add a purpose"
                    />
                  )}
                </Form.Field>
                <Form.Group widths="equal">
                  <Button type="button" primary onClick={this.handleSave} fluid>
                    Set Purpose
                  </Button>
                  <Button type="button" fluid onClick={this.handleClose}>
                    Cancel
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Content>
          </Modal>
        )}
        {!isModalOpen &&
          purpose && (
            <React.Fragment>
              <span className="">
                {purpose}{" "}
                <span
                  onClick={this.toggleModalOpen}
                  className="toggle-edit-button"
                >
                  <i className="fas fa-pencil-alt" />
                  edit
                </span>
              </span>
            </React.Fragment>
          )}
        {!isModalOpen &&
          !purpose && (
            <span className="toggle-edit-button" onClick={this.toggleModalOpen}>
              <i className="fas fa-pencil-alt" />
              add channel purpose
            </span>
          )}
      </React.Fragment>
    );
  }
}

EditChannelPurposeModal.propTypes = {
  purpose: PropTypes.string,

  currentTeam: PropTypes.object.isRequired,
  currentChannel: PropTypes.object.isRequired,

  fetchEditChannel: PropTypes.func.isRequired
};

const stateToProps = state => ({
  currentTeam: teamSelector.getCurrentTeam(state),
  currentChannel: channelSelector.getCurrentChannel(state)
});

const dispatchToProps = dispatch => ({
  fetchEditChannel: editChannelData => {
    dispatch(channelAction.fetchEditChannel(editChannelData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(EditChannelPurposeModal);
