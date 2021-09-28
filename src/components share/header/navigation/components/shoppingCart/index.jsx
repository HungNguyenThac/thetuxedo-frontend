import React, { useEffect, useState } from "react";
import "./shoppingCart.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToDetail } from "../../../../../actions/itemDetail";
import { useHistory } from "react-router";
import { themDauChamVaoGiaTien } from "../../../../../shareFunction/numberToString";
import { useSelector } from "react-redux";
import userApi from "../../../../../api/userApi";
import { hideLoading, showLoading } from "../../../../../actions/loading";

CartPopup.propTypes = {
  listItems: PropTypes.array,
};
CartPopup.defaultProps = {
  listItems: null,
};

function CartPopup(props) {
  const { listItems } = props;
  const cartForUser = useSelector((state) => state.itemCart.itemCart);
  const [boolean, setBoolean] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  function handleClickSendItemToDetailPage(item) {
    const action = addItemToDetail(item);
    dispatch(action);
    history.push(`/${item.phanLoai}/detail/${item.id}`);
    window.scrollTo(0, 186);
  }
  const handleClickToScrollBackToCart = () => {
    window.scrollTo(0, 186);
    setBoolean((x) => !x);
  };
  const handleClickToSendrequest = () => {
    setBoolean((x) => !x);
  };

  useEffect(() => {
    showLoading();
    let sendRequestUpdateCart = async () => {
      try {
        let response = await userApi.putAddNewCart(cartForUser);
        if (response.status === 200) {
          hideLoading();
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    sendRequestUpdateCart();
  }, [boolean]);

  return listItems.length !== 0 ? (
    <div className="cart-popup">
      <header className="cart-popup_header">
        <span className="cart-popup_header_title">Sản phẩm đã chọn</span>
      </header>
      <body className="cart-popup_body">
        <ul className="list-item">
          {listItems.map((item) => {
            // tạo dấu . trong tổng giá tiền
            let tongGia = "";
            if (item.gia !== undefined) {
              tongGia = themDauChamVaoGiaTien(item.gia * item.soLuong);
            }

            //tạo . trong tông giá tiền đã giảm
            let tongGiamGiaString = "";
            if (item.giamGia !== undefined) {
              tongGiamGiaString = themDauChamVaoGiaTien(
                item.giamGia * item.soLuong
              );
            }
            return (
              <li
                className="item-selected"
                onClick={() => handleClickSendItemToDetailPage(item)}
              >
                <Link className="item-selected_link">
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
                            {tongGiamGiaString}
                            <span className="price-detail-page">đ</span>
                          </span>
                          <div>
                            <span className="item-detail-page_price-real_sale">
                              {tongGia}
                              <span className="price-sale">đ</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="item-detail_price-real">
                          {tongGia}
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
        <Link
          to="/cartPage"
          className="cart-popup_footer-link-left"
          onClick={handleClickToScrollBackToCart}
        >
          <span className="cart-popup_footer-right_title">Xem Giỏ Hàng</span>
        </Link>

        <Link
          to="/payPage"
          className="cart-popup_footer-link-right"
          onClick={handleClickToSendrequest}
        >
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
