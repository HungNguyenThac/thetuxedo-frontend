import React from "react";
import PropTypes from "prop-types";
import "./bannerSale.scss";
import banner from "../../../../assets/banner/banner5.png";

BannerSale.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerSale.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerSale(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "DANH SÁCH SẢN PHẨM ƯU ĐÃI GIÁ";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerSale;
