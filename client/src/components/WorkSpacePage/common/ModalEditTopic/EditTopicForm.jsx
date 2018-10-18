import React from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import { HintInline, ErrorInline } from "@/components/common";

const EditTopicForm = ({
  currentTopic,
  fieldErrors,
  formFields,
  toggleModal,
  handleFieldChange,
  handleSave
}) => (
  <Form>
    <Form.Field>
      {currentTopic ? (
        <Form.TextArea
          value={formFields.topic}
          onChange={handleFieldChange}
          name="topic"
          placeholder={`${currentTopic}`}
        />
      ) : (
        <Form.TextArea
          value={formFields.topic}
          onChange={handleFieldChange}
          name="topic"
          placeholder="Add a topic"
        />
      )}
      {fieldErrors.topic ? (
        <ErrorInline text={fieldErrors.topic} />
      ) : (
        <HintInline text={"max characters: 128"} />
      )}
    </Form.Field>

    <Form.Group widths="equal">
      <Button type="button" primary onClick={handleSave} fluid>
        Set Topic
      </Button>
      <Button type="button" fluid onClick={toggleModal}>
        Cancel
      </Button>
    </Form.Group>
  </Form>
);

EditTopicForm.propTypes = {
  currentTopic: PropTypes.string,
  formFields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default EditTopicForm;
