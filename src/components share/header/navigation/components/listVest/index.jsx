import React from "react";
import PropTypes from "prop-types";
import "./listVest.scss";
import { NavLink } from "react-router-dom";

ListVest.propTypes = {};

function ListVest(props) {
  return (
    <ul className="menu-vest">
      <div className="vest--list">
        <li className="li--vest">
          <NavLink
            className="navling-vest "
            to="/feature/vestcollection/vestdahoi"
            activeClassName="first2 after7"
          >
            <span className="name-item_vest  first after">Vest Dạ Hội</span>
          </NavLink>
        </li>
        <li className="li--vest">
          <NavLink
            className="navling-vest"
            to="/feature/vestcollection/vestcongso"
            activeClassName="first2 after8"
          >
            <span className="name-item_vest first after">Vest Công Sở</span>
          </NavLink>
        </li>
        <li className="li--vest">
          <NavLink
            className="navling-vest"
            to="/feature/vestcollection/vestcuoi"
            activeClassName="first2 after9"
          >
            <span className="name-item_vest first after">Vest Trăm Năm</span>
          </NavLink>
        </li>
      </div>
    </ul>
  );
}

export default ListVest;
