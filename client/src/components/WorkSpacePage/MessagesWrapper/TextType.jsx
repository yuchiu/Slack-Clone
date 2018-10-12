import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const TextType = ({ text, url, showMore, toggleShowMore }) => (
  <React.Fragment>
    <div>--------text--------</div>
    {text.length < 500 && (
      <React.Fragment>
        <p>{text}</p>
        <div>--------end---------</div>
      </React.Fragment>
    )}
    {text.length > 500 &&
      (showMore ? (
        <React.Fragment>
          <p>
            {text.slice(0, 500)}
            ...
          </p>
          <div>
            ---------
            <a className="toggle-more-button" onClick={toggleShowMore}>
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
            <a className="toggle-more-button" onClick={toggleShowMore}>
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
  </React.Fragment>
);
TextType.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  showMore: PropTypes.bool.isRequired,
  toggleShowMore: PropTypes.func.isRequired
};

export default TextType;
