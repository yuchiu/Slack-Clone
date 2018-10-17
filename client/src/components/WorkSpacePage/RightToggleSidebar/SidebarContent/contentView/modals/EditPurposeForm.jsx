import React from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import { HintInline, ErrorInline } from "@/components/common";

const ModalEditPurpose = ({
  currentPurpose,
  clientErrors,
  formFields,

  toggleModal,
  handleChange,
  handleSave
}) => (
  <Form>
    <Form.Field>
      {currentPurpose ? (
        <Form.TextArea
          value={formFields.purpose}
          onChange={handleChange}
          name="purpose"
          placeholder={`${currentPurpose}`}
        />
      ) : (
        <Form.TextArea
          value={formFields.purpose}
          onChange={handleChange}
          name="purpose"
          placeholder="Add a purpose"
        />
      )}
      {clientErrors.purpose ? (
        <ErrorInline text={clientErrors.purpose} />
      ) : (
        <HintInline text={"max characters: 256"} />
      )}
    </Form.Field>
    <Form.Group widths="equal">
      <Button type="button" primary onClick={handleSave} fluid>
        Set Purpose
      </Button>
      <Button type="button" fluid onClick={toggleModal}>
        Cancel
      </Button>
    </Form.Group>
  </Form>
);

ModalEditPurpose.propTypes = {
  currentPurpose: PropTypes.string,
  clientErrors: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default ModalEditPurpose;
