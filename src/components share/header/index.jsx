import React from "react";
import PropTypes from "prop-types";
import Navigation from "./navigation";
import Banner from "./banner";
import "./header.scss";

Header.propTypes = {};

function Header(props) {
  return (
    <div className="header">
      <Navigation />
      <Banner />
    </div>
  );
}

export default Header;
