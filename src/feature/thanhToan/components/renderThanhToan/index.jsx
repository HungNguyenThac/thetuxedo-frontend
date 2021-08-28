import React from "react";
import PropTypes from "prop-types";
import "./renderThanhToan.scss";
import { Col, Row } from "antd";
import { themDauChamVaoGiaTien } from "../../../../shareFunction/numberToString";
import { Link } from "react-router-dom";
import axios from "axios";
import uuid from "uuid/dist/v4";
import { useState } from "react";
import { DeleteAllItemAndStorage } from "../../../../actions/itemCart";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../../actions/loading";
import { useRef } from "react";
import { setAddressUser, setInfoUser } from "../../../../actions/infoUser";
import { getCookie } from "../../../../shareFunction/checkCookies";
import ButtonShare from "../../../../components share/Button/index";
RenderThanhToan.propTypes = {
  listItems: PropTypes.array,
};

RenderThanhToan.defaultProps = {
  listItems: [],
};

function checkInputs() {
  var userName = document.querySelector(".userName");
  const phoneNumber = document.querySelector(".phoneNumber");
  const userAddres = document.querySelector(".address");
  const email = document.querySelector(".email");
  const usernameValue = userName.value.trim();
  const numberPhone1 = phoneNumber.value.trim();
  const emailValue = email.value.trim();
  const address1 = userAddres.value.trim();

  if (usernameValue === "") {
    setErrorFor(userName, "Vui lòng nhập họ và tên");
  } else {
    setSuccessFor(userName);
  }

  if (emailValue === "") {
    setErrorFor(email, "Vui lòng nhập Email");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Không đúng định dạng Email");
  } else {
    setSuccessFor(email);
  }

  if (numberPhone1 === "") {
    setErrorFor(phoneNumber, "Vui lòng nhập số điện thoại");
  } else if (
    numberPhone1.length < 10 ||
    numberPhone1.length > 11 ||
    numberPhone1.startsWith("0") === false ||
    isNaN(Number(numberPhone1)) === true
  ) {
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

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
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

function formatTimeString(date) {
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = `0${date.getFullYear()}`.slice(-4);
  return `${day}/${month}/${year}`;
}

function RenderThanhToan(props) {
  const dispatch = useDispatch();
  const { listItems } = props;
  const { infoUser } = useSelector((state) => state.GetInfoUser);
  const totalPricePayPage = sumPriceOfTotalItems(listItems);
  const converNumberToString = themDauChamVaoGiaTien(totalPricePayPage);
  const [name, setName] = useState(infoUser.name);
  const [phone, setPhone] = useState(infoUser.phoneNumber);
  const [diaChi, setDiaChi] = useState("Công Ty");
  const [time, setTime] = useState("Giờ Hành Chính");
  const [valueTextArea, setValueTextArea] = useState("");
  const [changeAddress, setChangeAddress] = useState({});
  const [index, setIndex] = useState("");
  const [addressSelected, setAddressSelected] = useState();
  const cloneUser = useRef(infoUser);

  function handleChangePhone(e) {
    let value = e.target.value;
    setPhone(value);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForLogIN(e.target, "Vui lòng nhập số điện thoại");
    } else if (
      number < 10 ||
      number > 11 ||
      value.startsWith("0") === false ||
      isNaN(Number(value)) === true
    ) {
      setErrorForLogIN(e.target, "không đúng định dạng số điện thoại");
    } else {
      element.className = "div-info-user success";
    }
  }

  function handleChangeName(e) {
    let value = e.target.value;
    setName(value);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForLogIN(e.target, "Tên người nhận không thể để trống!");
    } else if (number < 2) {
      setErrorForLogIN(e.target, "Tên càng đầy đủ càng tốt");
    } else if (number >= 2) {
      element.className = "div-info-user success";
    }
  }

  function handleChangeValueTextArea(e) {
    let value = e.target.value;
    setValueTextArea(value);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForLogIN(e.target, "Địa chỉ không thể bỏ trống!");
    } else if (number <= 20) {
      setErrorForLogIN(e.target, "Địa chỉ càng cụ thể càng tốt!");
    } else if (number > 20) {
      element.className = "div-info-user success";
    }
  }

  function handleChangeNewName(e) {
    let value = e.target.value;
    let newObject = { ...changeAddress };
    newObject.name = value;
    setChangeAddress(newObject);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForLogIN(e.target, "Tên người nhận không thể để trống!");
    } else if (number < 2) {
      setErrorForLogIN(e.target, "Tên càng đầy đủ càng tốt");
    } else if (number >= 2) {
      element.className = "div-info-user success";
    }
  }

  function handleChangeNewPhone(e) {
    let value = e.target.value;
    let newObject = { ...changeAddress };
    newObject.phone = value;
    setChangeAddress(newObject);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForLogIN(e.target, "Vui lòng nhập số điện thoại");
    } else if (
      number < 10 ||
      number > 11 ||
      value.startsWith("0") === false ||
      isNaN(Number(value)) === true
    ) {
      setErrorForLogIN(e.target, "không đúng định dạng số điện thoại");
    } else {
      element.className = "div-info-user success";
    }
  }

  function handleChangeNewValueTextArea(e) {
    let value = e.target.value;
    let newObject = { ...changeAddress };
    newObject.Address = value;
    setChangeAddress(newObject);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForLogIN(e.target, "Địa chỉ không thể bỏ trống!");
    } else if (number <= 20) {
      setErrorForLogIN(e.target, "Địa chỉ càng cụ thể càng tốt!");
    } else if (number > 20) {
      element.className = "div-info-user success";
    }
  }
  function handleClickToSelectAddress(e) {
    setDiaChi(e.target.value);
  }

  function handleClickToSelectTime(e) {
    setTime(e.target.value);
  }
  function handleClickToChangeAnyWhere(e) {
    let newObject = { ...changeAddress };
    newObject.diaChi = e.target.value;
    setChangeAddress(newObject);
    let element = e.target;
    element.checked = true;
  }

  function handleClickToSelectChangeTime(e) {
    let newObject = { ...changeAddress };
    newObject.time = e.target.value;
    setChangeAddress(newObject);
    let element = e.target;
    element.checked = true;
  }

  function handleClickToOpenBoardAddAddress() {
    let element = document.querySelector(".modal-moreAddress");
    element.style.display = "block";
  }

  function handleClickToOpenChangeAddress(address, index) {
    setChangeAddress(address);
    setIndex(index);
    let element = document.querySelector(".modal-fix-Address");
    element.style.display = "block";
  }

  function handleClickToCancelCreateNewAddress() {
    let element = document.querySelector(".modal-moreAddress");
    element.style.display = "none";
  }

  function handleClickToCancelChangeAddress() {
    let errors = document.querySelectorAll(".div-info-user.error");
    if (errors.length < 1) {
      let element = document.querySelector(".modal-fix-Address");
      element.style.display = "none";
    }
  }

  //sửa dữ liệu
  function handleClickToFix(e) {
    let element = e.target.parentElement;
    let input = element.querySelector(".input-address-user");
    input.disabled = false;
    element.className = "div-info-user error";
    let fix = element.querySelector(".btn-fix");
    fix.style.display = "none";
    let save = element.querySelector(".btn-save");
    save.style.display = "block";
    let small = element.querySelector("small");
    small.style.display = "none";
  }

  function handleClickToFocusTextarea(e) {
    let value = e.target.value;
    let element = e.target.parentElement;
    if (value.length === 0) {
      element.className = "div-info-user error";
    }
  }

  function handleClickToSave(e) {
    let element = e.target.parentElement;
    let input = element.querySelector(".input-address-user");
    if (input.value === name || input.value === changeAddress.name) {
      checkInputName();
    } else if (input.value === phone || input.value === changeAddress.phone) {
      checkInputPhone(e);
    }
    function checkInputName() {
      let emailValue = input.value.trim();
      if (emailValue === "") {
        setErrorForSignUP(input, "Vui lòng nhập Tên người nhận");
      } else if (emailValue.length >= 2) {
        setSuccessForSignUP(input);
        input.disabled = true;
        let save = element.querySelector(".btn-save");
        save.style.display = "none";
        let fix = element.querySelector(".btn-fix");
        fix.style.display = "block";
      }
    }
    //check phone
    function checkInputPhone() {
      let phoneValue = input.value.trim();
      if (phoneValue === "") {
        setErrorForSignUP(input, "Vui lòng nhập số điện thoại");
      } else if (
        phoneValue.length < 10 ||
        phoneValue.length > 11 ||
        phoneValue.startsWith("0") === false ||
        isNaN(Number(phoneValue)) === true
      ) {
        setErrorForSignUP(input, "không đúng định dạng số điện thoại");
      } else {
        setSuccessForSignUP(input);
        input.disabled = true;
        let save = element.querySelector(".btn-save");
        save.style.display = "none";
        let fix = element.querySelector(".btn-fix");
        fix.style.display = "block";
      }
    }
  }

  function setErrorForSignUP(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector("small");
    formControl.className = "div-info-user error";
    small.innerText = message;
    small.style.display = "block";
  }

  function setSuccessForSignUP(input) {
    let formControl = input.parentElement;
    formControl.className = "div-info-user success";
  }

  function handleClickToConfirmCreateNewAddress() {
    let error = document.querySelectorAll(".div-info-user.error");
    let addressUser = document.getElementById("addressUser");
    let value = addressUser.value.trim();

    if (error.length < 1 && value.length > 20) {
      let object = {
        id: uuid(),
        name: name,
        phone: phone,
        Address: valueTextArea,
        diaChi: diaChi,
        time: time,
      };
      let cloneArray = [...infoUser.address];
      cloneArray.unshift(object);
      dispatch(setAddressUser(cloneArray));
      let element = document.querySelector(".modal-moreAddress");
      element.style.display = "none";
      setName(infoUser.name);
      setPhone(infoUser.phoneNumber);
      setValueTextArea("");
      setDiaChi("Công Ty");
      setTime("Giờ Hành Chính");
    } else if (value.length === 0) {
      setErrorForSignUP(addressUser, "Địa chỉ không thể bỏ trống!");
    }
  }

  function setErrorForLogIN(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector("small");
    formControl.className = "div-info-user error";
    small.innerText = message;
    small.style.display = "block";
  }

  function handleClickToConfirmChangeAddress() {
    let error = document.querySelectorAll(".div-info-user.error");
    if (error.length < 1) {
      let newArray = [...infoUser.address];
      newArray.splice(index, 1, changeAddress);
      dispatch(setAddressUser(newArray));
      let element = document.querySelector(".modal-fix-Address");
      element.style.display = "none";
    }
  }

  function handleClickToDeleteAddress(index) {
    let cloneArray = [...infoUser.address];
    cloneArray.splice(index, 1);
    dispatch(setAddressUser(cloneArray));
  }

  function handleClickToSaveAllAddress() {
    if (JSON.stringify(cloneUser.current) !== JSON.stringify(infoUser)) {
      sendRequestToUpdateAddress();
    }
  }

  let sendRequestToUpdateAddress = async () => {
    let array = infoUser.address;
    let notification = document.querySelector(
      ".notification-for-save-all-address"
    );
    let element = document.querySelector(
      ".notification-for-forget-save-address"
    );
    try {
      const cookies = getCookie("user");
      let response = await axios({
        method: "PUT",
        url: "http://localhost:9527/user/dashboard",
        headers: { Authorization: cookies },
        data: {
          address: { array },
        },
      });
      if (response.data.status === 200) {
        dispatch(setInfoUser(response.data.user));
        cloneUser.current = response.data.user;
        element.style.display = "none";
        notification.style.display = "block";
      } else if (response.data.status === 400) {
        notification.innerText = "Một lỗi đã xảy ra";
        notification.style.display = "block";
      }
    } catch (error) {
      console.log(error.message);
    }

    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  };

  function handleClick() {
    if (infoUser.avatar.length >= 1) {
      if (addressSelected !== undefined) {
        postBillForUserModol();
        dispatch(showLoading(true));
      } else {
        let element = document.querySelector(
          ".notification-forget-selected-address"
        );
        element.classList.add("active");
      }
    } else {
      checkInputs();
      checkItemPayPage(listItems);
      const threeElement = document.querySelectorAll(".form-control.success");
      if (threeElement.length === 4 && listItems.length !== 0) {
        dispatch(showLoading(true));
        postBill();
      }
    }
  }

  function checkItemPayPage(listItems) {
    if (listItems.length === 0) {
      let element = document.querySelector(".notification-in-payPage");
      element.classList.add("active");
    }
  }

  function showModalAndClearLocalStorage() {
    const modal = document.querySelector(".modal");
    modal.classList.add("active");
    const array = DeleteAllItemAndStorage([]);
    dispatch(array);
  }

  const postBillForUserModol = async () => {
    let nameUser = addressSelected.name;
    let phoneuser = addressSelected.phone;
    let address = addressSelected.Address;
    let diaChi = addressSelected.diaChi;
    let time = addressSelected.time;
    let now = new Date();
    let newTimeString = formatTimeString(now);
    let bill = {
      HoVaTen: nameUser,
      SoDienThoai: phoneuser,
      DiaChi: address,
      DiaDiem: diaChi,
      ThoiGian: time,
      NgayDat: newTimeString,
      TongTien: totalPricePayPage,
      products: { listItems },
    };
    let cloneBill = [...infoUser.bill];
    cloneBill.push(bill);
    try {
      const cookies = getCookie("user");
      let response = await axios({
        method: "PUT",
        url: "http://localhost:9527/user/addbill",
        headers: { Authorization: cookies },
        data: {
          bill: { cloneBill },
        },
      });
      if (response.data.status === 200) {
        dispatch(hideLoading(false));
        showModalAndClearLocalStorage();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const postBill = async () => {
    let threeElement = document.querySelectorAll(".form-control.success");
    let userName = document.querySelector(".userName");
    let phoneNumber = document.querySelector(".phoneNumber");
    let userAddres = document.querySelector(".address");
    let email = document.querySelector(".email");
    let usernameValue = userName.value.trim();
    let userPhoneNumber = phoneNumber.value.trim();
    let userAddress = userAddres.value.trim();
    let userEmail = email.value.trim();
    if (threeElement.length === 4) {
      try {
        let responseData = await axios.post(
          "https://thetuxedo.herokuapp.com/bills",
          {
            HovaTen: usernameValue,
            Email: userEmail,
            DiaChi: userAddress,
            SoDienThoai: userPhoneNumber,
            sanPham: { listItems },
          }
        );
        if (responseData.status === 200) {
          dispatch(hideLoading(false));
          showModalAndClearLocalStorage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  function handleClickToOpenBoardSelectAddress(e) {
    e.preventDefault();
    let element = document.querySelector(".modal-select-Address-for-buy");
    element.style.display = "block";
    let notification = document.querySelector(
      ".notification-forget-selected-address"
    );
    notification.classList.remove("active");
  }

  function handleCliickToOpenChangeAddressUser(e) {
    e.preventDefault();
    let element = document.querySelector(".modal-select-Address-for-buy");
    element.style.display = "block";
  }

  function handleClickToDispatchSelectAddress(address) {
    if (JSON.stringify(cloneUser.current) === JSON.stringify(infoUser)) {
      setAddressSelected(address);
      let element = document.querySelector(".modal-select-Address-for-buy");
      element.style.display = "none";
    } else {
      let element = document.querySelector(
        ".notification-for-forget-save-address"
      );
      let notification = document.querySelector(
        ".notification-for-save-all-address"
      );
      element.style.display = "block";
      notification.style.display = "none";
      setTimeout(() => {
        element.style.display = "none";
      }, 3000);
    }
  }

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
                    {infoUser.avatar.length >= 1 ? (
                      <div>
                        {addressSelected ? (
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
                                  disabled
                                  placeholder="Họ và Tên"
                                  className="userName"
                                  value={addressSelected.name}
                                />
                                <small>Error message</small>
                              </div>
                            </Col>
                            <div className="email-phoneNumber">
                              <Col
                                xxl={8}
                                xl={8}
                                lg={8}
                                md={8}
                                sm={8}
                                xs={8}
                                className="no-padding"
                              >
                                <div class="form-control">
                                  <input
                                    name="số điện thoại"
                                    type="text"
                                    disabled
                                    placeholder="Số điện thoại"
                                    className="phoneNumber"
                                    value={addressSelected.phone}
                                  />
                                  <small>Error message</small>
                                </div>
                              </Col>
                              <Col
                                xxl={8}
                                xl={8}
                                lg={8}
                                md={8}
                                sm={8}
                                xs={8}
                                className="remove-padding-left no-padding"
                              >
                                <div class="form-control">
                                  <input
                                    name="địa chỉ"
                                    type="text"
                                    disabled
                                    placeholder="Địa Chỉ"
                                    className="phoneNumber"
                                    value={addressSelected.diaChi}
                                  />
                                  <small>Error message</small>
                                </div>
                              </Col>
                              <Col
                                xxl={8}
                                xl={8}
                                lg={8}
                                md={8}
                                sm={8}
                                xs={8}
                                className="remove-padding-left no-padding"
                              >
                                <div class="form-control">
                                  <input
                                    name="thời gian"
                                    type="text"
                                    disabled
                                    placeholder="Thời Gian"
                                    className="phoneNumber"
                                    value={addressSelected.time}
                                  />
                                  <small>Error message</small>
                                </div>
                              </Col>
                            </div>
                            <div>
                              <Col className="no-padding">
                                <div class="form-control">
                                  <textarea
                                    name="Địa chỉ"
                                    type="text"
                                    disabled
                                    placeholder="Địa chỉ nhận hàng"
                                    className="address"
                                    value={addressSelected.Address}
                                  ></textarea>
                                  <small>Error message</small>
                                </div>
                              </Col>
                            </div>
                            <div className="block-for-change-address">
                              <button
                                className="btn-for-open-boardAddress"
                                onClick={handleCliickToOpenChangeAddressUser}
                              >
                                Thay Đổi
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="block-select-address-for-buy-product">
                            <button
                              className="btn-select-address-for-buy-product"
                              onClick={handleClickToOpenBoardSelectAddress}
                            >
                              Chọn Địa Chỉ
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
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
                                type="email"
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
                              <textarea
                                name="Địa chỉ"
                                type="text"
                                placeholder="Địa chỉ nhận hàng"
                                className="address"
                              ></textarea>
                              <small>Error message</small>
                            </div>
                          </Col>
                        </div>
                      </form>
                    )}
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
                          <hr className="hr-payPage" />
                        </li>
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
                <ButtonShare
                  title="QUAY LẠI GIỎ HÀNG"
                  subString=" Thêm nhiều sản phẩm"
                />
              </Link>
              <ButtonShare
                title="ĐẶT HÀNG"
                subString="Giao hàng tận nơi"
                backgroundColor="#ce1919"
                handleClick={handleClick}
              />
            </div>
            <div>
              <span className="notification-in-payPage">
                Giỏ hàng trống, vui lòng chọn sản phẩm trước khi Đặt hàng
              </span>
            </div>
            <div>
              <span className="notification-forget-selected-address">
                Bạn đã đăng nhập, vui lòng chọn địa chỉ
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
      <div className="modal-select-Address-for-buy">
        <div className="modal-select-Address-for-buy_overlay">
          <div className="block-select-Address-for-buy-dashboard">
            <div className="dashboard-right-top">
              <h3 className="dashboard-right-top-title">
                Chọn địa chỉ giao hàng
              </h3>
              <span className="dashboard-right-top-content">
                Quản lý địa chỉ của bạn thật chính xác
              </span>
              <button
                className="btn-add-address"
                onClick={handleClickToOpenBoardAddAddress}
                disabled={infoUser.address.length >= 6 ? true : false}
                style={
                  infoUser.address.length >= 6
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
              >
                Thêm Địa Chỉ
              </button>
            </div>

            <Col
              className="div-children-change-info-user"
              xxl={24}
              xl={24}
              lg={24}
              md={24}
              sm={24}
            >
              <ul className="ul-address-dashboard">
                {infoUser.address.map((address, index) => {
                  return (
                    <li key={address.id}>
                      <table className="table-left-dashboard">
                        <tr className="tr-dashboard-info">
                          <td className="td-address-left">Tên người nhận:</td>
                          <td className="td-address-right">{address.name}</td>
                          <td className="td-address-left">Điện thoại:</td>
                          <td className="td-address-right">{address.phone}</td>
                          <td
                            className="td-address-right text-underline"
                            onClick={() =>
                              handleClickToOpenChangeAddress(address, index)
                            }
                          >
                            Sửa
                          </td>
                        </tr>
                        <tr className="tr-dashboard-info">
                          <td className="td-address-left">Nơi nhận:</td>
                          <td className="td-address-right">{address.diaChi}</td>
                          <td className="td-address-left">Thời gian:</td>
                          <td className="td-address-right">{address.time}</td>
                          <td
                            className="td-address-right text-underline"
                            onClick={() => handleClickToDeleteAddress(index)}
                          >
                            Xóa
                          </td>
                        </tr>
                        <tr className="tr-dashboard-info">
                          <td className="td-address-left">Địa chỉ cụ thể:</td>
                          <td className="td-address-right" colSpan="3">
                            {address.Address}
                          </td>
                          <td className="td-address-right text-underline">
                            <button
                              className="btn-select-address-real"
                              onClick={() =>
                                handleClickToDispatchSelectAddress(address)
                              }
                            >
                              Chọn
                            </button>
                          </td>
                        </tr>
                      </table>
                      <hr />
                    </li>
                  );
                })}
              </ul>
            </Col>
            <div className="modal-moreAddress">
              <div className="modal-moreAddress_overlay">
                <div className="block-add-address-user-dashboard">
                  <div className="title-add-address">
                    <span>Địa chỉ mới:</span>
                  </div>
                  <div className="block-content-add-address">
                    <div className="block-content-add-address-top">
                      <Row gutter={[8, 8]}>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                          <div className="div-info-user">
                            <input
                              className="input-address-user"
                              type="text"
                              value={name}
                              placeholder="Họ và tên"
                              onChange={handleChangeName}
                              disabled
                              id="nameUser"
                            />

                            <small>Error message</small>
                            <button
                              className="btn-fix"
                              onClick={handleClickToFix}
                            >
                              Sửa
                            </button>
                            <button
                              className="btn-save"
                              onClick={handleClickToSave}
                            >
                              Lưu
                            </button>
                          </div>
                        </Col>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                          <div className="div-info-user">
                            <input
                              className="input-address-user"
                              type="text"
                              value={phone}
                              placeholder="Số điện thoại"
                              onChange={handleChangePhone}
                              disabled
                              id="phoneUser"
                            />
                            <small>Error message</small>
                            <button
                              className="btn-fix"
                              onClick={handleClickToFix}
                            >
                              Sửa
                            </button>
                            <button
                              className="btn-save"
                              onClick={handleClickToSave}
                            >
                              Lưu
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="block-content-add-address-mid">
                      <div className="div-info-user">
                        <textarea
                          className="detail-address"
                          name=""
                          id="addressUser"
                          placeholder="Địa chỉ cụ thể..."
                          onChange={handleChangeValueTextArea}
                          onClick={handleClickToFocusTextarea}
                          value={valueTextArea}
                        ></textarea>
                        <small>Địa chỉ không thể bỏ trống!</small>
                      </div>
                      <Row className="block-option-address">
                        <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
                          <div className="select-type-addres">
                            <div className="type-addess-title">
                              Loại địa chỉ:
                            </div>
                            <button
                              className={
                                diaChi === "Công Ty"
                                  ? "option-address active"
                                  : "option-address"
                              }
                            >
                              Công ty
                              <input
                                className="select-address"
                                type="radio"
                                value="Công Ty"
                                name="noinhanhang"
                                id="companyUser"
                                defaultChecked={
                                  diaChi === "Công Ty" ? true : false
                                }
                                onClick={handleClickToSelectAddress}
                              />
                            </button>
                            <button
                              className={
                                diaChi === "Nhà Riêng"
                                  ? "option-address active"
                                  : "option-address"
                              }
                            >
                              Nhà riêng
                              <input
                                className="select-address"
                                type="radio"
                                name="noinhanhang"
                                value="Nhà Riêng"
                                id="homeUser"
                                defaultChecked={
                                  diaChi === "Nhà Riêng" ? true : false
                                }
                                onClick={handleClickToSelectAddress}
                              />
                            </button>
                          </div>
                          <div className="select-type-time">
                            <div className="type-time-title">
                              Thời gian nhận hàng:
                            </div>
                            <button
                              className={
                                time === "Giờ Hành Chính"
                                  ? "option-time active"
                                  : "option-time"
                              }
                            >
                              Hành chính
                              <input
                                className="select-address"
                                type="radio"
                                value="Giờ Hành Chính"
                                name="gionhanhang"
                                id="administrativeHours"
                                defaultChecked={
                                  time === "Giờ Hành Chính" ? true : false
                                }
                                onClick={handleClickToSelectTime}
                              />
                            </button>
                            <button
                              className={
                                time === "Mọi Lúc"
                                  ? "option-time active"
                                  : "option-time"
                              }
                            >
                              Mọi lúc
                              <input
                                className="select-address"
                                type="radio"
                                value="Mọi Lúc"
                                id="everyTime"
                                name="gionhanhang"
                                defaultChecked={
                                  time === "Mọi Lúc" ? true : false
                                }
                                onClick={handleClickToSelectTime}
                              />
                            </button>
                          </div>
                        </Col>
                        <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
                          <div className="confirm-save-and-cancel">
                            <button
                              className="confirm-cancel-add-address"
                              onClick={handleClickToCancelCreateNewAddress}
                            >
                              Hủy Bỏ
                            </button>
                            <button
                              className="confirm-save-add-address"
                              onClick={handleClickToConfirmCreateNewAddress}
                            >
                              Xác Nhận
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="notification-for-save-all-address">
              Bạn đã lưu địa chỉ thành công
            </span>
            <span className="notification-for-forget-save-address">
              Bạn chưa lưu thay đổi địa chỉ
            </span>
            <button
              className="btn-click-to-save-all-address"
              onClick={handleClickToSaveAllAddress}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
      {/* sửa object addres */}
      <div className="modal-fix-Address">
        <div className="modal-moreAddress_overlay">
          <div className="block-add-address-user-dashboard">
            <div className="title-add-address">
              <span>Sửa địa chỉ:</span>
            </div>
            <div className="block-content-add-address">
              <div className="block-content-add-address-top">
                <Row gutter={[8, 8]}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="div-info-user">
                      <input
                        className="input-address-user"
                        type="text"
                        value={changeAddress.name}
                        placeholder="Họ và tên"
                        onChange={handleChangeNewName}
                        disabled
                      />
                      <small>Error message</small>
                      <button className="btn-fix" onClick={handleClickToFix}>
                        Sửa
                      </button>
                      <button className="btn-save" onClick={handleClickToSave}>
                        Lưu
                      </button>
                    </div>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="div-info-user">
                      <input
                        className="input-address-user"
                        type="text"
                        value={changeAddress.phone}
                        placeholder="Số điện thoại"
                        onChange={handleChangeNewPhone}
                        disabled
                      />
                      <small>Error message</small>
                      <button className="btn-fix" onClick={handleClickToFix}>
                        Sửa
                      </button>
                      <button className="btn-save" onClick={handleClickToSave}>
                        Lưu
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="block-content-add-address-mid">
                <div className="div-info-user">
                  <textarea
                    className="detail-address"
                    name=""
                    id=""
                    placeholder="Địa chỉ cụ thể..."
                    onChange={handleChangeNewValueTextArea}
                    value={changeAddress.Address}
                  ></textarea>
                  <small>Địa chỉ không thể bỏ trống!</small>
                </div>
                <Row className="block-option-address">
                  <Col xxl={14} xl={14} lg={14} md={14} sm={24} xs={24}>
                    <div className="select-type-addres">
                      <div className="type-addess-title">Loại địa chỉ:</div>
                      <button
                        className={
                          changeAddress.diaChi === "Công Ty"
                            ? "option-change-address active"
                            : "option-change-address"
                        }
                      >
                        Công ty
                        <input
                          className="select-address"
                          type="radio"
                          value="Công Ty"
                          defaultChecked={
                            changeAddress.diaChi === "Công Ty" ? true : false
                          }
                          name="noinhanhang"
                          onClick={handleClickToChangeAnyWhere}
                        />
                      </button>
                      <button
                        className={
                          changeAddress.diaChi === "Nhà Riêng"
                            ? "option-change-address active"
                            : "option-change-address"
                        }
                      >
                        Nhà riêng
                        <input
                          className="select-address"
                          type="radio"
                          name="noinhanhang"
                          value="Nhà Riêng"
                          defaultChecked={
                            changeAddress.diaChi === "Nhà Riêng" ? true : false
                          }
                          onClick={handleClickToChangeAnyWhere}
                        />
                      </button>
                    </div>
                    <div className="select-type-time">
                      <div className="type-time-title">
                        Thời gian nhận hàng:
                      </div>
                      <button
                        className={
                          changeAddress.time === "Giờ Hành Chính"
                            ? "option-change-time active"
                            : "option-change-time"
                        }
                      >
                        Hành chính
                        <input
                          className="select-address"
                          type="radio"
                          value="Giờ Hành Chính"
                          name="gionhanhang"
                          defaultChecked={
                            changeAddress.time === "Giờ Hành Chính"
                              ? true
                              : false
                          }
                          onClick={handleClickToSelectChangeTime}
                        />
                      </button>
                      <button
                        className={
                          changeAddress.time === "Mọi Lúc"
                            ? "option-change-time active"
                            : "option-change-time"
                        }
                      >
                        Mọi lúc
                        <input
                          className="select-address"
                          type="radio"
                          value="Mọi Lúc"
                          defaultChecked={
                            changeAddress.time === "Mọi Lúc" ? true : false
                          }
                          name="gionhanhang"
                          onClick={handleClickToSelectChangeTime}
                        />
                      </button>
                    </div>
                  </Col>
                  <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
                    <div className="confirm-save-and-cancel">
                      <button
                        className="confirm-cancel-add-address"
                        onClick={handleClickToCancelChangeAddress}
                      >
                        Hủy Bỏ
                      </button>
                      <button
                        className="confirm-save-add-address"
                        onClick={handleClickToConfirmChangeAddress}
                      >
                        Xác Nhận
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default RenderThanhToan;
