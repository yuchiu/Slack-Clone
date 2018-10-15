import React from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { HintInline, ButtonInline, ErrorInline } from "@/components/common";

const ModalTopic = ({
  text,
  clientError,
  topic,
  isModalOpen,
  toggleModal,
  handleChange,
  handleClose,
  handleSave
}) => (
  <React.Fragment>
    {isModalOpen && (
      <Modal size="small" open={isModalOpen} onClose={toggleModal}>
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
                <ErrorInline text={clientError.text} />
              ) : (
                <HintInline text={"max characters: 128"} />
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
    {!isModalOpen && topic ? (
      <ButtonInline
        cssClass="lightgrey"
        title={topic}
        icon={<i className="fas fa-pencil-alt" />}
        displayText="edit"
        handleClick={toggleModal}
      />
    ) : (
      <ButtonInline
        cssClass="lightgrey"
        title={topic}
        icon={<i className="fas fa-pencil-alt" />}
        displayText="add a topic"
        handleClick={toggleModal}
      />
    )}
  </React.Fragment>
);

ModalTopic.propTypes = {
  text: PropTypes.string,
  topic: PropTypes.string,
  clientError: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default ModalTopic;
