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
    const { fetchAutoAuth } = this.props;
    fetchAutoAuth();
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
)(RouterContainer);
