import React from "react";
import PropTypes from "prop-types";
import RenderThanhToan from "./components/renderThanhToan";
import { useSelector } from "react-redux";

PayPage.propTypes = {};

function PayPage(props) {
  const listItems = useSelector((state) => state.itemCart.itemCart);
  return (
    <div className="div-payPage">
      <RenderThanhToan listItems={listItems} />
    </div>
  );
}

export default PayPage;
