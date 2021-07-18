import React from "react";
import PropTypes from "prop-types";
import "./bannerThatLung.scss";
import banner from "../../../../../assets/banner/banner5.png";

BannerThatLung.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerThatLung.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerThatLung(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST THẮT LƯNG CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerThatLung;
