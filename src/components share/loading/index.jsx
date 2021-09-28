import { Col } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import loadingImage from "../../assets/images/suspen.png";
import "./loading.scss";

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
