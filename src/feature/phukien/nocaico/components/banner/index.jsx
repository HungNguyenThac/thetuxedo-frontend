import React from "react";
import PropTypes from "prop-types";
import "./bannerCaVat.scss";
import banner from "../../../../../assets/banner/banner5.png";

BannerCaVat.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerCaVat.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerCaVat(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST NƠ CÀI CỔ CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerCaVat;
