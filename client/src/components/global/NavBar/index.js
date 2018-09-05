import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends React.Component {
  state = {
    current: ""
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  handleLogout = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <div className="navbar-container">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="landing">
            <Link to="/">
              <Icon type="home" />
              Slack
            </Link>
          </Menu.Item>
          <Menu.Item style={{ float: "right" }}>
            <Link to="/register">
              <Icon type="user-add" />
              register
            </Link>
          </Menu.Item>
          <Menu.Item style={{ float: "right" }}>
            <Link to="/login">
              <Icon type="login" />
              login
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired
};

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(NavBar)
);
