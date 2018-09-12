import React from "react";
import { Form, Input, Button, Modal, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { InlineError } from "@/components/global";
import { validateForm } from "@/utils";
import { channelAction } from "@/actions";

class AddChannelModal extends React.Component {
  state = {
    clientError: {},
    channelName: ""
  };

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
      channelName: ""
    });
    onClose();
  };

  render() {
    const { open } = this.props;
    const { channelName, clientError } = this.state;

    return (
      <Modal open={open} onClose={this.handleClose}>
        <Modal.Header>Create Channel</Modal.Header>
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
