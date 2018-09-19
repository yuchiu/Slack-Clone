import React from "react";
import { Icon } from "semantic-ui-react";

export default class RenderText extends React.Component {
  state = {
    text: "",
    showMore: false
  };

  componentDidMount = async () => {
    const { url } = this.props;
    const response = await fetch(url);
    const text = await response.text();
    this.setState({ text });
  };

  handleClick = () => {
    this.setState({
      showMore: !this.state.showMore
    });
  };

  render() {
    const { text } = this.state;
    const { url } = this.props;
    return (
      <div>
        <div>--------text--------</div>
        {text.length < 500 && (
          <React.Fragment>
            <p>{text}</p>
            <div>--------end---------</div>
          </React.Fragment>
        )}
        {text.length > 500 &&
          (!this.state.showMore ? (
            <React.Fragment>
              <p>
                {text.slice(0, 500)}
                ...
              </p>
              <div>
                ---------
                <a className="toggle-more-button" onClick={this.handleClick}>
                  more
                </a>
                ---------
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>{text}</p>
              <div>
                ---------
                <a className="toggle-more-button" onClick={this.handleClick}>
                  hide
                </a>
                ---------
              </div>
            </React.Fragment>
          ))}
        <br />
        <a href={url} target="blank">
          <Icon className="file alternate" />
          File Link
        </a>
      </div>
    );
  }
}
