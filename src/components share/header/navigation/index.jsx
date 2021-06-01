import React from "react";
import PropTypes from "prop-types";
import "./navigation.scss";
import { NavLink, Route, Switch } from "react-router-dom";

Navigation.propTypes = {};

function Navigation(props) {
  return (
    <div className="navigation">
      <h1>
        <NavLink
          className="link--navigation"
          exact
          to="/"
          activeClassName="selected"
        >
          Mainpage
        </NavLink>
      </h1>
      <h1>
        <NavLink
          className="link--navigation"
          to="/feature/ao"
          activeClassName="selected"
        >
          Áo
        </NavLink>
      </h1>
      <h1>
        <NavLink
          className="link--navigation"
          to="/feature/giay"
          activeClassName="selected"
        >
          Giày
        </NavLink>
      </h1>
      <h1>
        <NavLink
          className="link--navigation"
          to="/feature/quan"
          activeClassName="selected"
        >
          Quần
        </NavLink>
      </h1>
      <h1>
        <NavLink
          className="link--navigation"
          to="/feature/sale"
          activeClassName="selected"
        >
          Sale
        </NavLink>
      </h1>
    </div>
  );
}

export default Navigation;
