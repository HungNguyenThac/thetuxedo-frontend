import React from "react";
import PropTypes from "prop-types";
import "./bannerQuanAu.scss";
import banner from "../../../../assets/banner/banner5.png";

BannerQuanAu.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerQuanAu.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerQuanAu(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST QUẦN ÂU CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerQuanAu;
