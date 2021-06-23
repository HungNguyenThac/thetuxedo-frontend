import React from "react";
import PropTypes from "prop-types";
import "./bannerVestDaHoi.scss";
import banner from "../../../../assets/banner/banner5.png";

BannerVestDaHoi.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerVestDaHoi.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerVestDaHoi(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST VEST DẠ HỘI CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerVestDaHoi;
