import React from "react";
import PropTypes from "prop-types";
import "./detailTop.scss";
import { Col, Row } from "antd";
import { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../../actions/itemCart";
import { useEffect } from "react";
import { themDauChamVaoGiaTien } from "../../../../shareFunction/numberToString";
import { useHistory } from "react-router-dom";

DetailTop.propTypes = {
  itemDetail: PropTypes.object,
  activeSize: PropTypes.func,
  idSize: PropTypes.string,
};

DetailTop.defaultProps = {
  itemDetail: {},
  activeSize: null,
  idSize: null,
};

function convertListAnhtoArray(list) {
  const listAnhLength = list.length;
  let newArray = [];
  for (let i = 0; i < listAnhLength; i++) {
    let object = {
      id: i,
      url: list[i],
    };
    newArray.push(object);
  }
  return newArray;
}

function convertSizeToArray(listSize) {
  const listSizeLength = listSize.length;
  let newArray = [];
  for (let i = 0; i < listSizeLength; i++) {
    let object = {
      id: i,
      size: listSize[i],
    };
    newArray.push(object);
  }
  return newArray;
}
function checkWindowInnerWidth(e) {
  if (window.innerWidth >= 768) {
    imageZoom(e);
  }
}

function imageZoom(e) {
  var img, lens, result, detailItem, cx, cy;
  img = e.target;
  result = document.getElementById("myresult");
  result.style.display = "block";
  result.style.height = (result.clientWidth * 3) / 2 - 4 + "px";
  /*create lens:*/
  var deleteElement = document.querySelector(".img-zoom-lens");
  if (deleteElement !== null) {
    deleteElement.remove();
  }
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  lens.style.display = "block";
  detailItem = document.querySelector(".item-detail-page");
  detailItem.style.display = "none";
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  lens.addEventListener("mouseout", displayNone);

  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

function displayNone() {
  var lens, result, detailItem;
  result = document.getElementById("myresult");
  result.style.display = "none";
  lens = document.querySelector(".img-zoom-lens");
  lens.style.display = "none";
  detailItem = document.querySelector(".item-detail-page");
  detailItem.style.display = "block";
}

function DetailTop(props) {
  const { itemDetail, activeSize, idSize } = props;
  const { tenSP, phanLoai, maSP, size, moTa, listAnh, gia, giamGia } =
    itemDetail;
  const [numberItemSelected, setNumberItemSelected] = useState(1);
  const [sizeSelected, setSizeSelected] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  //tạo list ảnh
  var arrayAnh = [];
  if (listAnh !== undefined) {
    arrayAnh = convertListAnhtoArray(itemDetail.listAnh);
  }

  // tạo list size
  var arraySize = [];
  if (size !== undefined) {
    arraySize = convertSizeToArray(itemDetail.size);
  }

  // tạo dấu . trong giá tiền
  let Gia = "";
  if (gia !== undefined) {
    console.log(77, gia);
    Gia = themDauChamVaoGiaTien(gia);
  }

  // tạo dấu . trong giảm giá tiền
  let giamGiaString = "";
  if (giamGia !== undefined) {
    giamGiaString = themDauChamVaoGiaTien(giamGia);
  }
  //thêm dấu . vào phần sub giảm giá
  let numberSale = "";
  if (gia && giamGia !== undefined) {
    numberSale = themDauChamVaoGiaTien(gia - giamGia);
  }

  // chọn số lượng
  function handleClickNumberChange(number) {
    setNumberItemSelected(number);
  }

  function RemoveActiveForMissSelectSize() {
    let element = document.querySelector(".notification-for-miss-select-size");
    element.classList.remove("active");
  }

  function notificationToSelectSize() {
    let element = document.querySelector(".notification-for-miss-select-size");
    element.classList.add("active");
  }
  function notificationAddToCart() {
    let element = document.querySelector(".notification-for-add-item-to-cart");
    element.classList.add("active");
  }

  function handleClickToSelectSize(size) {
    setSizeSelected(size.size);
    RemoveActiveForMissSelectSize();
    if (activeSize) {
      activeSize(size);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      let element = document.querySelector(
        ".notification-for-add-item-to-cart"
      );
      element.classList.remove("active");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  });

  function handleClickAddItemToCart() {
    if (sizeSelected.length !== 0) {
      let itemSelected = {
        ...itemDetail,
        size: sizeSelected,
        soLuong: numberItemSelected,
      };
      let itemToCart = addItemToCart(itemSelected);
      notificationAddToCart();
      dispatch(itemToCart);
    } else {
      notificationToSelectSize();
    }
  }
  function handleClickToPayNow() {
    if (sizeSelected.length !== 0) {
      let itemSelected = {
        ...itemDetail,
        size: sizeSelected,
        soLuong: numberItemSelected,
      };
      let itemToCart = addItemToCart(itemSelected);
      dispatch(itemToCart);
      history.push("/feature/payPage");
    } else {
      notificationToSelectSize();
    }
  }

  return (
    <div className="body-detail_top">
      <Row gutter={[32, 8]}>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <Row gutter={[8]}>
            <ul className="ul-listAnh">
              {arrayAnh.map((anh) => {
                return (
                  <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                    <li key={anh.id} className="detail-img">
                      <img
                        className="detail-img_img myImage"
                        src={anh.url}
                        alt=""
                        onMouseOver={checkWindowInnerWidth}
                      />
                    </li>
                  </Col>
                );
              })}
            </ul>
          </Row>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
          <div>
            <div className="item-detail-page">
              <h1 className="item-detail-page_name">{tenSP}</h1>
              {giamGia ? (
                <div className="item-detail-page_price">
                  <span className="item-detail-page_price-sale">
                    {giamGiaString}
                    <span className="price-detail-page">đ</span>
                  </span>
                  <div>
                    <span className="item-detail-page_price-real_sale">
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
              {giamGia ? (
                <span className="sub-text_sale">
                  (Bạn đã tiết kiệm được {numberSale}
                  <span className="price">đ</span>)
                </span>
              ) : (
                <p className="sub-text_sale">
                  (Sản phẩm mới ra mắt, chưa áp dụng chính sách giảm giá)
                </p>
              )}
              <div>
                <span className="mota-item_title">
                  Loại:
                  <span className="mota-item_content">{phanLoai}</span>
                </span>
                <span className="mota-item_title">
                  Mã sản phẩm:
                  <span className="mota-item_content">{maSP}</span>
                </span>
              </div>
              <hr className="hr-title-page" />
              <div className="block-size">
                <span className="block-size_label">Size:</span>
                <ul className="block-size_ul">
                  {arraySize.map((size) => {
                    return (
                      <li
                        className={
                          size.id === idSize
                            ? "block-size_select active"
                            : "block-size_select"
                        }
                        key={size.id}
                        onClick={() => handleClickToSelectSize(size)}
                      >
                        {size.size}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="button-item-change_block">
                <span className="soluong">Số lượng:</span>
                <button
                  disabled={numberItemSelected <= 1}
                  className="button-item-change"
                  onClick={() => {
                    handleClickNumberChange(numberItemSelected - 1);
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="number_so-luong">{numberItemSelected}</span>
                <button
                  className="button-item-change"
                  onClick={() => {
                    handleClickNumberChange(numberItemSelected + 1);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="block-for-button">
                <button
                  className="button-add-item-cart"
                  onClick={handleClickAddItemToCart}
                >
                  <span className="button-add-item-cart_title">
                    THÊM VÀO GIỎ
                  </span>
                  <span className="button-add-item-cart_sub">
                    Giao hàng tận nơi toàn quốc
                  </span>
                </button>
                <button
                  className="button-buy-now"
                  onClick={handleClickToPayNow}
                >
                  <span className="button-buy-now_title">MUA NGAY</span>
                  <span className="button-buy-now_sub">
                    Thêm nhiều ưu đãi hấp dẫn
                  </span>
                </button>
              </div>
              <div className="notification-in-detail-page">
                <span className="notification-for-miss-select-size">
                  (Hãy chắc chắn rằng Bạn đã chọn size phù hợp)
                </span>
                <span className="notification-for-add-item-to-cart">
                  (Bạn đã thêm sản phẩm vào giỏ hàng thành công)
                </span>
              </div>
              <hr className="hr-title-page" />
              <div className="moTa-sanPham">
                <span className="moTa-sanPham_content">
                  *Hãy tới The TUXEDO để trải nghiệm các sản phẩm đang có tại 71
                  Showroom
                </span>
              </div>
            </div>
            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={24}
              xs={24}
              className="padding-none"
            >
              <div id="myresult" class="img-zoom-result"></div>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailTop;
