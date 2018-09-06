import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateTeamPage extends React.Component {
  render() {
    return <div>CreateTeamPage</div>;
  }
}

CreateTeamPage.propTypes = {
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(CreateTeamPage);
