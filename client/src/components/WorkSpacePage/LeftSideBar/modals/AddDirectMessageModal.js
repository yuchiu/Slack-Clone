import React from "react";
import { Form, Input, Button, Modal, Message } from "semantic-ui-react";
import Proptypes from "prop-types";

import { InlineError } from "@/components/global";
import { validateForm } from "@/utils";

class ModalComponent extends React.Component {
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
      console.log("handleSubmit");
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
        <Modal.Header>Add to Direct Message</Modal.Header>
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

ModalComponent.propTypes = {
  open: Proptypes.bool.isRequired,
  onClose: Proptypes.func.isRequired
};

export default ModalComponent;
