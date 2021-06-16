import React from "react";
import PropTypes from "prop-types";
import "./mainpage.scss";
import MainpageAo from "./components/mainpage-ao";
import BannerMainPage from "./components/banner";

MainPage.propTypes = {};
function MainPage(props) {
  return (
    <div>
      <BannerMainPage />
      <MainpageAo />
    </div>
  );
}

export default MainPage;
