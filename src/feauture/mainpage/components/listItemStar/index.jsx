import React from "react";
import "./listItemStar.scss";
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
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const ListItemStar = (props) => {
  const { listItem } = props;
  const dispatch = useDispatch();
  function handleClickSendItem(item) {
    let itemDetail = addItemToDetail(item);
    dispatch(itemDetail);
    window.scrollTo(0, 186);
  }
  const ref = useRef({});

  const Next = () => {
    ref.current.slickNext();
  };

  const Previous = () => {
    ref.current.slickPrev();
  };

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
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
    <ul className="carousel-mainPage">
      <div className="carousel-title">
        <h3>SẢN PHẨM HANDMADE</h3>
      </div>
      <Slider ref={ref} {...settings}>
        {listItem.map((item) => {
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
      <button className="button-carousel-left" onClick={Previous}>
        <FontAwesomeIcon
          className="button-carousel-icon"
          icon={faChevronCircleLeft}
        />
      </button>
      <button className="button-carousel-right" onClick={Next}>
        <FontAwesomeIcon
          className="button-carousel-icon"
          icon={faChevronCircleRight}
        />
      </button>
    </ul>
  );
};

export default ListItemStar;
