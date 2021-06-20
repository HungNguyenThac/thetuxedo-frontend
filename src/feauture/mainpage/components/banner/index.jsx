import React from "react";
import PropTypes from "prop-types";
import "./banner.scss";
import { Carousel } from "antd";
import banner1 from "../../../../assets/banner/banner8.png";
import banner2 from "../../../../assets/banner/banner9.png";
import banner3 from "../../../../assets/banner/banner10.png";

BannerMainPage.propTypes = {
  bannerURL: PropTypes.string,
  title: PropTypes.string,
};

BannerMainPage.defaultProps = {
  bannerURL: "",
  title: "",
};

function BannerMainPage(props) {
  const { bannerURL, title } = props;

  const bannerStyle = bannerURL ? { backgroundImage: `url(${bannerURL})` } : {};

  return (
    <div className="carousel">
      <Carousel autoplay>
        <img src={banner1} alt="" />
        <img src={banner2} alt="" />
        <img src={banner3} alt="" />
      </Carousel>
    </div>
  );
}

export default BannerMainPage;
