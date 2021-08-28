import { Col, Row } from "antd";
import React from "react";
import logo from "../../assets/logo/logo1.png";
import "./notFound.scss";
import ButtonShare from "../Button/index";
import { Link } from "react-router-dom";
NotFound.propTypes = {};

function NotFound(props) {
  return (
    <body className="body__not__found">
      <div className="grid__not__found">
        <div>
          <Row>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <div className="not__found-left">
                <img className="not__found-left_img" src={logo} alt="" />
              </div>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <div className="not__found-right">
                <h1 className="notFound__title"> Lỗi 404</h1>
                <h3 className="notFound__sub">XIN LỖI TRANG KHÔNG TỒN TẠI</h3>
                <Link exact to="/">
                  <ButtonShare
                    title="QUAY LẠI TRANG CHỦ"
                    backgroundColor="rgb(206, 25, 25)"
                  />
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </body>
  );
}

export default NotFound;
