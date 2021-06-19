import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import "./navigation.scss";
import { NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import {
  faEnvelope,
  faSearch,
  faShoppingCart,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import Search from "./components/search";
import ListVest from "./components/listVest";
import ListPhuKien from "./components/listPhukien";
import MenuRight from "./components/menu-right_576px";
import Search2 from "./components/search2";
import CartPopup from "./components/shoppingCart";
import UserAvarterNavigation from "./components/userAvtNav";

Navigation.propTypes = {};

function Navigation(props) {
  const handleClickSearch = () => {
    const search = document.querySelector(".SearchForm");
    search.classList.toggle("active");
  };
  return (
    <div className="navigation">
      <div className="navigation__top"></div>
      <div className="navigation__bottom">
        <Row>
          <Col xxl={6} xl={6} lg={6} md={7} sm={17} xs={17}>
            <div className="navigation__bottom--left">
              <NavLink className="logo__title" exact to="/" activeClassName="">
                <div className="logo-shop">
                  <img
                    className="logo--img"
                    src="https://i.imgur.com/iTIwckh.png"
                    alt=""
                  />
                  <span className="logo--contents">THE TUXEDO</span>
                  <img
                    className="logo--img"
                    src="https://i.imgur.com/iTIwckh.png"
                    alt=""
                  />
                </div>
              </NavLink>
            </div>
            <div className="navigation-bottom_left_search">
              <Search2 />
            </div>
          </Col>
          <Col xxl={14} xl={13} lg={13} md={13} sm={1} xs={1}>
            <ul className="navigation__bottom--mid">
              <li>
                <NavLink
                  exact
                  className="link__navigation--mid1"
                  to="/feature/vestcollection"
                  activeClassName="first99 after99"
                >
                  <span className="vest--dropdown first98 after98">
                    <span className="spacing__navi">BỘ SƯU TẬP VEST</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <ListVest />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/feature/aosomi"
                  activeClassName="first68 after68"
                >
                  <span className="first after">ÁO SƠMI</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/feature/quanau"
                  activeClassName="first68 after68"
                >
                  <span className="first after">QUẦN ÂU</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/feature/giaytay"
                  activeClassName="first68 after68"
                >
                  <span className="first after">GIÀY TÂY</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/feature/uudai"
                  activeClassName="first68 after68"
                >
                  <span className="first after">GIÁ ƯU ĐÃI</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  className="link__navigation--mid1"
                  to="/feature/phukien"
                  activeClassName="first99 after99"
                >
                  <span className="phukien--dropdown first98 after98">
                    <span className="spacing__navi">PHỤ KIỆN</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <ListPhuKien />
                  </span>
                </NavLink>
              </li>
            </ul>
          </Col>
          <Col xxl={4} xl={5} lg={5} md={4} sm={6} xs={6}>
            <ul className="navigation__bottom--right">
              <li className="link__right position--relative">
                <span className="gach-chan_right first69 after69">
                  <span
                    className="spacing__navi display-none"
                    onClick={handleClickSearch}
                  >
                    Tìm Kiếm
                  </span>
                  <FontAwesomeIcon
                    onClick={handleClickSearch}
                    className="icon__navigation"
                    icon={faSearch}
                  />
                  <Search />
                </span>
              </li>
              <li>
                <NavLink
                  className="link__right"
                  to="/feature/connectwithus"
                  activeClassName="first68-2 after68-2"
                >
                  <span className="gach-chan_right first69 after69">
                    <span className="spacing__navi display-none">Liên hệ</span>
                    <FontAwesomeIcon
                      className="icon__navigation"
                      icon={faEnvelope}
                    />
                  </span>
                </NavLink>
              </li>
              <li>
                <UserAvarterNavigation />
              </li>
              <li>
                <NavLink
                  exact
                  to="/feature/cartPage"
                  className="link__right-icon"
                  activeClassName="first68-4 after68-4"
                >
                  <span className="gach-chan_right2 first86 after86">
                    <FontAwesomeIcon
                      className="icon-navigation_scale"
                      icon={faShoppingCart}
                    />
                    <CartPopup />
                  </span>
                </NavLink>
              </li>
            </ul>
            {/* menu max-width 576px */}
            <div className="mini-menu_right">
              <div>
                <NavLink
                  exact
                  className="link__right-icon"
                  to="/feature/cartPage"
                  activeClassName="first68-4 after68-4"
                >
                  <span className="gach-chan_right2 first86 after86">
                    <FontAwesomeIcon
                      className="icon-navigation_scale"
                      icon={faShoppingCart}
                    />
                  </span>
                </NavLink>
              </div>
              <MenuRight />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Navigation;
