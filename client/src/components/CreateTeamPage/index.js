import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { teamAction } from "@/actions";
import { NavBar, InlineError } from "../common";
import { validateForm } from "../../utils";
import CreateTeamForm from "./CreateTeamForm";
import { errorSelector } from "@/reducers/selectors";

class CreateTeamPage extends React.Component {
  state = {
    name: "",
    about: "",
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
      const { fetchCreateTeam, history } = this.props;
      const { name, about } = this.state;
      fetchCreateTeam({ name, about });
      history.push(`/`);
    }
  };

  render() {
    const { clientErrors, name, about } = this.state;
    const { error } = this.props;

    return (
      <React.Fragment>
        <NavBar />
        <main className="create-team-page">
          <CreateTeamForm
            clientErrors={clientErrors}
            name={name}
            about={about}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          {error && <InlineError text={error} />}
        </main>
      </React.Fragment>
    );
  }
}

CreateTeamPage.propTypes = {
  fetchCreateTeam: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired
};

const stateToProps = state => ({
  error: errorSelector.getError(state)
});

const dispatchToProps = dispatch => ({
  fetchCreateTeam: teamFormInfo => {
    dispatch(teamAction.fetchCreateTeam(teamFormInfo));
  }
});
export default connect(
  stateToProps,
  dispatchToProps
)(CreateTeamPage);
