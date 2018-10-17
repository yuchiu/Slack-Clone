import { connect } from "react-redux";

import { userSelector } from "@/reducers/";
import MyProfileView from "./MyProfileView.jsx";

const stateToProps = state => ({
  currentUser: userSelector.getCurrentUser(state)
});

export default connect(
  stateToProps,
  null
)(MyProfileView);
