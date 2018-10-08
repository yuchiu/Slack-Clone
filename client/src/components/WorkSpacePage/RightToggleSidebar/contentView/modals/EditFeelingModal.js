import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { InlineError, InlineHint } from "@/components/common";
import { userAction } from "@/actions";
import { validateForm } from "@/utils";

class EditFeelingModal extends React.PureComponent {
  state = {
    clientError: {},
    text: "",
    isModalOpen: false
  };

  componentWillUnmount() {
    this.setState({
      clientError: {},
      text: ""
    });
  }

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
    const { fetchEditUser } = this.props;
    const clientError = validateForm.editFeeling(this.state);
    this.setState({ clientError });

    // proceed to send data to server if there's no error
    if (Object.keys(clientError).length === 0) {
      fetchEditUser({ brief_description: text });
      this.setState({
        text: "",
        isModalOpen: false
      });
    }
  };

  render() {
    const { text, isModalOpen, clientError } = this.state;
    const { feeling } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={this.toggleModalOpen}>
            <Modal.Content>
              <Form>
                <Form.Field>
                  {feeling ? (
                    <Input
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      fluid
                      placeholder={`${feeling}`}
                    />
                  ) : (
                    <Input
                      value={text}
                      onChange={this.handleChange}
                      name="text"
                      fluid
                      placeholder="how you feeling"
                    />
                  )}
                  {clientError.text ? (
                    <InlineError text={clientError.text} />
                  ) : (
                    <InlineHint text={"max characters: 32"} />
                  )}
                </Form.Field>
                <Form.Group widths="equal">
                  <Button type="button" primary onClick={this.handleSave} fluid>
                    Save
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
          feeling && (
            <React.Fragment>
              <span className="">
                {feeling}{" "}
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
          !feeling && (
            <span className="toggle-edit-button" onClick={this.toggleModalOpen}>
              <i className="fas fa-pencil-alt" />
              add channel feeling
            </span>
          )}
      </React.Fragment>
    );
  }
}

EditFeelingModal.propTypes = {
  feeling: PropTypes.string
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({
  fetchEditUser: editUserData => {
    dispatch(userAction.fetchEditUser(editUserData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(EditFeelingModal);
