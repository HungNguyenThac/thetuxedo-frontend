import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MenuList from "./components/ul-list-element";
import "./menu-right_576px.scss";

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
