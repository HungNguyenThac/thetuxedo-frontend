import React from "react";
import PropTypes from "prop-types";
import "./bannerVestCongSo.scss";
import banner from "../../../../assets/banner/banner5.png";

BannerVestCongSo.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerVestCongSo.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerVestCongSo(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST VEST CÔNG SỞ CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerVestCongSo;
