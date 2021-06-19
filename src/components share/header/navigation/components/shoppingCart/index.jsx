import React from "react";
import PropTypes from "prop-types";
import "./shoppingCart.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToDetail } from "../../../../../actions/itemDetail";
import { themDauChamVaoGiaTien } from "../../../../../shareFunction/numberToString";
CartPopup.propTypes = {
  items: PropTypes.string,
};

CartPopup.defaultProps = {
  items: [],
};

function CartPopup(props) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemCart.itemCart);
  function handleClickSendItemToDetailPage(item) {
    const itemSelected = addItemToDetail(item);
    dispatch(itemSelected);
  }

  return items.length ? (
    <div className="cart-popup">
      <header className="cart-popup_header">
        <span className="cart-popup_header_title">Sản phẩm đã chọn</span>
      </header>
      <body className="cart-popup_body">
        <ul className="list-item">
          {items.map((item) => {
            // tạo dấu . trong giá tiền
            let Gia = "";
            if (item.gia !== undefined) {
              Gia = themDauChamVaoGiaTien(item.gia);
            }

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia !== undefined) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }
            return (
              <li
                key={item.id}
                className="item-selected"
                onClick={() => handleClickSendItemToDetailPage(item)}
              >
                <Link className="item-selected_link" to="/feature/detail">
                  <div className="item-selected_left">
                    <img
                      className="item-selected_left_img"
                      src={item.anhBia}
                      alt=""
                    />
                  </div>
                  <div className="item-selected_right">
                    <span className="item-selected_right_name first after">
                      {item.tenSP}
                    </span>
                    <div className="item-selected_right_bottom">
                      <span className="item-selected_right_bottom-left">
                        Số lượng:
                        <span className="number_item_in_cart">
                          {item.soLuong}
                        </span>
                      </span>
                      <span className="item-selected_right_bottom-mid">
                        Size:
                        <span className="number_item_in_cart">{item.size}</span>
                      </span>
                      {item.giamGia ? (
                        <div className="item-detail-page_price">
                          <span className="item-detail-page_price-sale">
                            {giamGiaString}
                            <span className="price-detail-page">đ</span>
                          </span>
                          <div>
                            <span className="item-detail-page_price-real_sale">
                              {Gia}
                              <span className="price-sale">đ</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="item-detail_price-real">
                          {Gia}
                          <span className="price">đ</span>
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </body>
      <footer className="cart-popup_footer">
        <Link to="/feature/cartPage" className="cart-popup_footer-link-left">
          <span className="cart-popup_footer-right_title">Xem Giỏ Hàng</span>
        </Link>
        <Link to="/feature/payPage" className="cart-popup_footer-link-right">
          <span className="cart-popup_footer-right_title">
            Tiến Hành Thanh Toán
          </span>
        </Link>
      </footer>
    </div>
  ) : (
    <Link className="cart-popup_no_item_link">
      <div className="cart-popup_no_item">
        <div className="No-item-selected"></div>
        <span>Chưa có sản phẩm nào được chọn</span>
      </div>
    </Link>
  );
}

export default CartPopup;
