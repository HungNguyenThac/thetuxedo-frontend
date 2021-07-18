import React from "react";
import "./renderPhuKien.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../../node_modules/slick-carousel/slick/slick-theme.css";
import { themDauChamVaoGiaTien } from "../../../../shareFunction/numberToString";
import { useDispatch } from "react-redux";
import { addItemToDetail } from "../../../../actions/itemDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

RenderPhuKien.propTypes = {
  listComboPhuKien: PropTypes.array,
  listKhanCaiAo: PropTypes.array,
  listCaVat: PropTypes.array,
  listGhimCaiAo: PropTypes.array,
  listNoCaiCo: PropTypes.array,
  listThatLung: PropTypes.array,
};
RenderPhuKien.defaultProps = {
  listComboPhuKien: [],
  listKhanCaiAo: [],
  listCaVat: [],
  listGhimCaiAo: [],
  listNoCaiCo: [],
  listThatLung: [],
};

function RenderPhuKien(props) {
  const {
    listComboPhuKien,
    listKhanCaiAo,
    listCaVat,
    listGhimCaiAo,
    listNoCaiCo,
    listThatLung,
  } = props;
  const dispatch = useDispatch();
  function handleClickSendItem(item) {
    let itemDetail = addItemToDetail(item);
    dispatch(itemDetail);
    window.scrollTo(0, 186);
  }

  // ref combo phu kien
  const refcomboPhuKien = useRef({});

  const NextComboPhuKien = () => {
    refcomboPhuKien.current.slickNext();
  };

  const PreviousComboPhuKien = () => {
    refcomboPhuKien.current.slickPrev();
  };

  //ref khan cai ao
  const refKhanCaiAo = useRef({});

  const NextKhanCaiAo = () => {
    refKhanCaiAo.current.slickNext();
  };

  const PreviousKhanCaiAo = () => {
    refKhanCaiAo.current.slickPrev();
  };

  // ref ca vat
  const refCaVat = useRef({});

  const NextCaVat = () => {
    refCaVat.current.slickNext();
  };

  const PreviousCaVat = () => {
    refCaVat.current.slickPrev();
  };

  // ref ghim cai ao
  const refGhimCaiAo = useRef({});

  const NextGhimCaiAo = () => {
    refGhimCaiAo.current.slickNext();
  };

  const PreviousGhimCaiAo = () => {
    refGhimCaiAo.current.slickPrev();
  };

  // ref nơ cài cổ
  const refNoCaiCo = useRef({});

  const NextNoCaiCo = () => {
    refNoCaiCo.current.slickNext();
  };

  const PreviousNoCaiCo = () => {
    refNoCaiCo.current.slickPrev();
  };

  // ref Thắt lưng
  const refThatLung = useRef({});

  const NextThatLung = () => {
    refThatLung.current.slickNext();
  };

  const PreviousThatLung = () => {
    refThatLung.current.slickPrev();
  };

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  const setting1 = {
    dots: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    rtl: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div>
      {/* carousel combo phu kien */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 12, offset: 10 }}
            xl={{ span: 12, offset: 10 }}
            lg={{ span: 12, offset: 10 }}
            md={{ span: 12, offset: 10 }}
            sm={{ span: 18, offset: 6 }}
          >
            <h3>COMBO PHỤ KIỆN</h3>
          </Col>
        </div>
        <Slider ref={refcomboPhuKien} {...settings}>
          {listThatLung.map((item) => {
            // tạo dấu . trong giá tiền
            let Gia = themDauChamVaoGiaTien(item.gia);

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //tạo % giảm giá
            const phanTram = Math.round(
              (100 - (item.giamGia / item.gia) * 100).toFixed(2)
            );
            return (
              <li className="item" key={item.id}>
                <Link
                  className="item-link"
                  to="/feature/detail"
                  onClick={() => handleClickSendItem(item)}
                >
                  <div className="item-main">
                    <div className="item-main_div-img">
                      <img
                        className="item-main_img"
                        src={item.anhBia}
                        alt="ảnh bìa"
                      />
                      {item.giamGia ? (
                        <div className="notification-sale">
                          <span className="notification-sale_content">
                            <span>{phanTram}%</span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="item-detail">
                      <div className="item-detail_flex">
                        <div className="item-detail_name">{item.tenSP}</div>
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
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </Slider>
        <button className="button-carousel-left" onClick={PreviousComboPhuKien}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextComboPhuKien}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>

      {/* carousel khan cai ao */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 11, offset: 11 }}
            xl={{ span: 11, offset: 11 }}
            lg={{ span: 11, offset: 11 }}
            md={{ span: 11, offset: 11 }}
            sm={{ span: 14, offset: 6 }}
            xs={{ span: 16, offset: 4 }}
          >
            <h3>KHĂN CÀI ÁO</h3>
          </Col>
          <Col xxl={2} xl={2} lg={2} md={2} sm={4} xs={4}>
            <Link
              className="link-in-vestCollection"
              to="/feature/phukien/khancaiao"
            >
              <span className="link-in-vestCollection-content">
                Xem thêm...
              </span>
            </Link>
          </Col>
        </div>
        <Slider ref={refKhanCaiAo} {...setting1}>
          {listNoCaiCo.map((item) => {
            // tạo dấu . trong giá tiền
            let Gia = themDauChamVaoGiaTien(item.gia);

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //tạo % giảm giá
            const phanTram = Math.round(
              (100 - (item.giamGia / item.gia) * 100).toFixed(2)
            );
            return (
              <li className="item" key={item.id}>
                <Link
                  className="item-link"
                  to="/feature/detail"
                  onClick={() => handleClickSendItem(item)}
                >
                  <div className="item-main">
                    <div className="item-main_div-img">
                      <img
                        className="item-main_img"
                        src={item.anhBia}
                        alt="ảnh bìa"
                      />
                      {item.giamGia ? (
                        <div className="notification-sale">
                          <span className="notification-sale_content">
                            <span>{phanTram}%</span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="item-detail">
                      <div className="item-detail_flex">
                        <div className="item-detail_name">{item.tenSP}</div>
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
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </Slider>
        <button className="button-carousel-left" onClick={PreviousKhanCaiAo}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextKhanCaiAo}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>

      {/* carousel list ca vat */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 11, offset: 11 }}
            xl={{ span: 11, offset: 11 }}
            lg={{ span: 11, offset: 11 }}
            md={{ span: 11, offset: 11 }}
            sm={{ span: 14, offset: 6 }}
            xs={{ span: 16, offset: 4 }}
          >
            <h3>CÀ VẠT</h3>
          </Col>
          <Col xxl={2} xl={2} lg={2} md={2} sm={4} xs={4}>
            <Link
              className="link-in-vestCollection"
              to="/feature/phukien/cavat"
            >
              <span className="link-in-vestCollection-content">
                Xem thêm...
              </span>
            </Link>
          </Col>
        </div>
        <Slider ref={refCaVat} {...settings}>
          {listGhimCaiAo.map((item) => {
            // tạo dấu . trong giá tiền
            let Gia = themDauChamVaoGiaTien(item.gia);

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //tạo % giảm giá
            const phanTram = Math.round(
              (100 - (item.giamGia / item.gia) * 100).toFixed(2)
            );
            return (
              <li className="item" key={item.id}>
                <Link
                  className="item-link"
                  to="/feature/detail"
                  onClick={() => handleClickSendItem(item)}
                >
                  <div className="item-main">
                    <div className="item-main_div-img">
                      <img
                        className="item-main_img"
                        src={item.anhBia}
                        alt="ảnh bìa"
                      />
                      {item.giamGia ? (
                        <div className="notification-sale">
                          <span className="notification-sale_content">
                            <span>{phanTram}%</span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="item-detail">
                      <div className="item-detail_flex">
                        <div className="item-detail_name">{item.tenSP}</div>
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
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </Slider>
        <button className="button-carousel-left" onClick={PreviousCaVat}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextCaVat}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>

      {/* carousel ghim cai ao */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 11, offset: 11 }}
            xl={{ span: 11, offset: 11 }}
            lg={{ span: 11, offset: 11 }}
            md={{ span: 11, offset: 11 }}
            sm={{ span: 14, offset: 6 }}
            xs={{ span: 16, offset: 4 }}
          >
            <h3>Ghim Cài Áo</h3>
          </Col>
          <Col xxl={2} xl={2} lg={2} md={2} sm={4} xs={4}>
            <Link
              className="link-in-vestCollection"
              to="/feature/vestcollection/vestcongso"
            >
              <span className="link-in-vestCollection-content">
                Xem thêm...
              </span>
            </Link>
          </Col>
        </div>
        <Slider ref={refGhimCaiAo} {...setting1}>
          {listCaVat.map((item) => {
            // tạo dấu . trong giá tiền
            let Gia = themDauChamVaoGiaTien(item.gia);

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //tạo % giảm giá
            const phanTram = Math.round(
              (100 - (item.giamGia / item.gia) * 100).toFixed(2)
            );
            return (
              <li className="item" key={item.id}>
                <Link
                  className="item-link"
                  to="/feature/detail"
                  onClick={() => handleClickSendItem(item)}
                >
                  <div className="item-main">
                    <div className="item-main_div-img">
                      <img
                        className="item-main_img"
                        src={item.anhBia}
                        alt="ảnh bìa"
                      />
                      {item.giamGia ? (
                        <div className="notification-sale">
                          <span className="notification-sale_content">
                            <span>{phanTram}%</span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="item-detail">
                      <div className="item-detail_flex">
                        <div className="item-detail_name">{item.tenSP}</div>
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
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </Slider>
        <button className="button-carousel-left" onClick={PreviousGhimCaiAo}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextGhimCaiAo}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>

      {/* carousel no cai co */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 11, offset: 11 }}
            xl={{ span: 11, offset: 11 }}
            lg={{ span: 11, offset: 11 }}
            md={{ span: 11, offset: 11 }}
            sm={{ span: 14, offset: 6 }}
            xs={{ span: 16, offset: 4 }}
          >
            <h3>NƠ CÀI CỔ</h3>
          </Col>
          <Col xxl={2} xl={2} lg={2} md={2} sm={4} xs={4}>
            <Link
              className="link-in-vestCollection"
              to="/feature/phukien/nocaico"
            >
              <span className="link-in-vestCollection-content">
                Xem thêm...
              </span>
            </Link>
          </Col>
        </div>
        <Slider ref={refNoCaiCo} {...settings}>
          {listKhanCaiAo.map((item) => {
            // tạo dấu . trong giá tiền
            let Gia = themDauChamVaoGiaTien(item.gia);

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //tạo % giảm giá
            const phanTram = Math.round(
              (100 - (item.giamGia / item.gia) * 100).toFixed(2)
            );
            return (
              <li className="item" key={item.id}>
                <Link
                  className="item-link"
                  to="/feature/detail"
                  onClick={() => handleClickSendItem(item)}
                >
                  <div className="item-main">
                    <div className="item-main_div-img">
                      <img
                        className="item-main_img"
                        src={item.anhBia}
                        alt="ảnh bìa"
                      />
                      {item.giamGia ? (
                        <div className="notification-sale">
                          <span className="notification-sale_content">
                            <span>{phanTram}%</span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="item-detail">
                      <div className="item-detail_flex">
                        <div className="item-detail_name">{item.tenSP}</div>
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
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </Slider>
        <button className="button-carousel-left" onClick={PreviousNoCaiCo}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextNoCaiCo}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>

      {/* carousel that lung */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 11, offset: 11 }}
            xl={{ span: 11, offset: 11 }}
            lg={{ span: 11, offset: 11 }}
            md={{ span: 11, offset: 11 }}
            sm={{ span: 14, offset: 6 }}
            xs={{ span: 16, offset: 4 }}
          >
            <h3>THẮT LƯNG</h3>
          </Col>
          <Col xxl={2} xl={2} lg={2} md={2} sm={4} xs={4}>
            <Link
              className="link-in-vestCollection"
              to="/feature/phukien/thatlung"
            >
              <span className="link-in-vestCollection-content">
                Xem thêm...
              </span>
            </Link>
          </Col>
        </div>
        <Slider ref={refThatLung} {...setting1}>
          {listComboPhuKien.map((item) => {
            // tạo dấu . trong giá tiền
            let Gia = themDauChamVaoGiaTien(item.gia);

            // tạo dấu . trong giảm giá tiền
            let giamGiaString = "";
            if (item.giamGia) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //tạo % giảm giá
            const phanTram = Math.round(
              (100 - (item.giamGia / item.gia) * 100).toFixed(2)
            );
            return (
              <li className="item" key={item.id}>
                <Link
                  className="item-link"
                  to="/feature/detail"
                  onClick={() => handleClickSendItem(item)}
                >
                  <div className="item-main">
                    <div className="item-main_div-img">
                      <img
                        className="item-main_img"
                        src={item.anhBia}
                        alt="ảnh bìa"
                      />
                      {item.giamGia ? (
                        <div className="notification-sale">
                          <span className="notification-sale_content">
                            <span>{phanTram}%</span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="item-detail">
                      <div className="item-detail_flex">
                        <div className="item-detail_name">{item.tenSP}</div>
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
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </Slider>
        <button className="button-carousel-left" onClick={PreviousThatLung}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextThatLung}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>
    </div>
  );
}

export default RenderPhuKien;
