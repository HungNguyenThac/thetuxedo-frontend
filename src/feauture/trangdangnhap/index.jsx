import React from "react";
import "./dangNhap.scss";
import RenderFormDangNhap from "./components/renderFromDangNhap";
import BannerDangNhap from "./components/banner";

TrangDangNhap.propTypes = {};

function TrangDangNhap(props) {
  return (
    <div className="container">
      <BannerDangNhap />
      <RenderFormDangNhap />
    </div>
  );
}

export default TrangDangNhap;
