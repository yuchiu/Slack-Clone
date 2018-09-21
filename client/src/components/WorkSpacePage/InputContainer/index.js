import React from "react";
import PropTypes from "prop-types";

import "./index.scss";
import FileUpload from "./FileUpload";
import InputBox from "./InputBox";

class InputContainer extends React.Component {
  render() {
    return (
      <div className="input-container">
        <FileUpload />
        <InputBox />
      </div>
    );
  }
}

export default InputContainer;
