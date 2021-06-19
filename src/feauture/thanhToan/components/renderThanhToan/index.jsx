import React from "react";
import PropTypes from "prop-types";
import "./renderThanhToan.scss";
import { Col, Row } from "antd";
import { themDauChamVaoGiaTien } from "../../../../shareFunction/numberToString";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { DeleteAllItemAndStorage } from "../../../../actions/itemCart";
import { useDispatch } from "react-redux";
RenderThanhToan.propTypes = {
  listItems: PropTypes.array,
};

RenderThanhToan.defaultProps = {
  listItems: [],
};

function checkItemPayPage(listItems) {
  if (listItems.length === 0) {
    let element = document.querySelector(".notification-in-payPage");
    element.classList.add("active");
  }
}

function checkInputs() {
  var userName = document.querySelector(".userName");
  const phoneNumber = document.querySelector(".phoneNumber");
  const userAddres = document.querySelector(".address");
  const usernameValue = userName.value.trim();
  const numberPhone1 = phoneNumber.value.trim();
  const address1 = userAddres.value.trim();

  if (usernameValue === "") {
    setErrorFor(userName, "Vui lòng nhập họ và tên");
  } else {
    setSuccessFor(userName);
  }

  if (numberPhone1 === "") {
    setErrorFor(phoneNumber, "Vui lòng nhập số điện thoại");
  } else if (isNaN(Number(numberPhone1)) === true) {
    setErrorFor(phoneNumber, "không đúng định dạng số điện thoại");
  } else {
    setSuccessFor(phoneNumber);
  }

  if (address1 === "") {
    setErrorFor(userAddres, "Vui lòng nhập địa chỉ");
  } else {
    setSuccessFor(userAddres);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

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

function RenderThanhToan(props) {
  const { listItems } = props;
  const totalPricePayPage = sumPriceOfTotalItems(listItems);
  const dispatch = useDispatch();
  const converNumberToString = themDauChamVaoGiaTien(totalPricePayPage);

  function handleClickToPayNow() {
    checkInputs();
    checkItemPayPage(listItems);
    const threeElement = document.querySelectorAll(".form-control.success");
    if (threeElement.length === 3 && listItems.length !== 0) {
      setHello(listItems);
    }
  }

  function showModalAndClearLocalStorage() {
    const modal = document.querySelector(".modal");
    modal.classList.add("active");
    const array = DeleteAllItemAndStorage([]);
    dispatch(array);
  }

  const [hello, setHello] = useState("");
  useEffect(() => {
    async function postData() {
      const threeElement = document.querySelectorAll(".form-control.success");
      const userName = document.querySelector(".userName");
      const phoneNumber = document.querySelector(".phoneNumber");
      const userAddres = document.querySelector(".address");
      const email = document.querySelector(".email");
      const usernameValue = userName.value.trim();
      const userPhoneNumber = phoneNumber.value.trim();
      const userAddress = userAddres.value.trim();
      const userEmail = email.value.trim();
      if (threeElement.length === 3) {
        try {
          var responseData = await axios({
            method: "post",
            url: "http://localhost:1337/bills",
            data: {
              HovaTen: usernameValue,
              Email: userEmail,
              DiaChi: userAddress,
              SoDienThoai: userPhoneNumber,
              sanPham: { listItems },
            },
          });
          console.log(responseData);
          if (responseData.status === 200) {
            showModalAndClearLocalStorage();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    postData();
    return { postData, axios, showModalAndClearLocalStorage };
  }, [hello]);

  return (
    <body className="body-payPage">
      <div class="grid">
        <div className="payPage-content">
          <div className="payPage-content_top1">
            <h1>THE TUXEDO - Thương hiệu VESTON may sẵn hàng đầu Việt Nam</h1>
          </div>
          <Link to="/">
            <div className="payPage-content_top2">
              <h1>THE TUXEDO</h1>
            </div>
          </Link>
          <div className="payPage-content_title">
            <h3>__TRANG THANH TOÁN__ </h3>
          </div>
          <hr className="hr-payPage" />
          <div className="payPage-content_body">
            <Row gutter={[32, 8]}>
              <Col
                xxl={{ span: 12, offset: 0 }}
                xl={{ span: 12, offset: 0 }}
                lg={{ span: 12, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                sm={{ span: 20, offset: 2 }}
                xs={{ span: 24, offset: 0 }}
              >
                <div className="content-body_top">
                  <div className="content-body_top-title">
                    <span>Thông Tin Khách Hàng</span>
                  </div>
                  <hr className="hr-payPage" />
                  <div className="form-user-profile">
                    <form id="form" action="">
                      <Col
                        xxl={24}
                        xl={24}
                        lg={24}
                        md={24}
                        className="no-padding"
                      >
                        <div class="form-control">
                          <input
                            name="Họ và tên"
                            type="text"
                            placeholder="Họ và Tên"
                            className="userName"
                          />
                          <small>Error message</small>
                        </div>
                      </Col>
                      <div className="email-phoneNumber">
                        <Col
                          xxl={15}
                          xl={15}
                          lg={15}
                          md={15}
                          sm={15}
                          xs={15}
                          className="no-padding"
                        >
                          <div class="form-control">
                            <input
                              type="text"
                              placeholder="Email"
                              className="email"
                              name="Email"
                            />
                            <small>Error message</small>
                          </div>
                        </Col>
                        <Col
                          xxl={9}
                          xl={9}
                          lg={9}
                          md={9}
                          sm={9}
                          xs={9}
                          className="remove-padding-left no-padding"
                        >
                          <div class="form-control">
                            <input
                              name="số điện thoại"
                              type="text"
                              placeholder="Số điện thoại"
                              className="phoneNumber"
                            />
                            <small>Error message</small>
                          </div>
                        </Col>
                      </div>
                      <div>
                        <Col className="no-padding">
                          <div class="form-control">
                            <input
                              name="Địa chỉ"
                              type="text"
                              placeholder="Địa chỉ nhận hàng"
                              className="address"
                            />
                            <small>Error message</small>
                          </div>
                        </Col>
                      </div>
                    </form>
                    <div className="note-for-user">
                      <span className="note-for-user_title">
                        ** Thanh Toán Khi Nhận Hàng
                      </span>
                      <ul className="note-for-user_ul">
                        <li className="note-for-user_content">
                          * Kiểm tra đơn hàng trước khi thanh toán
                        </li>
                        <li className="note-for-user_content">
                          * Sản phẩm được bảo hành trọn đời theo chính sách The
                          TUXEDO
                        </li>
                        <li className="note-for-user_content">
                          * Mọi thắc mắc xin vui lòng liên hệ Hotline:
                          0965882467
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xxl={{ span: 12, offset: 0 }}
                xl={{ span: 12, offset: 0 }}
                lg={{ span: 12, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                sm={{ span: 20, offset: 2 }}
                xs={{ span: 24, offset: 0 }}
              >
                <div className="content-body_top-right">
                  <span>Sản Phẩm Đã Chọn</span>
                </div>
                <hr className="hr-payPage" />
                <div>
                  <ul className="list-item-selected-in-payPage">
                    {listItems.map((item) => {
                      // tạo dấu . trong giá tiền
                      let Gia = "";
                      if (item.gia !== undefined) {
                        Gia = themDauChamVaoGiaTien(item.gia * item.soLuong);
                      }

                      // tạo dấu . trong giảm giá tiền
                      let giamGiaString = "";
                      if (item.giamGia !== undefined) {
                        giamGiaString = themDauChamVaoGiaTien(
                          item.giamGia * item.soLuong
                        );
                      }
                      return (
                        <div>
                          <li key={item.id}>
                            <div className="thongtin-sanPham">
                              <Col
                                xxl={4}
                                xl={4}
                                lg={4}
                                md={4}
                                sm={4}
                                xs={4}
                                className="remove-padding-right remove-padding-left"
                              >
                                <img
                                  className="thongtin-sanPham_tren"
                                  src={item.anhBia}
                                  alt="anhBia"
                                />
                              </Col>
                              <Col
                                xxl={20}
                                xl={20}
                                lg={20}
                                md={20}
                                sm={20}
                                xs={20}
                                className="remove-padding-right"
                              >
                                <div className="thongtin-sanPham_duoi">
                                  <span className="ten-san-pham">
                                    {item.tenSP}
                                  </span>
                                  <div className="size-sl-price">
                                    <span className="size-sl-price_size">
                                      Size: {item.size}
                                    </span>
                                    <span className="size-sl-price_soluong">
                                      Số lượng: {item.soLuong}
                                    </span>
                                    {item.giamGia ? (
                                      <span className="size-sl-price_price">
                                        {giamGiaString}
                                        <span className="price">đ</span>
                                      </span>
                                    ) : (
                                      <span className="size-sl-price_price">
                                        {Gia}
                                        <span className="price">đ</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </li>
                          <hr className="hr-payPage" />
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
          <footer className="footer-cartPage">
            <div className="footer-cartPage_top">
              <span className="footer-cartPage_top-title">Tổng Tiền:</span>
              <span className="footer-cartPage_top-content">
                {converNumberToString}
                <span className="price">đ</span>
              </span>
            </div>
            <div className="footer-cartPage_bottom">
              <Link to="/feature/cartPage">
                <button className="button-add-item-cart">
                  <span className="button-add-item-cart_title">
                    QUAY LẠI GIỎ HÀNG
                  </span>
                  <span className="button-add-item-cart_sub">
                    Thêm nhiều sản phẩm
                  </span>
                </button>
              </Link>
              <button className="button-buy-now" onClick={handleClickToPayNow}>
                <span className="button-buy-now_title">ĐẶT HÀNG</span>
                <span className="button-buy-now_sub">Giao hàng tận nơi</span>
              </button>
            </div>
            <div>
              <span className="notification-in-payPage">
                Giỏ hàng trống, vui lòng chọn sản phẩm trước khi Đặt hàng
              </span>
            </div>
          </footer>
        </div>
      </div>
      <div className="modal">
        <div className="modal__overlay">
          <div className="modal__container">
            <div className="hello">
              <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im01MDQuNSAyNTZjMCAxMzcuMjQyMTg4LTExMS4yNTc4MTIgMjQ4LjUtMjQ4LjUgMjQ4LjVzLTI0OC41LTExMS4yNTc4MTItMjQ4LjUtMjQ4LjUgMTExLjI1NzgxMi0yNDguNSAyNDguNS0yNDguNSAyNDguNSAxMTEuMjU3ODEyIDI0OC41IDI0OC41em0wIDAiIGZpbGw9IiM2MGRhYTgiLz48cGF0aCBkPSJtMjM4LjA4MjAzMSA0MjMuOTI1NzgxYzIwLjUwMzkwNy0xOS40Mzc1IDI5LjU5Mzc1LTQ2LjI4MTI1IDI5LjU5Mzc1LTQ2LjI4MTI1bC0zMy4wNDY4NzUtMjguMDU4NTkzcy00MC42MDkzNzUtNzguMDE1NjI2LTQwLjM1OTM3NS03Ny44MjAzMTNjLTkwLjY2Nzk2OS0xMDUuNDM3NS0yMi4yMjI2NTYtMjQ4LjM5NDUzMS0yMS40NDUzMTItMjUwLjAwMzkwNi05Ni4zMjgxMjUgMzQuMjE0ODQzLTE2NS4zMjQyMTkgMTI2LjE3NTc4MS0xNjUuMzI0MjE5IDIzNC4yMzgyODEgMCAxMjcuOTAyMzQ0IDk2LjY0ODQzOCAyMzMuMjM4MjgxIDIyMC44ODY3MTkgMjQ2Ljk4NDM3NS0xNi4xODc1LTI0LjUxOTUzMS0xMi40OTYwOTQtNTguMDI3MzQ0IDkuNjk1MzEyLTc5LjA1ODU5NHptMCAwIiBmaWxsPSIjMDBjZThlIi8+PHBhdGggZD0ibTI0MC44MDg1OTQgMzg5LjU3NDIxOWMtNy43NDIxODggMC0xNS41MjczNDQtMi40NzY1NjMtMjIuMDg1OTM4LTcuNTM5MDYzbC0xMTcuMTQ0NTMxLTkwLjM2MzI4MWMtMTUuODI4MTI1LTEyLjIwNzAzMS0xOC43NjE3MTktMzQuOTMzNTk0LTYuNTUwNzgxLTUwLjc2MTcxOSAxMi4yMDcwMzEtMTUuODI0MjE4IDM0LjkzMzU5NC0xOC43NTc4MTIgNTAuNzU3ODEyLTYuNTUwNzgxbDkwLjYzMjgxMyA2OS45MTQwNjMgMTI1LjA0Njg3NS0xMzguMzkwNjI2YzEzLjM5ODQzNy0xNC44MjgxMjQgMzYuMjg1MTU2LTE1Ljk4ODI4MSA1MS4xMTcxODctMi41ODU5MzcgMTQuODI4MTI1IDEzLjM5ODQzNyAxNS45ODgyODEgMzYuMjgxMjUgMi41ODk4NDQgNTEuMTEzMjgxbC0xNDcuNDk2MDk0IDE2My4yMzQzNzVjLTcuMTEzMjgxIDcuODc1LTE2Ljk1MzEyNSAxMS45Mjk2ODgtMjYuODY3MTg3IDExLjkyOTY4OHptMCAwIiBmaWxsPSIjZmZmY2RjIi8+PHBhdGggZD0ibTI1NiA1MTJjLTY4LjM3ODkwNiAwLTEzMi42Njc5NjktMjYuNjI4OTA2LTE4MS4wMTk1MzEtNzQuOTgwNDY5LTQ4LjM1MTU2My00OC4zNTE1NjItNzQuOTgwNDY5LTExMi42NDA2MjUtNzQuOTgwNDY5LTE4MS4wMTk1MzEgMC01OC4yNTc4MTIgMTkuMDY2NDA2LTExMy4xNDQ1MzEgNTUuMTM2NzE5LTE1OC43MzA0NjkgMi41NzAzMTItMy4yNDYwOTMgNy4yODUxNTYtMy43OTY4NzUgMTAuNTM1MTU2LTEuMjI2NTYyIDMuMjUgMi41NzAzMTIgMy43OTY4NzUgNy4yODUxNTYgMS4yMjY1NjMgMTAuNTM1MTU2LTMzLjk1MzEyNiA0Mi45MTAxNTYtNTEuODk4NDM4IDk0LjU3ODEyNS01MS44OTg0MzggMTQ5LjQyMTg3NSAwIDY0LjM3NSAyNS4wNjY0MDYgMTI0Ljg5NDUzMSA3MC41ODU5MzggMTcwLjQxNDA2MiA0NS41MTk1MzEgNDUuNTE5NTMyIDEwNi4wMzkwNjIgNzAuNTg1OTM4IDE3MC40MTQwNjIgNzAuNTg1OTM4czEyNC44OTQ1MzEtMjUuMDY2NDA2IDE3MC40MTQwNjItNzAuNTg1OTM4YzQ1LjUxOTUzMi00NS41MTk1MzEgNzAuNTg1OTM4LTEwNi4wMzkwNjIgNzAuNTg1OTM4LTE3MC40MTQwNjJzLTI1LjA2NjQwNi0xMjQuODk0NTMxLTcwLjU4NTkzOC0xNzAuNDE0MDYyYy00NS41MTk1MzEtNDUuNTE5NTMyLTEwNi4wMzkwNjItNzAuNTg1OTM4LTE3MC40MTQwNjItNzAuNTg1OTM4LTYzLjQxNDA2MiAwLTEyMy4yODUxNTYgMjQuNDI5Njg4LTE2OC41ODk4NDQgNjguNzg1MTU2LTIuOTU3MDMxIDIuODk0NTMyLTcuNzA3MDMxIDIuODQ3NjU2LTEwLjYwNTQ2OC0uMTEzMjgxLTIuODk4NDM4LTIuOTYwOTM3LTIuODQ3NjU3LTcuNzA3MDMxLjEwOTM3NC0xMC42MDU0NjkgNDguMTI1LTQ3LjExNzE4NyAxMTEuNzI2NTYzLTczLjA2NjQwNiAxNzkuMDg1OTM4LTczLjA2NjQwNiA2OC4zNzg5MDYgMCAxMzIuNjY3OTY5IDI2LjYyODkwNiAxODEuMDE5NTMxIDc0Ljk4MDQ2OSA0OC4zNTE1NjMgNDguMzUxNTYyIDc0Ljk4MDQ2OSAxMTIuNjQwNjI1IDc0Ljk4MDQ2OSAxODEuMDE5NTMxcy0yNi42Mjg5MDYgMTMyLjY2Nzk2OS03NC45ODA0NjkgMTgxLjAxOTUzMWMtNDguMzUxNTYyIDQ4LjM1MTU2My0xMTIuNjQwNjI1IDc0Ljk4MDQ2OS0xODEuMDE5NTMxIDc0Ljk4MDQ2OXptMCAwIi8+PHBhdGggZD0ibTI0MC44MTI1IDM5Ny4wNzQyMTljLTkuNzM0Mzc1IDAtMTguOTU3MDMxLTMuMTQ4NDM4LTI2LjY3MTg3NS05LjA5NzY1N2wtMTE3LjE0NDUzMS05MC4zNjMyODFjLTkuMjM4MjgyLTcuMTI4OTA2LTE1LjE1MjM0NC0xNy40Mjk2ODctMTYuNjQ0NTMyLTI5LjAwMzkwNi0xLjQ5NjA5My0xMS41NzQyMTkgMS42MDkzNzYtMjMuMDM1MTU2IDguNzM0Mzc2LTMyLjI3NzM0NCA3LjEyODkwNi05LjIzODI4MSAxNy40Mjk2ODctMTUuMTQ4NDM3IDI5LjAwMzkwNi0xNi42NDQ1MzEgMTEuNTc0MjE4LTEuNDkyMTg4IDIzLjAzOTA2MiAxLjYwOTM3NSAzMi4yNzczNDQgOC43MzgyODFsODUuMTM2NzE4IDY1LjY3NTc4MSAxMjAuMzk4NDM4LTEzMy4yNDIxODdjNy44MjAzMTItOC42NjAxNTYgMTguNTUwNzgxLTEzLjc1MzkwNiAzMC4yMDMxMjUtMTQuMzQzNzUgMTEuNjU2MjUtLjU4OTg0NCAyMi44NDM3NSAzLjM5MDYyNSAzMS41MDM5MDYgMTEuMjE0ODQ0czEzLjc1MzkwNiAxOC41NTQ2ODcgMTQuMzQzNzUgMzAuMjEwOTM3Yy41ODk4NDQgMTEuNjUyMzQ0LTMuMzk0NTMxIDIyLjgzOTg0NC0xMS4yMTg3NSAzMS41bC0xOS45ODQzNzUgMjIuMTE3MTg4Yy0yLjc3NzM0NCAzLjA3NDIxOC03LjUxOTUzMSAzLjMxMjUtMTAuNTkzNzUuNTM1MTU2LTMuMDcwMzEyLTIuNzc3MzQ0LTMuMzEyNS03LjUxOTUzMS0uNTM1MTU2LTEwLjU4OTg0NGwxOS45ODQzNzUtMjIuMTE3MTg3YzEwLjYwNTQ2OS0xMS43MzgyODEgOS43NjE3MTktMzAtMi4wNTQ2ODgtNDAuNTIzNDM4LTE2LjczMDQ2OS0xNC45MDYyNS0zNS4zODI4MTItMy42MzY3MTktNDAuNTE5NTMxIDIuMDUwNzgxbC0xMjUuMDQ2ODc1IDEzOC4zOTA2MjZjLTIuNjI1IDIuOTA2MjUtNy4wNDI5NjkgMy4zMDA3ODEtMTAuMTQ0NTMxLjkxMDE1NmwtOTAuNjM2NzE5LTY5LjkxNDA2M2MtNi4wNjI1LTQuNjc5Njg3LTI3LjQ5NjA5NC0xMS42ODM1OTMtNDAuMjM4MjgxIDUuMTkxNDA3LTEyLjc0MjE4OCAxNi44Nzg5MDYtLjg3NSAzNS41NjI1IDUuMTkxNDA2IDQwLjI0MjE4N2wxMTcuMTQ0NTMxIDkwLjM2MzI4MWM1LjA2NjQwNyAzLjkxMDE1NiAxMS4xMjEwOTQgNS45NzI2NTYgMTcuNTExNzE5IDUuOTcyNjU2IDguMTA1NDY5IDAgMTUuODcxMDk0LTMuNDQ1MzEyIDIxLjMwMDc4MS05LjQ1MzEyNGwxMDYuODM5ODQ0LTExOC4yNDIxODhjMi43NzczNDQtMy4wNzQyMTkgNy41MTk1MzEtMy4zMTI1IDEwLjU5Mzc1LS41MzUxNTYgMy4wNzAzMTMgMi43NzM0MzcgMy4zMTI1IDcuNTE5NTMxLjUzNTE1NiAxMC41ODk4NDRsLTEwNi44Mzk4NDMgMTE4LjI0NjA5M2MtOC4yNjk1MzIgOS4xNDg0MzgtMjAuMDg5ODQ0IDE0LjM5ODQzOC0zMi40Mjk2ODggMTQuMzk4NDM4em0wIDAiLz48L3N2Zz4=" />
            </div>
            <div className="complete-title">
              <span>ĐẶT HÀNG THÀNH CÔNG</span>
            </div>
            <div className="footer-cartPage_bottom">
              <Link to="/">
                <button className="button-add-item-cart1">
                  <span className="button-add-item-cart_title">
                    TIẾP TỤC MUA SẮM
                  </span>
                  <span className="button-add-item-cart_sub">
                    Thêm nhiều ưu đãi
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default RenderThanhToan;
