import React from "react";
import PropTypes from "prop-types";
import "./bannerDetail.scss";
import banner from "../../../../assets/banner/banner7.png";

BannerDetail.propTypes = {
  backgroundBannerURL: PropTypes.string,
  itemDetail: PropTypes.object,
};

BannerDetail.defaultProps = {
  backgroundBannerURL: "",
  itemDetail: {},
};

function BannerDetail(props) {
  const { backgroundBannerURL, itemDetail } = props;
  const { tenSP } = itemDetail;

  const title = tenSP ? tenSP : "BST ÁO SƠ MI CAO CẤP";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title">{title}</h1>
    </div>
  );
}

export default BannerDetail;
