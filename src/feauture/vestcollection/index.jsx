import React from "react";
import PropTypes from "prop-types";
import "./vestcollection.scss";
import VestCuoi from "./vescuoi";
import VestCongSo from "./vestcongso";
import VestDaHoi from "./vestdahoi";

Vest.propTypes = {};

function Vest(props) {
  return (
    <div>
      <VestCuoi />
      <VestCongSo />
      <VestDaHoi />
    </div>
  );
}

export default Vest;
