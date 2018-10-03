import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "@/actions";

class TryAutoAuth extends React.Component {
  componentDidMount() {
    const { fetchAutoAuth } = this.props;
    fetchAutoAuth();
  }

  render() {
    return null;
  }
}

TryAutoAuth.propTypes = {
  fetchAutoAuth: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  fetchAutoAuth: () => {
    dispatch(userAction.fetchAutoAuth());
  }
});

export default connect(
  null,
  dispatchToProps
)(TryAutoAuth);
