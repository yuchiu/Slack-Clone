import React from "react";
import { Form, Input, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import { ErrorInline, HintInline } from "@/components/common";

const ModalEditFeeling = ({
  formFields,
  fieldErrors,
  currentFeeling,

  handleFieldChange,
  toggleModal,
  handleSave
}) => (
  <Form>
    <Form.Field>
      {currentFeeling ? (
        <Input
          value={formFields.feeling}
          onChange={handleFieldChange}
          name="feeling"
          fluid
          placeholder={`${currentFeeling}`}
        />
      ) : (
        <Input
          value={formFields.feeling}
          onChange={handleFieldChange}
          name="feeling"
          fluid
          placeholder="how you feeling"
        />
      )}
      {fieldErrors.text ? (
        <ErrorInline text={fieldErrors.text} />
      ) : (
        <HintInline text={"max characters: 32"} />
      )}
    </Form.Field>
    <Form.Group widths="equal">
      <Button type="button" primary onClick={handleSave} fluid>
        Save
      </Button>
      <Button type="button" fluid onClick={toggleModal}>
        Cancel
      </Button>
    </Form.Group>
  </Form>
);

ModalEditFeeling.propTypes = {
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  handleFieldChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default ModalEditFeeling;
