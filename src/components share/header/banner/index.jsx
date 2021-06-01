import React from "react";
import PropTypes from "prop-types";
import "./banner.scss";

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
    <section className="banner" style={bannerStyle}>
      <h1 className="banner__title">{title}</h1>
    </section>
  );
}

export default Banner;
