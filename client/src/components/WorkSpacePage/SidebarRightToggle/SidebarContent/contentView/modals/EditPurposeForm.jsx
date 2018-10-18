import React from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import { HintInline, ErrorInline } from "@/components/common";

const ModalEditPurpose = ({
  currentPurpose,
  fieldErrors,
  formFields,

  toggleModal,
  handleFieldChange,
  handleSave
}) => (
  <Form>
    <Form.Field>
      {currentPurpose ? (
        <Form.TextArea
          value={formFields.purpose}
          onChange={handleFieldChange}
          name="purpose"
          placeholder={`${currentPurpose}`}
        />
      ) : (
        <Form.TextArea
          value={formFields.purpose}
          onChange={handleFieldChange}
          name="purpose"
          placeholder="Add a purpose"
        />
      )}
      {fieldErrors.purpose ? (
        <ErrorInline text={fieldErrors.purpose} />
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
  fieldErrors: PropTypes.object.isRequired,
  formFields: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default ModalEditPurpose;
