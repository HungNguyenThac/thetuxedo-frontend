import React from "react";
import PropTypes from "prop-types";
import "./menu-right_576px.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import MenuList from "./components/ul-list-element";

MenuRight.propTypes = {};

function MenuRight(props) {
  return (
    <div className="menu-right">
      <span className="menu-right_icon">
        <FontAwesomeIcon icon={faListUl} />
      </span>
      <MenuList />
    </div>
  );
}

export default MenuRight;
