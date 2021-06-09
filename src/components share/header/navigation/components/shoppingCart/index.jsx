import React from "react";
import PropTypes from "prop-types";
import "./shoppingCart.scss";
import { Link } from "react-router-dom";

CartPopup.propTypes = {
  items: PropTypes.string,
};

CartPopup.defaultProps = {
  items: [],
};

function CartPopup(props) {
  // const { item } = props;
  const { imgItem, nameItem, priceItem } = props;

  // const imgItem = true;
  // const nameItem =
  //   "Quần âu cao cấp nhập khẩu chính hãng US cao cấp số 1 việt nam hàng chính hãng cao cấp, mua ngay kẻo lỡ";
  // const priceItem = "750.000";

  return imgItem && nameItem && priceItem ? (
    <div className="cart-popup">
      <header className="cart-popup_header">
        <span className="cart-popup_header_title">Sản phẩm đã chọn</span>
      </header>
      <body className="cart-popup_body">
        <ul className="list-item">
          <li className="item-selected">
            <Link className="item-selected_link" to="/">
              <div className="item-selected_left">
                <img className="item-selected_left_img" src={imgItem} alt="" />
              </div>
              <div className="item-selected_right">
                <span className="item-selected_right_name first after">
                  {nameItem}
                </span>
                <span className="item-selected_right_price">
                  {priceItem} vnđ
                </span>
              </div>
            </Link>
          </li>
          <li className="item-selected">
            <Link className="item-selected_link" to="/">
              <div className="item-selected_left">
                <img className="item-selected_left_img" src={imgItem} alt="" />
              </div>
              <div className="item-selected_right">
                <span className="item-selected_right_name">{nameItem}</span>
                <span className="item-selected_right_price">
                  {priceItem} vnđ
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </body>
    </div>
  ) : (
    <Link className="cart-popup_no_item_link" to="/">
      <div className="cart-popup_no_item">
        <div className="No-item-selected"></div>
        <span>Chưa có sản phẩm nào được chọn</span>
      </div>
    </Link>
  );
}

export default CartPopup;
