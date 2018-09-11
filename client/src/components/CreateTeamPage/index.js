import React from "react";
import Proptypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { teamAction } from "@/actions";
import { NavBar, InlineError } from "../global";
import { validateForm } from "../../utils";
import CreateTeamForm from "./CreateTeamForm";

class CreateTeamPage extends React.Component {
  state = {
    name: "",
    clientErrors: {}
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    // validate user's login info on client side
    const clientErrors = validateForm.createTeam(this.state);
    this.setState({ clientErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(clientErrors).length === 0) {
      const { name } = this.state;
      const { createTeam, history } = this.props;
      createTeam({ name });
      history.push("/workspace");
    }
  };

  render() {
    const { clientErrors, name } = this.state;
    const { error } = this.props;

    return (
      <React.Fragment>
        <NavBar />
        <main className="create-team-page">
          <CreateTeamForm
            clientErrors={clientErrors}
            name={name}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          {error && <InlineError text={error} />}
        </main>
      </React.Fragment>
    );
  }
}

const stateToProps = state => ({
  error: state.teamReducer.error
});

const dispatchToProps = dispatch => ({
  createTeam: teamFormInfo => {
    dispatch(teamAction.createTeam(teamFormInfo));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(CreateTeamPage);
