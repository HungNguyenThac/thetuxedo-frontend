import React from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import Navigation from "./navigation";
import Banner from "./banner";
import "./header.scss";

Header.propTypes = {};

const ao = React.lazy(() => import("../../feauture/ao"));
const giay = React.lazy(() => import("../../feauture/giay"));
const quan = React.lazy(() => import("../../feauture/quan"));
const sale = React.lazy(() => import("../../feauture/sale"));

function Header(props) {
  return (
    <div className="header">
      <Navigation />
      <Banner />
    </div>
  );
}

export default Header;
