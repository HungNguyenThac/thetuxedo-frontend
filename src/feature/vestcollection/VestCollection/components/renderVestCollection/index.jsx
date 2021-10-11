import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../../../../node_modules/slick-carousel/slick/slick.css";
import { addItemToDetail } from "../../../../../actions/itemDetail";
import SkeletonProductList from "../../../../../components share/skeletonProductList";
import { themDauChamVaoGiaTien } from "../../../../../shareFunction/numberToString";
import "./renderVestCollection.scss";

RenderVestCollection.propTypes = {
  listVestCuoi: PropTypes.array,
  listVestDaHoi: PropTypes.array,
  listVestCongSo: PropTypes.array,
  loading: PropTypes.bool,
};
RenderVestCollection.defaultProps = {
  listVestCuoi: [],
  listVestDaHoi: [],
  listVestCongSo: [],
  loading: true,
};

function RenderVestCollection(props) {
  const { listVestCuoi, listVestDaHoi, listVestCongSo, loading } = props;
  const dispatch = useDispatch();
  const [width, setWidth] = useState();
  const history = useHistory();

  function handleClickSendItem(item) {
    const action = addItemToDetail(item);
    dispatch(action);
    history.push(`/${item.phanLoai}/detail/${item.id}`);
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
  window.addEventListener("resize", function reportWindowSize() {
    setWidth(window.innerWidth);
  });

  let quantity = "";
  if (width > 768 || window.innerWidth > 768) {
    quantity = 3;
  } else if (width <= 768 || window.innerWidth <= 768) {
    quantity = 2;
  } else if (width <= 576 || window.innerWidth <= 576) {
    quantity = 1;
  }

  return (
    <div>
      {/* carousel Vest Cuoi */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 10, offset: 12 }}
            xl={{ span: 10, offset: 12 }}
            lg={{ span: 10, offset: 12 }}
            md={{ span: 9, offset: 10 }}
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
        {loading ? (
          <SkeletonProductList quantity={quantity} />
        ) : (
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
                <li
                  className="item item-link"
                  key={item.id}
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
                </li>
              );
            })}
          </Slider>
        )}
        {loading ? (
          ""
        ) : (
          <>
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
          </>
        )}
      </ul>

      {/* carousel vest Da Hoi */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 10, offset: 12 }}
            xl={{ span: 10, offset: 12 }}
            lg={{ span: 10, offset: 12 }}
            md={{ span: 9, offset: 10 }}
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
        {loading ? (
          <SkeletonProductList quantity={quantity} />
        ) : (
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
                <li
                  className="itemm item-link"
                  key={item.id}
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
                </li>
              );
            })}
          </Slider>
        )}
        {loading ? (
          ""
        ) : (
          <>
            <button
              className="button-carousel-left"
              onClick={PreviousVestDaHoi}
            >
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
          </>
        )}
      </ul>

      {/* carousel vest Cong So */}
      <ul className="carousel-mainPage">
        <div className="carousel-title-VestColection">
          <Col
            xxl={{ span: 10, offset: 12 }}
            xl={{ span: 10, offset: 12 }}
            lg={{ span: 10, offset: 12 }}
            md={{ span: 9, offset: 10 }}
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
        {loading ? (
          <SkeletonProductList quantity={quantity} />
        ) : (
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
                <li
                  className="item item-link"
                  key={item.id}
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
                </li>
              );
            })}
          </Slider>
        )}
        {loading ? (
          ""
        ) : (
          <>
            <button
              className="button-carousel-left"
              onClick={PreviousVestCongSo}
            >
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
          </>
        )}
      </ul>
    </div>
  );
}

export default RenderVestCollection;
