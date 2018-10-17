import React from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import { HintInline, ErrorInline } from "@/components/common";

const EditTopicForm = ({
  currentTopic,
  clientErrors,
  formFields,
  toggleModal,
  handleChange,
  handleSave
}) => (
  <Form>
    <Form.Field>
      {currentTopic ? (
        <Form.TextArea
          value={formFields.topic}
          onChange={handleChange}
          name="topic"
          placeholder={`${currentTopic}`}
        />
      ) : (
        <Form.TextArea
          value={formFields.topic}
          onChange={handleChange}
          name="topic"
          placeholder="Add a topic"
        />
      )}
      {clientErrors.topic ? (
        <ErrorInline text={clientErrors.topic} />
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
  clientErrors: PropTypes.object.isRequired,

  toggleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default EditTopicForm;
