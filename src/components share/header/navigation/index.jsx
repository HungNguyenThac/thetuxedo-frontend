import {
  faCaretDown,
  faEnvelope,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import "antd/dist/antd.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import ListPhuKien from "./components/listPhukien";
import ListVest from "./components/listVest";
import MenuRight from "./components/menu-right_576px";
import Search from "./components/search";
import Search2 from "./components/search2";
import CartPopup from "./components/shoppingCart";
import UserAvarterNavigation from "./components/userAvtNav";
import "./navigation.scss";

Navigation.propTypes = {};

function Navigation() {
  const listItems = useSelector((state) => state.itemCart.itemCart);
  const location = useLocation();
  const numbersItemInCart = listItems.length;
  const handleClickSearch = () => {
    const search = document.querySelector(".SearchForm");
    search.classList.toggle("active");
  };
  function handleHoverVest() {
    const element = document.querySelector(".vest");
    element.classList.add("first99", "after99");
  }

  function handleHoverPhuKien() {
    const element = document.querySelector(".phukien");
    element.classList.add("first99", "after99");
  }
  useEffect(() => {
    const phukien = document.querySelector(".phukien");
    const vest = document.querySelector(".vest");
    if (
      location.pathname === "/vestcollection" ||
      location.pathname === "/vestcollection/vestcollection" ||
      location.pathname === "/vestcollection/vestcuoi" ||
      location.pathname === "/vestcollection/vestcongso" ||
      location.pathname === "/vestcollection/vestdahoi"
    ) {
      vest.classList.add("first99", "after99");
    } else {
      vest.classList.remove("first99", "after99");
    }
    if (
      location.pathname === "/phukien" ||
      location.pathname === "/phukien/combo" ||
      location.pathname === "/phukien/thatlung" ||
      location.pathname === "/phukien/cavat" ||
      location.pathname === "/phukien/nocaico" ||
      location.pathname === "/phukien/khancaiao" ||
      location.pathname === "/phukien/ghimcaiao"
    ) {
      phukien.classList.add("first99", "after99");
    } else {
      phukien.classList.remove("first99", "after99");
    }
  }, [location]);

  return (
    <div className="navigation">
      <div className="navigation__top"></div>
      <div className="navigation__bottom">
        <Row>
          <Col xxl={6} xl={6} lg={6} md={7} sm={17} xs={17}>
            <div className="navigation__bottom--left">
              <NavLink className="logo__title" exact to="/" activeClassName="">
                <div className="logo-shop">
                  <img className="logo--img" src={logo} alt="" />
                  <span className="logo--contents">THE TUXEDO</span>
                  <img className="logo--img" src={logo} alt="" />
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
                  className="link__navigation--mid1 vest"
                  to="/vestcollection/listItem"
                  activeClassName="first99 after99"
                >
                  <span className="vest--dropdown first98 after98">
                    <span className="spacing__navi">BỘ SƯU TẬP VEST</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <ListVest handleHover={handleHoverVest} />
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/aosomi"
                  activeClassName="first68 after68"
                >
                  <span className="first after">ÁO SƠMI</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/quanau"
                  activeClassName="first68 after68"
                >
                  <span className="first after">QUẦN ÂU</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/giaytay"
                  activeClassName="first68 after68"
                >
                  <span className="first after">GIÀY TÂY</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/uudai"
                  activeClassName="first68 after68"
                >
                  <span className="first after">GIÁ ƯU ĐÃI</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  className="link__navigation--mid1 phukien"
                  to="/phukien"
                  activeClassName="first99 after99"
                >
                  <span className="phukien--dropdown first98 after98">
                    <span className="spacing__navi">PHỤ KIỆN</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <ListPhuKien handleHoverPhuKien={handleHoverPhuKien} />
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
                  to="/connectwithus"
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
              <li className="scale-icon-on-hover">
                <NavLink
                  exact
                  to="/cartPage"
                  className="link__right-icon"
                  activeClassName="first68-4 after68-4"
                >
                  <span className="gach-chan_right2 first86 after86">
                    <FontAwesomeIcon
                      className="icon-navigation_scale"
                      icon={faShoppingCart}
                    />
                    <CartPopup listItems={listItems} />
                  </span>
                  <span className="quantity-in-cart">
                    ({numbersItemInCart})
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
                  to="/cartPage"
                  activeClassName="first68-4 after68-4"
                >
                  <span className="gach-chan_right2 first86 after86">
                    <FontAwesomeIcon
                      className="icon-navigation_scale"
                      icon={faShoppingCart}
                    />
                    <small className="numbers-in-cart">
                      ({numbersItemInCart})
                    </small>
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
