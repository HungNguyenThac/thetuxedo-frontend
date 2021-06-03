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
    <Carousel autoplay>
      <section className="banner4" style={bannerStyle}>
        <h1 className="banner__title">{title}</h1>
      </section>
      <section className="banner3" style={bannerStyle}>
        <h1 className="banner__title">{title}</h1>
      </section>
    </Carousel>
  );
}

export default Banner;
