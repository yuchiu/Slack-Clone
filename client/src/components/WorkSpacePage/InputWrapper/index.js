import React from "react";
import PropTypes from "prop-types";

import "./index.scss";
import FileUpload from "./FileUpload";
import InputBox from "./InputBox";

class InputContainer extends React.PureComponent {
  render() {
    return (
      <div className="input-wrapper">
        <FileUpload />
        <InputBox />
      </div>
    );
  }
}

export default InputContainer;
