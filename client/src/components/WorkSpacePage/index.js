import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class WorkSpacePage extends React.Component {
  render() {
    return <div>WorkSpacePage</div>;
  }
}

WorkSpacePage.propTypes = {
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(WorkSpacePage);
