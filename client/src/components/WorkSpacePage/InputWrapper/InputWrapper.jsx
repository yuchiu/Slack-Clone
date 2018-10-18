import React from "react";

import "./InputWrapper.scss";
import FileUpload from "./FileUpload";
import InputBox from "./InputBox";

const InputWrapper = () => (
  <div className="input-wrapper">
    <FileUpload />
    <InputBox />
  </div>
);

export default InputWrapper;
