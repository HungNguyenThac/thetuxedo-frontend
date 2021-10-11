import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import banner from "../../../assets/banner/banner5.png";

RenderBanner.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

RenderBanner.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function RenderBanner(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST GIÀY TÂY CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default RenderBanner;
