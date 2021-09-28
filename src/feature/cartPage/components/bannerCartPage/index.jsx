import React from "react";
import PropTypes from "prop-types";
import banner from "../../../../assets/banner/banner6.jpeg";

BannerCartPage.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerCartPage.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerCartPage(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "GIỎ HÀNG CỦA BẠN";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title1">{title}</h1>
    </div>
  );
}

export default BannerCartPage;
