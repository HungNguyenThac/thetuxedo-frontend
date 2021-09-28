import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "antd";
import { PropTypes } from "prop-types";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../../../node_modules/slick-carousel/slick/slick.css";
import convertListAnhtoArray from "../../../../shareFunction/listAnhToArray";

ImageList.propTypes = {
  arrayAnh: PropTypes.array,
  itemDetail: PropTypes.object,
};

ImageList.defaultProps = {
  arrayAnh: [],
  itemDetail: {},
};

function ImageList(props) {
  const { listAnh, itemDetail } = props;
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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    lazyLoad: false,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
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

  var arrayAnh = [];
  if (listAnh !== undefined) {
    arrayAnh = convertListAnhtoArray(itemDetail.listAnh);
  }

  function handleClickToCloseImageList() {
    const element = document.querySelector(".window__zoom");
    element.style.display = "none";
  }

  return (
    <div className="window__zoom">
      <div className="window__zoom_overlay">
        <Col xxl={{ span: 9, offset: 8 }}>
          <Slider ref={ref} {...settings}>
            {arrayAnh.map((anh) => {
              return (
                <li key={anh.id} className="image__List">
                  <img
                    className="image__List_img myImage"
                    src={anh.url}
                    alt=""
                  />
                </li>
              );
            })}
          </Slider>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="icon__x-circle"
            onClick={handleClickToCloseImageList}
          />
        </Col>
        <button className="button-carousel-detail-left" onClick={Previous}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleLeft}
          />
        </button>
        <button className="button-carousel-detail-right" onClick={Next}>
          <FontAwesomeIcon
            className="button-carousel-icon"
            icon={faChevronCircleRight}
          />
        </button>
      </div>
    </div>
  );
}

export default ImageList;
