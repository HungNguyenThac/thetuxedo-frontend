import React from "react";
import PropTypes from "prop-types";
import "./listPhuKien.scss";
import { NavLink } from "react-router-dom";

ListPhuKien.propTypes = {
  handleHoverPhuKien: PropTypes.func,
};

ListPhuKien.defaultProps = {
  handleHoverPhuKien: null,
};

function ListPhuKien(props) {
  const { handleHoverPhuKien } = props;

  function handleClickToHoverParentList() {
    if (!handleHoverPhuKien) return;
    handleHoverPhuKien();
  }
  return (
    <ul className="menu-phukien">
      <div className="list-phukien">
        <li className="li-phukien">
          <NavLink
            className="navling-phukien"
            to="/feature/phukien/cavat"
            activeClassName="first2 after2"
            onClick={handleClickToHoverParentList}
          >
            <span className="name-phukien first after">Cà Vạt</span>
          </NavLink>
        </li>
        <li className="li-phukien">
          <NavLink
            className="navling-phukien"
            to="/feature/phukien/thatlung"
            activeClassName="first2 after3"
            onClick={handleClickToHoverParentList}
          >
            <span className="name-phukien first after">Thắt Lưng</span>
          </NavLink>
        </li>
        <li className="li-phukien">
          <NavLink
            className="navling-phukien"
            to="/feature/phukien/nocaico"
            activeClassName="first2 after4"
            onClick={handleClickToHoverParentList}
          >
            <span className="name-phukien first after">Nơ Cài Cổ</span>
          </NavLink>
        </li>
        <li className="li-phukien">
          <NavLink
            className="navling-phukien"
            to="/feature/phukien/khancaiao"
            onClick={handleClickToHoverParentList}
            activeClassName="first2 after5"
          >
            <span className="name-phukien first after">Khăn Cài Áo</span>
          </NavLink>
        </li>
        <li className="li-phukien">
          <NavLink
            className="navling-phukien"
            to="/feature/phukien/ghimcaiao"
            onClick={handleClickToHoverParentList}
            activeClassName="first2 after6"
          >
            <span className="name-phukien first after">Ghim Cài Áo</span>
          </NavLink>
        </li>
      </div>
    </ul>
  );
}

export default ListPhuKien;
