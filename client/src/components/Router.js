import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userAction } from "@/actions";
import Router from "./Router.jsx";

class RouterContainer extends React.Component {
  state = {
    hasError: false
  };

  UNSAFE_componentWillMount() {
    const { fetchTryAutoSignIn } = this.props;
    fetchTryAutoSignIn();
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true
    });
  }

  render() {
    const { hasError } = this.state;
    return <Router hasError={hasError} />;
  }
}

RouterContainer.propTypes = {
  fetchTryAutoSignIn: PropTypes.func.isRequired
};

const dispatchToProps = dispatch => ({
  fetchTryAutoSignIn: () => {
    dispatch(userAction.fetchTryAutoSignIn());
  }
});

export default connect(
  null,
  dispatchToProps
)(RouterContainer);
