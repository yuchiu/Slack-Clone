import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { userAction } from "@/actions";
import { userSelector } from "@/reducers/selectors";
import { InlineError } from "@/components/common";

class EditMyProfileModal extends React.Component {
  state = {
    password: "",
    newPassword: "",
    confirmPassword: "",
    feeling: "",
    about: "",
    imgFile: {},
    clientError: {},
    isModalOpen: false,
    isEditPasswordOn: false
  };

  componentDidMount() {}

  toggleModalOpen = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen
    });
  };

  toggleEditPassword = () => {
    const { isEditPasswordOn } = this.state;
    this.setState({
      password: "",
      newPassword: "",
      confirmPassword: "",
      isEditPasswordOn: !isEditPasswordOn
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      password: "",
      newPassword: "",
      confirmPassword: "",
      feeling: "",
      about: "",
      imgFile: {},
      clientError: {},
      isModalOpen: false,
      isEditPasswordOn: false
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
    const { password, newPassword, feeling, about } = this.state;
    const { fetchEditUser } = this.props;
    fetchEditUser({
      brief_description: feeling,
      detail_description: about,
      password,
      newPassword
    });
    this.setState({
      password: "",
      newPassword: "",
      confirmPassword: "",
      feeling: "",
      about: "",
      imgFile: {},
      clientError: {},
      isModalOpen: false,
      isEditPasswordOn: false
    });
  };

  render() {
    const {
      password,
      confirmPassword,
      feeling,
      about,
      newPassword,
      isModalOpen,
      isEditPasswordOn,
      clientError
    } = this.state;
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal size="small" open={isModalOpen} onClose={this.toggleModalOpen}>
            <Modal.Header>
              <span>Edit Profile</span>
            </Modal.Header>

            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Feeling:</label>
                  {clientError.feeling && (
                    <InlineError text={clientError.feeling} />
                  )}
                  {currentUser.brief_description ? (
                    <Input
                      value={feeling}
                      onChange={this.handleChange}
                      name="feeling"
                      fluid
                      placeholder={`${currentUser.brief_description}`}
                    />
                  ) : (
                    <Input
                      value={feeling}
                      onChange={this.handleChange}
                      name="feeling"
                      fluid
                      placeholder="how you feeling"
                    />
                  )}
                </Form.Field>
                <Form.Field>
                  <label>About You:</label>
                  {clientError.about && (
                    <InlineError text={clientError.about} />
                  )}

                  {currentUser.detail_description ? (
                    <Form.TextArea
                      value={about}
                      onChange={this.handleChange}
                      name="about"
                      placeholder={`${currentUser.detail_description}`}
                    />
                  ) : (
                    <Form.TextArea
                      value={about}
                      onChange={this.handleChange}
                      name="about"
                      placeholder="about yourself"
                    />
                  )}
                </Form.Field>

                {!isEditPasswordOn ? (
                  <React.Fragment>
                    <label
                      className="edit-password-toggle"
                      onClick={this.toggleEditPassword}
                    >
                      Edit Password
                    </label>
                    <br />
                    <br />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <label
                      className="edit-password-toggle"
                      onClick={this.toggleEditPassword}
                    >
                      Hide Edit Password
                    </label>
                    <br />
                    <br />
                    <Form.Field>
                      <label>Password:</label>
                      {clientError.password && (
                        <InlineError text={clientError.password} />
                      )}
                      <Input
                        value={password}
                        onChange={this.handleChange}
                        name="password"
                        fluid
                        placeholder={`password`}
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>New Password:</label>
                      {clientError.newPassword && (
                        <InlineError text={clientError.newPassword} />
                      )}
                      <Input
                        value={newPassword}
                        onChange={this.handleChange}
                        name="newPassword"
                        fluid
                        placeholder="new password"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Confirm New Password:</label>
                      {clientError.confirmPassword && (
                        <InlineError text={clientError.confirmPassword} />
                      )}
                      <Input
                        value={confirmPassword}
                        onChange={this.handleChange}
                        name="confirmPassword"
                        fluid
                        placeholder="confirm new password"
                      />
                    </Form.Field>
                  </React.Fragment>
                )}

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
        {!isModalOpen && (
          <button
            className="right-sidebar-button right-sidebar-item"
            onClick={this.toggleModalOpen}
          >
            Edit Profile
          </button>
        )}
      </React.Fragment>
    );
  }
}

EditMyProfileModal.propTypes = {
  currentUser: PropTypes.object.isRequired,
  feeling: PropTypes.string
};

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state)
});

const dispatchToProps = dispatch => ({
  fetchEditUser: editUserData => {
    dispatch(userAction.fetchEditUser(editUserData));
  }
});

export default connect(
  stateToProps,
  dispatchToProps
)(EditMyProfileModal);
