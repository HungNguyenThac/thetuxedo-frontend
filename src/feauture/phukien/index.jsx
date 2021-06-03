import React from "react";
import PropTypes from "prop-types";
import "./phukien.scss";
import CaVat from "./cavat";
import KhanCaiAo from "./khancaiao";
import MangSetTay from "./mangsettay";
import NoCaiCo from "./nocaico";
import ThatLung from "./thatlung";

PhuKien.propTypes = {};

function PhuKien(props) {
  return (
    <div>
      <CaVat />
      <KhanCaiAo />
      <MangSetTay />
      <NoCaiCo />
      <ThatLung />
    </div>
  );
}

export default PhuKien;
