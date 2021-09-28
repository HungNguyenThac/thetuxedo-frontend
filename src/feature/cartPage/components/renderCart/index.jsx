import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  changeQuantityItemInCart,
  DeleteItemInCart,
} from "../../../../actions/itemCart";
import userApi from "../../../../api/userApi";
import ButtonShare from "../../../../components share/Button";
import { themDauChamVaoGiaTien } from "../../../../shareFunction/numberToString";

RenderCartPage.propTypes = {
  itemDetails: PropTypes.object,
};

RenderCartPage.defaultProps = {
  itemDetails: {},
};

function sumPriceOfTotalItems(list) {
  let listLength = list.length;
  var total = 0;
  for (let i = 0; i < listLength; i++) {
    total += list[i].giamGia
      ? list[i].giamGia * list[i].soLuong
      : list[i].gia * list[i].soLuong;
  }
  return total;
}

function RenderCartPage(props) {
  const disPatch = useDispatch();
  const history = useHistory();
  const { itemDetails } = props;
  const cartForUser = useSelector((state) => state.itemCart.itemCart);
  const totalPrice = sumPriceOfTotalItems(itemDetails);
  const totalPriceString = themDauChamVaoGiaTien(totalPrice);

  function handleClickToDeleteItem(index) {
    const itemDelete = DeleteItemInCart(index);
    disPatch(itemDelete);
  }

  function handleClickNextToPayPage() {
    if (itemDetails.length === 0) {
      let notification = document.querySelector(".notificatrion-In-CartPage");
      notification.classList.add("active");
    } else {
      history.push("/payPage");
    }
  }

  useEffect(() => {
    let sendRequestUpdateCart = async () => {
      try {
        let response = await userApi.putAddNewCart(cartForUser);
        if (response.status === 200) {
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    sendRequestUpdateCart();
  }, [cartForUser]);

  return (
    <body className="Body-cart">
      <div className="grid">
        <div className="body_cart-top">
          <p className="body_cart-top_title">GIỎ HÀNG</p>
        </div>
        <hr className="hr-title-page" />
        <div className="danhmuc-tieude">
          <Col
            className="danhmuc-tieude-title"
            xxl={{ span: 8, offset: 4 }}
            xl={{ span: 8, offset: 4 }}
            lg={{ span: 8, offset: 4 }}
            md={{ span: 9, offset: 2 }}
            sm={{ span: 10, offset: 2 }}
          >
            <span>Thông tin chi tiết sản phẩm</span>
          </Col>
          <Col
            className="danhmuc-tieude-title"
            xxl={3}
            xl={3}
            lg={3}
            md={3}
            sm={2}
          >
            <span>Size</span>
          </Col>
          <Col
            className="danhmuc-tieude-title"
            xxl={3}
            xl={3}
            lg={3}
            md={3}
            sm={3}
          >
            <span>Đơn giá</span>
          </Col>
          <Col
            className="danhmuc-tieude-title"
            xxl={3}
            xl={3}
            lg={3}
            md={3}
            sm={3}
          >
            <span>Số lượng</span>
          </Col>
          <Col
            className="danhmuc-tieude-title"
            xxl={3}
            xl={3}
            lg={3}
            md={4}
            sm={4}
          >
            <span>Tổng giá</span>
          </Col>
        </div>
        <div className="danhmuc-tieude-576">
          <span className="danhmuc-tieude-title">
            Thông tin chi tiết sản phẩm
          </span>
        </div>
        <hr className="hr-title-page" />
        <ul className="ul-parent_cart-page">
          {itemDetails.map((item, index) => {
            // tạo dấu . trong giá tiền
            let Gia = "";
            if (item.gia !== undefined) {
              Gia = themDauChamVaoGiaTien(item.gia);
            }

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

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia !== undefined) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //thêm dấu . vào phần sub giảm giá
            let numberSale = "";
            if (item.gia && item.giamGia !== undefined) {
              const numberSale1 = item.gia - item.giamGia;
              numberSale = themDauChamVaoGiaTien(numberSale1);
            }

            function handleClickNumberChange(number) {
              let items = itemDetails.slice();
              console.log(items);
              items[number[1]].soLuong = number[0];
              const listItemsChange = changeQuantityItemInCart(items);
              disPatch(listItemsChange);
            }

            return (
              <div>
                <div className="lonHon-576px">
                  <li className="thongtin-sanpham_trongcart" key={item.id}>
                    <Col
                      className="div-tung-muc-parent"
                      xxl={4}
                      xl={4}
                      lg={4}
                      md={2}
                      sm={2}
                    >
                      <div className="div-tung-muc-children">
                        <img
                          className="div-tung-muc-img_img"
                          src={item.anhBia}
                          alt="anhbia"
                        />
                      </div>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={9} sm={10}>
                      <div className="div-tung-muc">
                        <span className="content-of-product1">
                          {item.tenSP}
                        </span>
                      </div>
                      <div className="div-tung-muc">
                        {item.giamGia ? (
                          <span className="sub-text_sale1">
                            (Bạn đã tiết kiệm được {numberSale}
                            <span className="price">đ</span> trên mỗi SP)
                          </span>
                        ) : (
                          <p className="sub-text_sale1">
                            (Sản phẩm mới ra mắt, chưa áp dụng chính sách giảm
                            giá)
                          </p>
                        )}
                      </div>
                    </Col>
                    <Col xxl={3} xl={3} lg={3} md={3} sm={2}>
                      <div className="div-tung-muc">
                        <span className="content-of-product1">{item.size}</span>
                      </div>
                    </Col>
                    <Col xxl={3} xl={3} lg={3} md={3} sm={3}>
                      <div className="div-tung-muc">
                        <span>
                          {item.giamGia ? (
                            <div className="item-detail_price">
                              <span className="item-detail_price-sale">
                                {giamGiaString}
                                <span className="price">đ</span>
                              </span>
                              <div>
                                <span className="item-detail_price-real_sale">
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
                        </span>
                      </div>
                    </Col>
                    <Col xxl={3} xl={3} lg={3} md={3} sm={3}>
                      <div className="div-tung-muc">
                        <button
                          disabled={item.soLuong <= 1}
                          className="button-item-change1"
                          onClick={() => {
                            handleClickNumberChange([item.soLuong - 1, index]);
                          }}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="number_so-luong1">{item.soLuong}</span>
                        <button
                          className="button-item-change1"
                          onClick={() => {
                            handleClickNumberChange([item.soLuong + 1, index]);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </Col>
                    <Col xxl={3} xl={3} lg={3} md={4} sm={4}>
                      <div className="div-tung-muc">
                        {item.giamGia ? (
                          <div className="price-delete_item">
                            <span className="content-of-product1 fontsize-1rem">
                              {tongGiamGiaString}
                              <span className="price">đ</span>
                            </span>
                            <button
                              onClick={() => handleClickToDeleteItem(index)}
                              className="click-to-remove-item"
                            >
                              Xoá SP
                            </button>
                          </div>
                        ) : (
                          <div className="price-delete_item">
                            <span className="content-of-product1 fontsize-1rem">
                              {tongGia}
                              <span className="price">đ</span>
                            </span>
                            <button
                              className="click-to-remove-item"
                              onClick={() => handleClickToDeleteItem(index)}
                            >
                              Xoá SP
                            </button>
                          </div>
                        )}
                      </div>
                    </Col>
                  </li>
                  <hr className="hr-title-page" />
                </div>
                {/* nhỏ hơn 576px */}
                <div className="nhoHon-576px">
                  <li className="li-nhoHon-576px" key={item.id}>
                    <Col xs={8}>
                      {/* chưa xong */}
                      <div className="div-tung-muc-parent-576">
                        <div className="div-tung-muc-children">
                          <img
                            className="div-tung-muc-img_img"
                            src={item.anhBia}
                            alt="anhbia"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xs={16}>
                      <div className="div-detail-item-right">
                        <Col xs={24}>
                          <div>
                            <span className="content-of-product1">
                              {item.tenSP}
                            </span>
                          </div>
                        </Col>
                        <div className="div-tung-muc">
                          <span>
                            {item.giamGia ? (
                              <div className="item-detail_price">
                                <span className="item-detail_price-sale">
                                  Giá: {giamGiaString}
                                  <span className="price">đ</span>
                                </span>
                                <div>
                                  <span className="item-detail_price-real_sale">
                                    {Gia}
                                    <span className="price-sale">đ</span>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <p className="item-detail_price-real">
                                Giá :{Gia}
                                <span className="price">đ</span>
                              </p>
                            )}
                          </span>
                        </div>
                        <div className="div-tung-muc">
                          {item.giamGia ? (
                            <span className="sub-text_sale1">
                              (Bạn đã tiết kiệm được {numberSale}
                              <span className="price">đ</span> trên mỗi SP)
                            </span>
                          ) : (
                            <p className="sub-text_sale1">
                              (Sản phẩm mới ra mắt, chưa áp dụng chính sách giảm
                              giá)
                            </p>
                          )}
                        </div>
                        <div className="div-tung-muc">
                          <span className="content-of-product1">
                            Size: {item.size}
                          </span>
                        </div>
                        <div className="div-tung-muc">
                          Số lượng:
                          <button
                            disabled={item.soLuong <= 1}
                            className="button-item-change1"
                            onClick={() => {
                              handleClickNumberChange([
                                item.soLuong - 1,
                                index,
                              ]);
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="number_so-luong1">
                            {item.soLuong}
                          </span>
                          <button
                            className="button-item-change1"
                            onClick={() => {
                              handleClickNumberChange([
                                item.soLuong + 1,
                                index,
                              ]);
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                        <div className="div-tung-muc">
                          {item.giamGia ? (
                            <div className="total-price_remove-item">
                              <span className="content-of-product1 fontsize-1rem">
                                Tổng: {tongGiamGiaString}
                                <span className="price">đ</span>
                              </span>
                              <button
                                className="click-to-remove-item"
                                onClick={() => handleClickToDeleteItem(index)}
                              >
                                Xoá SP
                              </button>
                            </div>
                          ) : (
                            <div className="total-price_remove-item">
                              <span className="content-of-product1 fontsize-1rem">
                                Tổng: {tongGia}
                                <span className="price">đ</span>
                              </span>
                              <button
                                className="click-to-remove-item"
                                onClick={() => handleClickToDeleteItem(index)}
                              >
                                Xoá SP
                              </button>
                            </div>
                          )}
                          <span></span>
                        </div>
                      </div>
                    </Col>
                  </li>
                  <hr className="hr-title-page" />
                </div>
              </div>
            );
          })}
        </ul>
        <hr className="hr-title-page" />
        <footer className="footer-cartPage">
          <div className="footer-cartPage_top">
            <span className="footer-cartPage_top-title">Tổng Tiền:</span>
            <span className="footer-cartPage_top-content">
              {totalPriceString}
              <span className="price">đ</span>
            </span>
          </div>
          <div className="footer-cartPage_bottom">
            <Link to="/vestcollection">
              <ButtonShare
                title="TIẾP TỤC MUA SẮM"
                subString="Thêm nhiều sản phẩm"
              />
            </Link>
            <ButtonShare
              title="TIẾN HÀNH THANH TOÁN"
              subString="Nhận nhiều ưu đãi"
              backgroundColor="#ce1919"
              handleClick={handleClickNextToPayPage}
            />
          </div>
          <div>
            <span className="notificatrion-In-CartPage">
              Giỏ hàng trống, vui lòng chọn sản phẩm trước khi Thanh toán
            </span>
          </div>
        </footer>
      </div>
    </body>
  );
}

export default RenderCartPage;
