import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { authAction } from "@/actions";

class TryAutoAuth extends React.Component {
  componentDidMount() {
    const { autoAuth } = this.props;
    autoAuth();
  }

  render() {
    return null;
  }
}

TryAutoAuth.propTypes = {
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
)(TryAutoAuth);
