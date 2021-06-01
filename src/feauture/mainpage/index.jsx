import React from "react";
import PropTypes from "prop-types";
import "./mainpage.scss";
import MainpageAo from "./components/mainpage-ao";

MainPage.propTypes = {};
function MainPage(props) {
  return (
    <div>
      <MainpageAo />
    </div>
  );
}

export default MainPage;
