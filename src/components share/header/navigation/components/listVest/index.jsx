import React from "react";
import { NavLink } from "react-router-dom";
import "./listVest.scss";
import { PropTypes } from "prop-types";

ListVest.propTypes = {
  handleHover: PropTypes.func,
};

ListVest.defaultProps = {
  handleHover: null,
};

function ListVest(props) {
  const { handleHover } = props;

  function handleClickToHoverParentList() {
    if (!handleHover) return;
    handleHover();
  }
  return (
    <ul className="menu-vest">
      <div className="vest--list">
        <li className="li--vest">
          <NavLink
            className="navling-vest"
            to="/feature/vestcollection/vestcuoi"
            activeClassName="first2 after9"
            onClick={handleClickToHoverParentList}
          >
            <span className="name-item_vest first after">Vest Trăm Năm</span>
          </NavLink>
        </li>
        <li className="li--vest">
          <NavLink
            className="navling-vest "
            to="/feature/vestcollection/vestdahoi"
            activeClassName="first2 after7"
            onClick={handleClickToHoverParentList}
          >
            <span className="name-item_vest  first after">Vest Dạ Hội</span>
          </NavLink>
        </li>
        <li className="li--vest">
          <NavLink
            className="navling-vest"
            to="/feature/vestcollection/vestcongso"
            activeClassName="first2 after8"
            onClick={handleClickToHoverParentList}
          >
            <span className="name-item_vest first after">Vest Công Sở</span>
          </NavLink>
        </li>
      </div>
    </ul>
  );
}

export default ListVest;
