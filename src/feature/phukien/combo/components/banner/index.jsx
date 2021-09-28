import React from "react";
import PropTypes from "prop-types";
import "./bannerComboPhuKien.scss";
import banner from "../../../../../assets/banner/banner5.png";

BannerComboPhukien.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerComboPhukien.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerComboPhukien(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST COMBO PHỤ KIỆN CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerComboPhukien;
