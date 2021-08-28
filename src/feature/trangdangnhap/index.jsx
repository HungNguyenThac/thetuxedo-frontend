import React from "react";
import BannerDangNhap from "./components/banner";
import RenderFormDangNhap from "./components/renderFromDangNhap";

TrangDangNhap.propTypes = {};

function TrangDangNhap() {
  return (
    <div className="container">
      <BannerDangNhap />
      <RenderFormDangNhap />
    </div>
  );
}

export default TrangDangNhap;
