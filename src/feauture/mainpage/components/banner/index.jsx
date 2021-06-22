import React from "react";
import "./banner.scss";
import Slider from "react-slick";
import banner1 from "../../../../assets/banner/banner8.png";
import banner2 from "../../../../assets/banner/banner9.png";
import banner3 from "../../../../assets/banner/banner10.png";

BannerMainPage.defaultProps = {};
function BannerMainPage(props) {
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    lazyLoad: true,
  };
  return (
    <div className="banner-parent">
      <Slider {...settings}>
        <img className="banner-img" src={banner1} alt="" />

        <img className="banner-img" src={banner2} alt="" />

        <img className="banner-img" src={banner3} alt="" />
      </Slider>
    </div>
  );
}

export default BannerMainPage;
