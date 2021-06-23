import React from "react";
import PropTypes from "prop-types";
import "./bannerVestCuoi.scss";
import banner from "../../../../assets/banner/banner5.png";

BannerVestCuoi.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerVestCuoi.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerVestCuoi(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST VEST CƯỚI CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerVestCuoi;
