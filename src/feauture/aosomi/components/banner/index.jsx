import React from "react";
import PropTypes from "prop-types";
import "./bannerAoSoMi.scss";

BannerAoSoMi.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerAoSoMi.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerAoSoMi(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "BST ÁO SƠ MI CAO CẤP";
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

export default BannerAoSoMi;
