import React from "react";
import PropTypes from "prop-types";
import "./bannerQuanAu.scss";

BannerQuanAu.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerQuanAu.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerQuanAu(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST QUẦN ÂU CAO CẤP";
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

export default BannerQuanAu;
