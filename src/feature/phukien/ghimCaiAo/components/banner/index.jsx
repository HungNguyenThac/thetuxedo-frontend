import React from "react";
import PropTypes from "prop-types";
import "./bannerGhimCaiAo.scss";
import banner from "../../../../../assets/banner/banner5.png";

BannerGhimCaiAo.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerGhimCaiAo.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerGhimCaiAo(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST GHIM CÀI ÁO KIM LOẠI";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerGhimCaiAo;
