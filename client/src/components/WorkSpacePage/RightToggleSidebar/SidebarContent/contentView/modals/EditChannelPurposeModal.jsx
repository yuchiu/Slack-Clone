import React from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { InlineHint, InlineError } from "@/components/common";

const EditChannelPurposeModal = ({
  text,
  isModalOpen,
  clientError,
  purpose,

  toggleModalOpen,
  handleClose,
  handleChange,
  handleSave
}) => (
  <React.Fragment>
    {isModalOpen && (
      <Modal size="small" open={isModalOpen} onClose={toggleModalOpen}>
        <Modal.Content>
          <Form>
            <Form.Field>
              {purpose ? (
                <Form.TextArea
                  value={text}
                  onChange={handleChange}
                  name="text"
                  placeholder={`${purpose}`}
                />
              ) : (
                <Form.TextArea
                  value={text}
                  onChange={handleChange}
                  name="text"
                  placeholder="Add a purpose"
                />
              )}
              {clientError.text ? (
                <InlineError text={clientError.text} />
              ) : (
                <InlineHint text={"max characters: 256"} />
              )}
            </Form.Field>
            <Form.Group widths="equal">
              <Button type="button" primary onClick={handleSave} fluid>
                Set Purpose
              </Button>
              <Button type="button" fluid onClick={handleClose}>
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
            <span onClick={toggleModalOpen} className="toggle-edit-button">
              <i className="fas fa-pencil-alt" />
              edit
            </span>
          </span>
        </React.Fragment>
      )}
    {!isModalOpen &&
      !purpose && (
        <span className="toggle-edit-button" onClick={toggleModalOpen}>
          <i className="fas fa-pencil-alt" />
          add channel purpose
        </span>
      )}
  </React.Fragment>
);

EditChannelPurposeModal.propTypes = {
  text: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  clientError: PropTypes.object.isRequired,
  purpose: PropTypes.string.isRequired,

  toggleModalOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default EditChannelPurposeModal;
