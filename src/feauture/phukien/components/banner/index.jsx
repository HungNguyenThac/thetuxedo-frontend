import React from "react";
import PropTypes from "prop-types";
import "./bannerPhuKien.scss";
import banner from "../../../../assets/banner/banner5.png";

BannerPhuKien.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerPhuKien.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerPhuKien(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST PHỤ KIỆN MỚI NHẤT";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerPhuKien;
