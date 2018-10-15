import React from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import { HintInline, ErrorInline, ButtonInline } from "@/components/common";

const EditChannelPurposeModal = ({
  text,
  isModalOpen,
  clientError,
  purpose,

  toggleModal,
  handleClose,
  handleChange,
  handleSave
}) => (
  <React.Fragment>
    {isModalOpen && (
      <Modal size="small" open={isModalOpen} onClose={toggleModal}>
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
                <ErrorInline text={clientError.text} />
              ) : (
                <HintInline text={"max characters: 256"} />
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
    {!isModalOpen && purpose ? (
      <ButtonInline
        title={purpose}
        cssClass="lightgrey"
        displayText="edit"
        icon={<i className="fas fa-pencil-alt" />}
        handleClick={toggleModal}
      />
    ) : (
      <ButtonInline
        title={purpose}
        cssClass="lightgrey"
        displayText="add channel purpose"
        icon={<i className="fas fa-pencil-alt" />}
        handleClick={toggleModal}
      />
    )}
  </React.Fragment>
);

EditChannelPurposeModal.propTypes = {
  text: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  clientError: PropTypes.object.isRequired,
  purpose: PropTypes.string.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default EditChannelPurposeModal;
