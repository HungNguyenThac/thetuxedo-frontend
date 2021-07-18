import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./cartPage.scss";
import { useSelector } from "react-redux";
import BannerCartPage from "./components/bannerCartPage";
import RenderCartPage from "./components/renderCart";

CartPage.propTypes = {
  items: PropTypes.array,
};

CartPage.defaultProps = {
  items: [],
};

function CartPage(props) {
  const items = useSelector((state) => state.itemCart.itemCart);

  return (
    <div>
      <BannerCartPage />
      <RenderCartPage itemDetails={items} />
    </div>
  );
}

export default CartPage;
