import React from "react";
import PropTypes from "prop-types";
import "./bannerNoCaiCo.scss";
import banner from "../../../../../assets/banner/banner5.png";

BannerCaiCo.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerCaiCo.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerCaiCo(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST NƠ CÀI CỔ ĐỦ MÀU SẮC";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerCaiCo;
