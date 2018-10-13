import React from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./TopicModal.scss";
import { InlineHint, InlineError } from "@/components/common";

const TopicModal = ({
  text,
  clientError,
  topic,
  isEditModalOpen,
  toggleEditModal,
  handleChange,
  handleClose,
  handleSave
}) => (
  <React.Fragment>
    {isEditModalOpen && (
      <Modal size="small" open={isEditModalOpen} onClose={toggleEditModal}>
        <Modal.Content>
          <Form>
            <Form.Field>
              {topic ? (
                <Form.TextArea
                  value={text}
                  onChange={handleChange}
                  name="text"
                  placeholder={`${topic}`}
                />
              ) : (
                <Form.TextArea
                  value={text}
                  onChange={handleChange}
                  name="text"
                  placeholder="Add a topic"
                />
              )}
              {clientError.text ? (
                <InlineError text={clientError.text} />
              ) : (
                <InlineHint text={"max characters: 128"} />
              )}
            </Form.Field>

            <Form.Group widths="equal">
              <Button type="button" primary onClick={handleSave} fluid>
                Set Topic
              </Button>
              <Button type="button" fluid onClick={handleClose}>
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
            <span onClick={toggleEditModal} className="topic-edit-button">
              <i className="fas fa-pencil-alt" />
              edit
            </span>
          </span>
        </React.Fragment>
      )}
    {!isEditModalOpen &&
      !topic && (
        <span className="topic-edit-button" onClick={toggleEditModal}>
          <i className="fas fa-pencil-alt" />
          add a topic
        </span>
      )}
  </React.Fragment>
);

TopicModal.propTypes = {
  text: PropTypes.string,
  topic: PropTypes.string,
  clientError: PropTypes.object.isRequired,
  isEditModalOpen: PropTypes.bool.isRequired,

  toggleEditModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default TopicModal;
