import React from "react";
import PropTypes from "prop-types";
import "./banner.scss";
import { Carousel } from "antd";

Banner.propTypes = {
  bannerURL: PropTypes.string,
  title: PropTypes.string,
};

Banner.defaultProps = {
  bannerURL: "",
  title: "",
};

function Banner(props) {
  const { bannerURL, title } = props;

  const bannerStyle = bannerURL ? { backgroundImage: `url(${bannerURL})` } : {};

  return (
    <div className="carousel">
      <Carousel autoplay>
        <img
          src="http://thetuxedo.vn/wp-content/uploads/2018/01/BANNER-03.png"
          alt=""
        />
        <img
          src="http://thetuxedo.vn/wp-content/uploads/2018/01/BANNER-WEB-TU2.png"
          alt=""
        />
      </Carousel>
    </div>
  );
}

export default Banner;
