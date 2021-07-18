import React from "react";
import PropTypes from "prop-types";
import { Col } from "antd";
import loadingImage from "../../assets/images/suspen.png";
import "./loading.scss";
import { useSelector } from "react-redux";

LoadingMain.propTypes = {};

function LoadingMain(props) {
  const loading = useSelector((state) => state.loading.loading);
  return loading ? (
    <div className="block-loading">
      <Col
        xxl={{ span: 4, offset: 10 }}
        xl={{ span: 4, offset: 10 }}
        lg={{ span: 4, offset: 10 }}
        md={{ span: 4, offset: 10 }}
        sm={{ span: 4, offset: 10 }}
        xs={{ span: 4, offset: 10 }}
      >
        <img className="loading-image" src={loadingImage} alt="" />
      </Col>
    </div>
  ) : null;
}

export default LoadingMain;
