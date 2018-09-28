import React from "react";
import { Form, Input, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { PublicOrPrivateTag } from "@/components/common";
import SubHeaderDivider from "./SubHeaderDivider";

class ChannelHeader extends React.Component {
  state = {
    text: "",
    isEditOn: false
  };

  componentDidMount() {}

  toggleEdit = () => {
    this.setState({
      isEditOn: !this.state.isEditOn
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({
      text: "",
      isEditOn: false
    });
    this.toggleEdit();
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleEdit = () => {
    const { text } = this.state;
    console.log(`edit success: ${text}`);
    this.setState({
      text: "",
      isEditOn: false
    });
  };

  render() {
    const { text, isEditOn } = this.state;
    const { topic } = this.props;
    return (
      <React.Fragment>
        {isEditOn && (
          <Modal size="small" open={isEditOn} onClose={this.toggleEdit}>
            <Modal.Content>
              <Form>
                <Form.Field>
                  <Input
                    value={text}
                    onChange={this.handleChange}
                    name="text"
                    fluid
                    placeholder="Add a topic"
                  />
                </Form.Field>
                <Form.Group widths="equal">
                  <Button type="button" primary onClick={this.handleEdit} fluid>
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
        {!isEditOn &&
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
        {!isEditOn &&
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

ChannelHeader.propTypes = {};

export default ChannelHeader;
