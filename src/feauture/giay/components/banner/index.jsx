import React from "react";
import PropTypes from "prop-types";
import "./bannerGiayTay.scss";

BannerGiayTay.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerGiayTay.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerGiayTay(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST GIÀY TÂY CAO CẤP";
  const background = backgroundBannerURL
    ? backgroundBannerURL
    : "http://thetuxedo.vn/wp-content/uploads/2018/01/TIM-CUA-HANG.png";

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerGiayTay;
