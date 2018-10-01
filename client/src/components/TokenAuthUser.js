import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { authAction } from "@/actions";

class AutoAuth extends React.Component {
  componentDidMount() {
    const { autoAuth } = this.props;
    autoAuth();
  }

  render() {
    return null;
  }
}

AutoAuth.propTypes = {
  autoAuth: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  autoAuth: () => {
    dispatch(authAction.autoAuth());
  }
});

export default connect(
  null,
  dispatchToProps
)(AutoAuth);
