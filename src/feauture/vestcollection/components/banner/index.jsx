import React from "react";
import PropTypes from "prop-types";
import "./bannerVestCollection.scss";
import banner from "../../../../assets/banner/banner5.png";

BannerVestCollectiion.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerVestCollectiion.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerVestCollectiion(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST VEST MỚI NHẤT";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerVestCollectiion;
