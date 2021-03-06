import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../../../node_modules/slick-carousel/slick/slick.css";
import { addItemToDetail } from "../../../../actions/itemDetail";
import SkeletonProductList from "../../../../components share/skeletonProductList";
import { themDauChamVaoGiaTien } from "../../../../shareFunction/numberToString";
import "./listItemStar.scss";

const ListItemStar = (props) => {
  const { listItem, loading } = props;
  const [width, setWidth] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  function handleClickSendItem(item) {
    const itemDetail = addItemToDetail(item);
    dispatch(itemDetail);
    history.push(`/${item.phanLoai}/detail/${item.id}`);
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
    <ul className="carousel-mainPage">
      <div className="carousel-title">
        <h3>S???N PH???M HANDMADE</h3>
      </div>
      {loading ? (
        <SkeletonProductList quantity={quantity} />
      ) : (
        <Slider ref={ref} {...settings}>
          {listItem.map((item) => {
            // t???o d???u . trong gi?? ti???n
            let Gia = themDauChamVaoGiaTien(item.gia);

            // t???o d???u . trong gi???m gi?? ti???n
            let giamGiaString = "";
            if (item.giamGia) {
              giamGiaString = themDauChamVaoGiaTien(item.giamGia);
            }

            //t???o % gi???m gi??
            const phanTram = Math.round(
              (100 - (item.giamGia / item.gia) * 100).toFixed(2)
            );
            return (
              <li className="item" key={item.id}>
                <Link
                  className="item-link"
                  onClick={() => handleClickSendItem(item)}
                >
                  <div className="item-main">
                    <div className="item-main_div-img">
                      <img
                        className="item-main_img"
                        src={item.anhBia}
                        alt="???nh b??a"
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
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </Slider>
      )}
      {loading ? (
        ""
      ) : (
        <>
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
        </>
      )}
    </ul>
  );
};

export default ListItemStar;
