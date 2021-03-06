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
          <p className="body_cart-top_title">GI??? H??NG</p>
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
            <span>Th??ng tin chi ti???t s???n ph???m</span>
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
            <span>????n gi??</span>
          </Col>
          <Col
            className="danhmuc-tieude-title"
            xxl={3}
            xl={3}
            lg={3}
            md={3}
            sm={3}
          >
            <span>S??? l?????ng</span>
          </Col>
          <Col
            className="danhmuc-tieude-title"
            xxl={3}
            xl={3}
            lg={3}
            md={4}
            sm={4}
          >
            <span>T???ng gi??</span>
          </Col>
        </div>
        <div className="danhmuc-tieude-576">
          <span className="danhmuc-tieude-title">
            Th??ng tin chi ti???t s???n ph???m
          </span>
        </div>
        <hr className="hr-title-page" />
        <ul className="ul-parent_cart-page">
          {itemDetails.map((item, index) => {
            // t???o d???u . trong gi?? ti???n
            let Gia = "";
            if (item.gia !== undefined) {
              Gia = themDauChamVaoGiaTien(item.gia);
            }

            // t???o d???u . trong t???ng gi?? ti???n
            let tongGia = "";
            if (item.gia !== undefined) {
              tongGia = themDauChamVaoGiaTien(item.gia * item.soLuong);
            }

            //t???o . trong t??ng gi?? ti???n ???? gi???m
            let tongGiamGiaString = "";
            if (item.giamGia !== undefined) {
              tongGiamGiaString = themDauChamVaoGiaTien(
                item.giamGia * item.soLuong
              );
            }

            // t???o d???u . trong gi???m gi?? ti???n
            let giamGiaString = "";
            if (item.giamGia !== undefined) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //th??m d???u . v??o ph???n sub gi???m gi??
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
                            (B???n ???? ti???t ki???m ???????c {numberSale}
                            <span className="price">??</span> tr??n m???i SP)
                          </span>
                        ) : (
                          <p className="sub-text_sale1">
                            (S???n ph???m m???i ra m???t, ch??a ??p d???ng ch??nh s??ch gi???m
                            gi??)
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
                                <span className="price">??</span>
                              </span>
                              <div>
                                <span className="item-detail_price-real_sale">
                                  {Gia}
                                  <span className="price-sale">??</span>
                                </span>
                              </div>
                            </div>
                          ) : (
                            <p className="item-detail_price-real">
                              {Gia}
                              <span className="price">??</span>
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
                              <span className="price">??</span>
                            </span>
                            <button
                              onClick={() => handleClickToDeleteItem(index)}
                              className="click-to-remove-item"
                            >
                              Xo?? SP
                            </button>
                          </div>
                        ) : (
                          <div className="price-delete_item">
                            <span className="content-of-product1 fontsize-1rem">
                              {tongGia}
                              <span className="price">??</span>
                            </span>
                            <button
                              className="click-to-remove-item"
                              onClick={() => handleClickToDeleteItem(index)}
                            >
                              Xo?? SP
                            </button>
                          </div>
                        )}
                      </div>
                    </Col>
                  </li>
                  <hr className="hr-title-page" />
                </div>
                {/* nh??? h??n 576px */}
                <div className="nhoHon-576px">
                  <li className="li-nhoHon-576px" key={item.id}>
                    <Col xs={8}>
                      {/* ch??a xong */}
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
                                  Gi??: {giamGiaString}
                                  <span className="price">??</span>
                                </span>
                                <div>
                                  <span className="item-detail_price-real_sale">
                                    {Gia}
                                    <span className="price-sale">??</span>
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <p className="item-detail_price-real">
                                Gi?? :{Gia}
                                <span className="price">??</span>
                              </p>
                            )}
                          </span>
                        </div>
                        <div className="div-tung-muc">
                          {item.giamGia ? (
                            <span className="sub-text_sale1">
                              (B???n ???? ti???t ki???m ???????c {numberSale}
                              <span className="price">??</span> tr??n m???i SP)
                            </span>
                          ) : (
                            <p className="sub-text_sale1">
                              (S???n ph???m m???i ra m???t, ch??a ??p d???ng ch??nh s??ch gi???m
                              gi??)
                            </p>
                          )}
                        </div>
                        <div className="div-tung-muc">
                          <span className="content-of-product1">
                            Size: {item.size}
                          </span>
                        </div>
                        <div className="div-tung-muc">
                          S??? l?????ng:
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
                                T???ng: {tongGiamGiaString}
                                <span className="price">??</span>
                              </span>
                              <button
                                className="click-to-remove-item"
                                onClick={() => handleClickToDeleteItem(index)}
                              >
                                Xo?? SP
                              </button>
                            </div>
                          ) : (
                            <div className="total-price_remove-item">
                              <span className="content-of-product1 fontsize-1rem">
                                T???ng: {tongGia}
                                <span className="price">??</span>
                              </span>
                              <button
                                className="click-to-remove-item"
                                onClick={() => handleClickToDeleteItem(index)}
                              >
                                Xo?? SP
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
            <span className="footer-cartPage_top-title">T???ng Ti???n:</span>
            <span className="footer-cartPage_top-content">
              {totalPriceString}
              <span className="price">??</span>
            </span>
          </div>
          <div className="footer-cartPage_bottom">
            <Link to="/vestcollection">
              <ButtonShare
                title="TI???P T???C MUA S???M"
                subString="Th??m nhi???u s???n ph???m"
              />
            </Link>
            <ButtonShare
              title="TI???N H??NH THANH TO??N"
              subString="Nh???n nhi???u ??u ????i"
              backgroundColor="#ce1919"
              handleClick={handleClickNextToPayPage}
            />
          </div>
          <div>
            <span className="notificatrion-In-CartPage">
              Gi??? h??ng tr???ng, vui l??ng ch???n s???n ph???m tr?????c khi Thanh to??n
            </span>
          </div>
        </footer>
      </div>
    </body>
  );
}

export default RenderCartPage;
