import React from "react";
import PropTypes from "prop-types";
import Navigation from "./navigation";
import "./header.scss";

Header.propTypes = {};

function Header(props) {
  return (
    <div className="header">
      <Navigation />
    </div>
  );
}

export default Header;
