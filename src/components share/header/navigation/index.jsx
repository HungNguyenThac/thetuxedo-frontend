import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import "./navigation.scss";
import { NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { Menu, Dropdown, Button } from "antd";
import {
  faUserTie,
  faEnvelope,
  faSearch,
  faShoppingCart,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import useMagicColor from "../../../customHook/randomColor";

Navigation.propTypes = {};

const vest = (
  <Menu>
    <div className="menuItem">
      <Menu.Item>
        <NavLink
          className="droplink"
          to="/feature/vestcollection/vestdahoi"
          activeClassName="selected"
        >
          Vest Dạ Hội
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          className="droplink"
          to="/feature/vestcollection/vestcuoi"
          activeClassName="selected"
        >
          Vest Trăm Năm
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          className="droplink"
          to="/feature/vestcollection/vestcongso"
          activeClassName="selected"
        >
          Vest Công Sở
        </NavLink>
      </Menu.Item>
    </div>
  </Menu>
);

const phukien = (
  <Menu>
    <div className="menuItem">
      <Menu.Item>
        <NavLink
          className="droplink"
          to="/feature/phukien/thatlung"
          activeClassName="selected"
        >
          Thắt Lưng
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          className="droplink"
          to="/feature/phukien/cavat"
          activeClassName="selected"
        >
          Cà Vạt
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          className="droplink"
          to="/feature/phukien/nocaico"
          activeClassName="selected"
        >
          Nơ Cài Cổ
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          className="droplink"
          to="/feature/phukien/khancaiao"
          activeClassName="selected"
        >
          Khăn Cài Áo
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink
          className="droplink"
          to="/feature/phukien/mangsettay"
          activeClassName="selected"
        >
          Măng Sét Tay
        </NavLink>
      </Menu.Item>
    </div>
  </Menu>
);
function Navigation(props) {
  const handleClickSearch = () => {
    const search = document.querySelector("");
  };
  const color = useMagicColor();
  return (
    <div className="navigation">
      <div className="navigation__top"></div>
      <div className="navigation__bottom">
        <Row>
          <Col xxl={6} xl={6} lg={6} md={7} xs={9}>
            <div className="navigation__bottom--left">
              <NavLink
                className="logo__title"
                style={{ color: color }}
                exact
                to="/"
                activeClassName=""
              >
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
          </Col>
          <Col xxl={14} xl={14} lg={15} md={14}>
            <ul className="navigation__bottom--mid">
              <li>
                <Dropdown
                  className="dropdown--navigation"
                  overlay={vest}
                  placement="bottomCenter"
                  arrow
                >
                  <Button>
                    <NavLink
                      exact
                      className="link__navigation--mid"
                      to="/feature/vestcollection"
                      activeClassName="selected"
                    >
                      <span className="spacing__navi">BỘ SƯU TẬP VEST</span>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </NavLink>
                  </Button>
                </Dropdown>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/feature/aosomi"
                  activeClassName="selected"
                >
                  ÁO SƠMI
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/feature/quanau"
                  activeClassName="selected"
                >
                  QUẦN ÂU
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/feature/giaytay"
                  activeClassName="selected"
                >
                  GIÀY TÂY
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__navigation--mid"
                  to="/feature/uudai"
                  activeClassName="selected"
                >
                  GIÁ ƯU ĐÃI
                </NavLink>
              </li>
              <li>
                <Dropdown
                  className="dropdown--navigation"
                  overlay={phukien}
                  placement="bottomCenter"
                  arrow
                >
                  <Button>
                    <NavLink
                      exact
                      className="link__navigation--mid"
                      to="/feature/phukien"
                      activeClassName="selected"
                    >
                      <span className="spacing__navi">PHỤ KIỆN</span>
                      <FontAwesomeIcon icon={faCaretDown} />
                    </NavLink>
                  </Button>
                </Dropdown>
              </li>
            </ul>
          </Col>
          <Col xxl={4} xl={4} lg={3} md={3}>
            <ul className="navigation__bottom--right">
              <li className="link__right" onClick={handleClickSearch}>
                <span className="spacing__navi display-none">Tìm Kiếm</span>
                <FontAwesomeIcon
                  className="icon__navigation margin-left"
                  icon={faSearch}
                />
              </li>
              <li>
                <NavLink
                  className="link__right"
                  to="/feature/connectwithus"
                  activeClassName=""
                >
                  <span className="spacing__navi display-none">Liên hệ</span>
                  <FontAwesomeIcon
                    className="icon__navigation"
                    icon={faEnvelope}
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__right-icon"
                  to="/feature/userpage"
                  activeClassName=""
                >
                  <FontAwesomeIcon
                    className="icon__navigation"
                    icon={faUserTie}
                  />
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link__right-icon"
                  to="/feature/userpage"
                  activeClassName=""
                >
                  <FontAwesomeIcon
                    className="icon__navigation"
                    icon={faShoppingCart}
                  />
                </NavLink>
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Navigation;
