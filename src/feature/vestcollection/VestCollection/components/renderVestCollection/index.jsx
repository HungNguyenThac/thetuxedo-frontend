import React from "react";
import "./renderVestCollection.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../../../node_modules/slick-carousel/slick/slick-theme.css";
import { themDauChamVaoGiaTien } from "../../../../../shareFunction/numberToString";
import { useDispatch } from "react-redux";
import { addItemToDetail } from "../../../../../actions/itemDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

RenderVestCollection.propTypes = {
  listVestCuoi: PropTypes.array,
  listVestDaHoi: PropTypes.array,
  listVestCongSo: PropTypes.array,
};
RenderVestCollection.defaultProps = {
  listVestCuoi: [],
  listVestDaHoi: [],
  listVestCongSo: [],
};

function RenderVestCollection(props) {
  const { listVestCuoi, listVestDaHoi, listVestCongSo } = props;
  const dispatch = useDispatch();
  function handleClickSendItem(item) {
    let itemDetail = addItemToDetail(item);
    dispatch(itemDetail);
    window.scrollTo(0, 186);
  }

  // ref vest cuoi
  const refVestCuoi = useRef({});

  const NextVestCuoi = () => {
    refVestCuoi.current.slickNext();
  };

  const PreviousVestCuoi = () => {
    refVestCuoi.current.slickPrev();
  };

  //ref vest cong so
  const refVestDaHoi = useRef({});

  const NextVestDaHoi = () => {
    refVestDaHoi.current.slickNext();
  };

  const PreviousVestDaHoi = () => {
    refVestDaHoi.current.slickPrev();
  };

  // ref vest da hoi
  const refVestCongSo = useRef({});

  const NextVestCongSo = () => {
    refVestCongSo.current.slickNext();
  };

  const PreviousVestCongSo = () => {
    refVestCongSo.current.slickPrev();
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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
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
      {/* carousel Vest Cuoi */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 10, offset: 12 }}
            xl={{ span: 10, offset: 12 }}
            lg={{ span: 10, offset: 12 }}
            md={{ span: 9, offset: 12 }}
            sm={{ span: 14, offset: 6 }}
            xs={{ span: 16, offset: 4 }}
          >
            <h3>VEST CƯỚI</h3>
          </Col>
          <Col xxl={2} xl={2} lg={2} md={3} sm={4} xs={4}>
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
        <Slider ref={refVestCuoi} {...settings}>
          {listVestCuoi.map((item) => {
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
        <button className="button-carousel-left" onClick={PreviousVestCuoi}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextVestCuoi}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>

      {/* carousel vest Da Hoi */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 10, offset: 12 }}
            xl={{ span: 10, offset: 12 }}
            lg={{ span: 10, offset: 12 }}
            md={{ span: 9, offset: 12 }}
            sm={{ span: 14, offset: 6 }}
            xs={{ span: 16, offset: 4 }}
          >
            <h3>VEST DA HỘI</h3>
          </Col>
          <Col xxl={2} xl={2} lg={2} md={3} sm={4} xs={4}>
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
        <Slider ref={refVestDaHoi} {...setting1}>
          {listVestDaHoi.map((item) => {
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
        <button className="button-carousel-left" onClick={PreviousVestDaHoi}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextVestDaHoi}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>

      {/* carousel vest Cong So */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 10, offset: 12 }}
            xl={{ span: 10, offset: 12 }}
            lg={{ span: 10, offset: 12 }}
            md={{ span: 9, offset: 12 }}
            sm={{ span: 14, offset: 6 }}
            xs={{ span: 16, offset: 4 }}
          >
            <h3>VEST CÔNG SỞ</h3>
          </Col>
          <Col xxl={2} xl={2} lg={2} md={3} sm={4} xs={4}>
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
        <Slider ref={refVestCongSo} {...settings}>
          {listVestCongSo.map((item) => {
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
        <button className="button-carousel-left" onClick={PreviousVestCongSo}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-right" onClick={NextVestCongSo}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </ul>
    </div>
  );
}

export default RenderVestCollection;
