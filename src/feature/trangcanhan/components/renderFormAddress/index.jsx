import React from "react";
import PropTypes from "prop-types";
import "./renderFormAddress.scss";
import { Row, Col } from "antd";
import { useState } from "react";
import uuid from "uuid/dist/v4";
import { getCookie } from "../../../../shareFunction/checkCookies";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAddressUser, setInfoUser } from "../../../../actions/infoUser";
import { useRef } from "react";

RenderFormAddAddress.propTypes = {
  infoUser: PropTypes.object,
};

RenderFormAddAddress.defaultProps = {
  infoUser: {},
};

function RenderFormAddAddress(props) {
  const dispatch = useDispatch();
  const { infoUser } = props;
  const [name, setName] = useState(infoUser.name);
  const [phone, setPhone] = useState(infoUser.phoneNumber);
  const [diaChi, setDiaChi] = useState("Công Ty");
  const [time, setTime] = useState("Giờ Hành Chính");
  const [valueTextArea, setValueTextArea] = useState("");
  const [changeAddress, setChangeAddress] = useState({});
  const [index, setIndex] = useState("");
  const cloneAddress = useRef(infoUser);

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
    if (JSON.stringify(cloneAddress.current) !== JSON.stringify(infoUser)) {
      sendRequestToUpdateAddress();
    }
  }

  let sendRequestToUpdateAddress = async () => {
    let array = infoUser.address;
    let notification = document.querySelector(
      ".notification-for-save-all-address"
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
        cloneAddress.current = response.data.user;
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

  return (
    <div className="div-parent-change-address-user">
      <div className="dashboard-right-top">
        <h3 className="dashboard-right-top-title">Địa chỉ của tôi</h3>
        <span className="dashboard-right-top-content">
          Quản lý địa chỉ giúp đảm bảo nhận hàng
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
                  </tr>
                </table>
                <hr />
              </li>
            );
          })}
        </ul>
        <span className="notification-for-save-all-address">
          Bạn đã lưu địa chỉ thành công
        </span>
        <button
          className="btn-click-to-save-all-address"
          onClick={handleClickToSaveAllAddress}
        >
          SAVE
        </button>
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
                        value={phone}
                        placeholder="Số điện thoại"
                        onChange={handleChangePhone}
                        disabled
                        id="phoneUser"
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
                      <div className="type-addess-title">Loại địa chỉ:</div>
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
                          defaultChecked={diaChi === "Công Ty" ? true : false}
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
                          defaultChecked={diaChi === "Nhà Riêng" ? true : false}
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
                          defaultChecked={time === "Mọi Lúc" ? true : false}
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
    </div>
  );
}

export default RenderFormAddAddress;
