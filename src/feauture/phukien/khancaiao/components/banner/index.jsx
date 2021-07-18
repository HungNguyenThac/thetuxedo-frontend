import React from "react";
import PropTypes from "prop-types";
import "./bannerKhanCaiAo.scss";
import banner from "../../../../../assets/banner/banner5.png";

BannerKhanCaiAo.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerKhanCaiAo.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerKhanCaiAo(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST KHĂN CÀI ÁO CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerKhanCaiAo;
