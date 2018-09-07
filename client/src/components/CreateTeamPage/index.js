import React from "react";
import Proptypes from "prop-types";

import { NavBar } from "../global";
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

  handleSubmit = async () => {
    // validate user's login info on client side
    const clientErrors = validateForm.createTeam(this.state);
    this.setState({ clientErrors });

    // proceed to send data to server if there's no error
    if (Object.keys(clientErrors).length === 0) {
      const { name } = this.state;
      console.log(`creating team ${name}`);
    }
  };

  render() {
    const { clientErrors, name } = this.state;

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
        </main>
      </React.Fragment>
    );
  }
}
export default CreateTeamPage;
