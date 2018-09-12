import React from "react";
import PropTypes from "prop-types";
import { Input, Form, Button } from "semantic-ui-react";
import io from "socket.io-client";

import "./index.scss";

const socket = io("ws://localhost:3030");

socket.on("receiveMsg", data => {
  console.log(data);
});

class InputContainer extends React.Component {
  state = {
    message: ""
  };

  componentDidMount() {
    socket.emit("sendMsg", "aloha");
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    const { message } = this.state;
    const { onSubmit } = this.props;
    if (message) {
      await onSubmit(message);
      this.setState({ message: "" });
    }
  };

  render() {
    const { message } = this.state;
    return (
      <div className="input-container">
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Input
                fluid
                focus
                name="message"
                value={message}
                placeholder={`# Someone`}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

InputContainer.propTypes = {
  placeholder: PropTypes.string
};
export default InputContainer;
