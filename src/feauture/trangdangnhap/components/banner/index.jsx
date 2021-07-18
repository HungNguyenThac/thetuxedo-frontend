import React from "react";
import PropTypes from "prop-types";
import "./bannerDangNhap.scss";
import banner from "../../../../assets/banner/banner5.png";

BannerDanhNhap.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerDanhNhap.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerDanhNhap(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "TRANG ĐĂNG NHẬP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerDanhNhap;
