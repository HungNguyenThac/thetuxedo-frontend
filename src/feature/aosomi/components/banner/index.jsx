import React from "react";
import PropTypes from "prop-types";
import banner from "../../../../assets/banner/banner5.png";

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
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerAoSoMi;
