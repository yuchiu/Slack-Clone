import { HOCForm } from "@/components/common";

import InputBox from "./InputBox.jsx";

const formDataToProps = () => ({
  formFields: {
    text: ""
  },
  formOptions: {
    ENTER_KEY: 13
  }
});

export default HOCForm(formDataToProps)(InputBox);
