import React from "react";
import PropTypes from "prop-types";
import "./renderCart.scss";
import { Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

RenderCartPage.propTypes = {
  itemDetails: PropTypes.object,
};

RenderCartPage.defaultProps = {
  itemDetails: {},
};

function RenderCartPage(props) {
  const { itemDetails } = props;

  return (
    <body className="Body-cart">
      <div className="grid">
        <div className="body_cart-top">
          <p className="body_cart-top_title">GIỎ HÀNG</p>
        </div>
        <hr className="hr-title-page" />
        <div className="danhmuc-tieude">
          <Col className="danhmuc-tieude-title" xxl={{ span: 8, offset: 4 }}>
            <span>Thông tin chi tiết sản phẩm</span>
          </Col>
          <Col className="danhmuc-tieude-title" xxl={{ span: 3 }}>
            <span>Size</span>
          </Col>
          <Col className="danhmuc-tieude-title" xxl={{ span: 3 }}>
            <span>Đơn giá</span>
          </Col>
          <Col className="danhmuc-tieude-title" xxl={{ span: 3 }}>
            <span>Số lượng</span>
          </Col>
          <Col className="danhmuc-tieude-title" xxl={{ span: 3 }}>
            <span>Tổng giá</span>
          </Col>
        </div>
        <hr className="hr-title-page" />
        <ul className="ul-parent_cart-page">
          {itemDetails.map((item, index) => {
            console.log(47, item, index);
            // tạo dấu . trong giá tiền
            let Gia = "";
            if (item.gia !== undefined) {
              const stringGia = item.gia.toString();
              const arrayGia = [];
              for (let i = 0; i < stringGia.length / 3; i++) {
                if (stringGia.length - 3 * (i + 1) > 0) {
                  arrayGia.push(
                    stringGia.slice(
                      stringGia.length - 3 * (i + 1),
                      stringGia.length - 3 * i
                    )
                  );
                } else {
                  arrayGia.push(stringGia.slice(0, stringGia.length - 3 * i));
                }
              }
              Gia = arrayGia.reverse().join(".");
            }

            function cong() {
              item.soLuong = item.soLuong += 1;
            }
            // tạo dấu . trong tổng giá tiền
            let tongGia = "";
            if (item.gia !== undefined) {
              const stringGia = (item.gia * item.soLuong).toString();
              const arrayGia = [];
              for (let i = 0; i < stringGia.length / 3; i++) {
                if (stringGia.length - 3 * (i + 1) > 0) {
                  arrayGia.push(
                    stringGia.slice(
                      stringGia.length - 3 * (i + 1),
                      stringGia.length - 3 * i
                    )
                  );
                } else {
                  arrayGia.push(stringGia.slice(0, stringGia.length - 3 * i));
                }
              }
              tongGia = arrayGia.reverse().join(".");
            }

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia !== undefined) {
              const stringGiamGia = item.giamGia.toString();
              const arrayGiamGia = [];
              for (let i = 0; i < stringGiamGia.length / 3; i++) {
                if (stringGiamGia.length - 3 * (i + 1) > 0) {
                  arrayGiamGia.push(
                    stringGiamGia.slice(
                      stringGiamGia.length - 3 * (i + 1),
                      stringGiamGia.length - 3 * i
                    )
                  );
                } else {
                  arrayGiamGia.push(
                    stringGiamGia.slice(0, stringGiamGia.length - 3 * i)
                  );
                }
              }
              giamGiaString = arrayGiamGia.reverse().join(".");
            }

            //tạo . trong tông giá tiền đã giảm
            let tongGiamGiaString = "";
            if (item.giamGia !== undefined) {
              const stringGiamGia = (item.giamGia * item.soLuong).toString();
              const arrayGiamGia = [];
              for (let i = 0; i < stringGiamGia.length / 3; i++) {
                if (stringGiamGia.length - 3 * (i + 1) > 0) {
                  arrayGiamGia.push(
                    stringGiamGia.slice(
                      stringGiamGia.length - 3 * (i + 1),
                      stringGiamGia.length - 3 * i
                    )
                  );
                } else {
                  arrayGiamGia.push(
                    stringGiamGia.slice(0, stringGiamGia.length - 3 * i)
                  );
                }
              }
              tongGiamGiaString = arrayGiamGia.reverse().join(".");
            }
            //thêm dấu . vào phần sub giảm giá
            let numberSale = "";
            if (item.gia && item.giamGia !== undefined) {
              const numberSale1 = item.gia - item.giamGia;
              const stringGiamGia1 = numberSale1.toString();
              const arrayGiamGia1 = [];
              for (let i = 0; i < stringGiamGia1.length / 3; i++) {
                if (stringGiamGia1.length - 3 * (i + 1) > 0) {
                  arrayGiamGia1.push(
                    stringGiamGia1.slice(
                      stringGiamGia1.length - 3 * (i + 1),
                      stringGiamGia1.length - 3 * i
                    )
                  );
                } else {
                  arrayGiamGia1.push(
                    stringGiamGia1.slice(0, stringGiamGia1.length - 3 * i)
                  );
                }
              }
              numberSale = arrayGiamGia1.reverse().join(".");
            }

            function handleClickNumberChange(number) {
              console.log(number);
            }

            return (
              <div>
                <li className="thongtin-sanpham_trongcart" key={item.id}>
                  <Col className="div-tung-muc-parent" xxl={4}>
                    <div className="div-tung-muc-children">
                      <img
                        className="div-tung-muc-img_img"
                        src={item.anhBia}
                        alt="anhbia"
                      />
                    </div>
                  </Col>
                  <Col xxl={8}>
                    <div className="div-tung-muc">
                      <span className="content-of-product">{item.tenSP}</span>
                    </div>
                    <div className="div-tung-muc">
                      {item.giamGia ? (
                        <span className="sub-text_sale">
                          (Bạn đã tiết kiệm được {numberSale}
                          <span className="price">đ</span> trên mỗi sản phẩm)
                        </span>
                      ) : (
                        <p className="sub-text_sale">
                          (Sản phẩm mới ra mắt, chưa áp dụng chính sách giảm
                          giá)
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col xxl={3}>
                    <div className="div-tung-muc">
                      <span className="content-of-product">{item.size}</span>
                    </div>
                  </Col>
                  <Col xxl={3}>
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
                  <Col xxl={3}>
                    <div className="div-tung-muc">
                      <button
                        disabled={item.soLuong <= 1}
                        className="button-item-change"
                        onClick={() => {
                          handleClickNumberChange(item.soLuong - 1);
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="number_so-luong">{item.soLuong}</span>
                      <button
                        className="button-item-change"
                        onClick={() => {
                          handleClickNumberChange(item.soLuong + 1);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </Col>
                  <Col xxl={3}>
                    <div className="div-tung-muc">
                      {item.giamGia ? (
                        <span className="content-of-product">
                          {tongGiamGiaString}
                          <span className="price">đ</span>
                        </span>
                      ) : (
                        <span className="content-of-product">
                          {tongGia}
                          <span className="price">đ</span>
                        </span>
                      )}
                      <span></span>
                    </div>
                  </Col>
                </li>
                <hr className="hr-title-page" />
              </div>
            );
          })}
        </ul>
        <hr className="hr-title-page" />
      </div>
    </body>
  );
}

export default RenderCartPage;
