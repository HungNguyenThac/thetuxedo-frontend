import {
  faBell,
  faClipboardCheck,
  faFileInvoiceDollar,
  faSignOutAlt,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import firebase from "firebase";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setDayBirthDayUser,
  setEmailUser,
  setGenderUser,
  setInfoUser,
  setMonthBirthDayUser,
  setNameUser,
  setNickNameUser,
  setPhoneUser,
  setYearBirthDayUser,
} from "../../../../actions/infoUser";
import userApi from "../../../../api/userApi";
import { isEmail } from "../../../../shareFunction/isEmail";
import BillOFUser from "../bill";
import HistoryBill from "../history";
import RenderChangePassword from "../renderChangePassword";
import RenderFormAddAddress from "../renderFormAddress";
import "./renderDashBoard.scss";

function RenderDashBoard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories);
  const { bills } = useSelector((state) => state.bills);
  const { infoUser } = useSelector((state) => state.GetInfoUser);
  const cloneInfoUser = useRef(infoUser);
  function handleChangeName(e) {
    let value = e.target.value;
    dispatch(setNameUser(value));
  }

  function handleChangeNickName(e) {
    let value = e.target.value;
    dispatch(setNickNameUser(value));
  }

  function handleChangeEmail(e) {
    let value = e.target.value;
    dispatch(setEmailUser(value));
  }

  function handleChangePhone(e) {
    let value = e.target.value;
    dispatch(setPhoneUser(value));
  }

  function handleClickSelectGender(e) {
    let value = e.target.value;
    dispatch(setGenderUser(value));
  }

  //day
  function handleClickToSelectDay(e) {
    let element = e.target.parentElement;
    element.classList.toggle("active");
    let value = e.target.value;
    dispatch(setDayBirthDayUser(String(value)));
  }

  //month
  function handleClickToSelectMonth(e) {
    let element = e.target.parentElement;
    element.classList.toggle("active");
    let value = e.target.value;
    dispatch(setMonthBirthDayUser(String(value)));
  }

  //year
  function handleClickToSelectYear(e) {
    let element = e.target.parentElement;
    element.classList.toggle("active");
    let value = e.target.value;
    dispatch(setYearBirthDayUser(String(value)));
  }

  //logout
  async function handleClickToLogout() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }

    let user = firebase.auth().currentUser;

    if (user) {
      await firebase.auth().signOut();
      history.push("/login");
    } else {
      delete_cookie("user");
      setTimeout(() => {
        dispatch(
          setInfoUser({
            name: "",
            nickname: "",
            avatar: "",
            gender: "",
            birthDay: {
              day: "",
              month: "",
              year: "",
            },
            address: [],
            cart: [],
            bill: {},
            loginName: "",
            email: "",
            phoneNumber: "",
            password: "",
          })
        );
        history.push("/login");
      }, 250);
    }
  }

  // đưa cookies về hết hạn
  function delete_cookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  //sửa dữ liệu
  function handleClickToFix(e) {
    let element = e.target.parentElement;
    let input = element.querySelector(".input-info-user");
    input.disabled = false;
    element.className = "td-info-user error";
    let fix = element.querySelector(".btn-fix");
    fix.style.display = "none";
    let save = element.querySelector(".btn-save");
    save.style.display = "block";
    let small = element.querySelector("small");
    small.style.display = "none";
  }
  // lưu dữ liệu
  function handleClickToSave(e) {
    let element = e.target.parentElement;
    let input = element.querySelector(".input-info-user");

    if (input.type === "email") {
      checkInputEmail(e);
    } else if (input.type === "text") {
      checkInputPhone(e);
    }

    //check email
    function checkInputEmail() {
      let emailValue = input.value.trim();
      if (emailValue === "") {
        setErrorForSignUP(input, "Vui lòng nhập Email");
      } else if (!isEmail(emailValue)) {
        setErrorForSignUP(input, "Không đúng định dạng Email");
      } else {
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
    formControl.className = "td-info-user error";
    small.innerText = message;
    small.style.display = "block";
  }

  function setSuccessForSignUP(input) {
    let formControl = input.parentElement;
    formControl.className = "td-info-user success";
  }

  function handleShowSelectBirthday(e) {
    let element = e.target.parentElement;
    let trElement = element.querySelector(".tr-birthday");
    trElement.classList.toggle("active");
  }

  function handleClickToSaveAllChangeInfo(e) {
    e.preventDefault();
    if (JSON.stringify(cloneInfoUser.current) !== JSON.stringify(infoUser)) {
      SendRequestUpdateInfo();
    }
  }

  const SendRequestUpdateInfo = async () => {
    let formSignup = document.querySelectorAll(".td-info-user.error");
    let succes = document.querySelector(
      ".message-for-user-when-change-info-succes"
    );
    let failed = document.querySelector(
      ".message-for-user-when-change-info-failed"
    );
    let name = infoUser.name;
    let nickName = infoUser.nickName;
    let gender = infoUser.gender;
    let day = infoUser.birthDay.day;
    let month = infoUser.birthDay.month;
    let year = infoUser.birthDay.year;
    let email = infoUser.email;
    let phoneNumber = infoUser.phoneNumber;
    let isSubscribe = true;
    if (formSignup.length < 1) {
      try {
        let response = await userApi.putUpdateInfoUser(
          name,
          nickName,
          gender,
          day,
          month,
          year,
          email,
          phoneNumber
        );
        const { status, user } = response;
        if (isSubscribe && status === 200) {
          dispatch(setInfoUser(user));
          cloneInfoUser.current = user;
          succes.style.display = "block";
          failed.style.display = "none";
          let element = document.querySelector(".modal-moreInformation");
          element.style.display = "none";
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (formSignup.length >= 1) {
      failed.style.display = "block";
      succes.style.display = "none";
    }

    setTimeout(() => {
      succes.style.display = "none";
      failed.style.display = "none";
    }, 3000);
  };

  function handleClickToSelectProfileAccount() {
    const optionActive = document.querySelector(".option-file.active");
    optionActive?.classList.remove("active");
    const profileRemove = document.querySelector(".profile-title.active");
    profileRemove?.classList.remove("active");
    const profileOption = document.querySelector(".option-profile");
    profileOption.style.display = "block";
    const profileActive = document.querySelectorAll(".profile-title");
    profileActive[0]?.classList.add("active");
    const firstOptionFile = document.querySelectorAll(".option-file");
    firstOptionFile[0]?.classList.add("active");
    const address = document.querySelector(".div-parent-change-address-user");
    address?.classList.remove("active");
    const password = document.querySelector(".div-parent-change-password-user");
    password?.classList.remove("active");
    const bill = document.querySelector(".div-parent-bill-user");
    bill?.classList.remove("active");
    const history = document.querySelector(".div-parent-history-user");
    history?.classList.remove("active");
    const info = document.querySelector(".div-parent-change-info-user");
    info?.classList.add("active");
  }

  function clickToSelectProfile(e) {
    const optionActive = document.querySelector(".option-file.active");
    optionActive?.classList.remove("active");
    const profileRemove = document.querySelector(".profile-title.active");
    profileRemove?.classList.remove("active");
    const profileActive = document.querySelectorAll(".profile-title");
    profileActive[0]?.classList.add("active");
    const elementTarget = e.target;
    elementTarget?.classList.add("active");
    const address = document.querySelector(".div-parent-change-address-user");
    address?.classList.remove("active");
    const password = document.querySelector(".div-parent-change-password-user");
    password?.classList.remove("active");
    const bill = document.querySelector(".div-parent-bill-user");
    bill?.classList.remove("active");
    const history = document.querySelector(".div-parent-history-user");
    history?.classList.remove("active");
    const info = document.querySelector(".div-parent-change-info-user");
    info?.classList.add("active");
  }

  function clickToSelectAddress(e) {
    const optionActive = document.querySelector(".option-file.active");
    optionActive?.classList.remove("active");
    const profileRemove = document.querySelector(".profile-title.active");
    profileRemove?.classList.remove("active");
    const profileActive = document.querySelectorAll(".profile-title");
    profileActive[0]?.classList.add("active");
    const elementTarget = e.target;
    elementTarget?.classList.add("active");
    const info = document.querySelector(".div-parent-change-info-user");
    info?.classList.remove("active");
    const password = document.querySelector(".div-parent-change-password-user");
    password?.classList.remove("active");
    const bill = document.querySelector(".div-parent-bill-user");
    bill?.classList.remove("active");
    const history = document.querySelector(".div-parent-history-user");
    history?.classList.remove("active");
    const address = document.querySelector(".div-parent-change-address-user");
    address?.classList.add("active");
  }

  function clickToSelectChangePassword(e) {
    const optionActive = document.querySelector(".option-file.active");
    optionActive?.classList.remove("active");
    const profileRemove = document.querySelector(".profile-title.active");
    profileRemove?.classList.remove("active");
    const profileActive = document.querySelectorAll(".profile-title");
    profileActive[0]?.classList.add("active");
    const elementTarget = e.target;
    elementTarget?.classList.add("active");
    const info = document.querySelector(".div-parent-change-info-user");
    info?.classList.remove("active");
    const address = document.querySelector(".div-parent-change-address-user");
    address?.classList.remove("active");
    const bill = document.querySelector(".div-parent-bill-user");
    bill?.classList.remove("active");
    const history = document.querySelector(".div-parent-history-user");
    history?.classList.remove("active");
    const password = document.querySelector(".div-parent-change-password-user");
    password?.classList.add("active");
  }

  function handleClickToSelectBill(e) {
    const profileRemove = document.querySelector(".profile-title.active");
    profileRemove?.classList.remove("active");
    const profileOption = document.querySelector(".option-profile");
    profileOption.style.display = "none";
    const elementTarget = e.target;
    elementTarget?.classList.add("active");
    const info = document.querySelector(".div-parent-change-info-user");
    info?.classList.remove("active");
    const address = document.querySelector(".div-parent-change-address-user");
    address?.classList.remove("active");
    const history = document.querySelector(".div-parent-history-user");
    history?.classList.remove("active");
    const password = document.querySelector(".div-parent-change-password-user");
    password?.classList.remove("active");
    const bill = document.querySelector(".div-parent-bill-user");
    bill?.classList.add("active");
  }

  function handleClickToSelectHistory(e) {
    const profileRemove = document.querySelector(".profile-title.active");
    profileRemove?.classList.remove("active");
    const elementTarget = e.target;
    elementTarget?.classList.add("active");
    const profileOption = document.querySelector(".option-profile");
    profileOption.style.display = "none";
    const info = document.querySelector(".div-parent-change-info-user");
    info?.classList.remove("active");
    const address = document.querySelector(".div-parent-change-address-user");
    address?.classList.remove("active");
    const password = document.querySelector(".div-parent-change-password-user");
    password?.classList.remove("active");
    const bill = document.querySelector(".div-parent-bill-user");
    bill?.classList.remove("active");
    const history = document.querySelector(".div-parent-history-user");
    history?.classList.add("active");
  }

  return (
    <body className="Body-dashboard">
      <div className="grid-dashboard">
        <Row className="grid-dashboard-Row" gutter={[16, 8]}>
          <Col className="dashboard-left" xxl={5} xl={5} lg={5} md={5} sm={5}>
            <div className="avatar-userName">
              <div className="avatar">
                <img className="avatar-img" src={infoUser.avatar} alt="" />
              </div>
              <div className="block-userName">
                <span className="userName-dashboard">{infoUser.loginName}</span>
              </div>
            </div>
            <div className="feature-userName">
              <div className="profile-userName">
                <div
                  className="block-profile-userName"
                  onClick={handleClickToSelectProfileAccount}
                >
                  <FontAwesomeIcon
                    className="profile-title-icon"
                    icon={faUserTie}
                  />
                  <span className="profile-title active">
                    Tài Khoản Của Tôi
                  </span>
                </div>
                <div className="option-profile">
                  <div>
                    <span
                      className="option-file active"
                      onClick={clickToSelectProfile}
                    >
                      Hồ Sơ
                    </span>
                  </div>
                  <div>
                    <span
                      className="option-file"
                      onClick={clickToSelectAddress}
                    >
                      Địa Chỉ
                    </span>
                  </div>
                  <div>
                    <span
                      className="option-file"
                      onClick={clickToSelectChangePassword}
                    >
                      Đổi Mật Khẩu
                    </span>
                  </div>
                </div>
              </div>
              <div className="block-user-Bills">
                <FontAwesomeIcon
                  className="profile-title-icon"
                  icon={faFileInvoiceDollar}
                />
                <span
                  className="profile-title"
                  onClick={handleClickToSelectBill}
                >
                  Đơn Mua
                  <span>({bills.length})</span>
                </span>
              </div>
              <div className="block-notification-user">
                <FontAwesomeIcon className="profile-title-icon" icon={faBell} />
                <span className="profile-title">Thông Báo(0)</span>
              </div>
              <div className="block-history-pay">
                <FontAwesomeIcon
                  className="profile-title-icon"
                  icon={faClipboardCheck}
                />
                <span
                  className="profile-title"
                  onClick={handleClickToSelectHistory}
                >
                  Lịch Sử Mua Hàng({stories.length})
                </span>
              </div>
              <div className="block-logout">
                <FontAwesomeIcon
                  className="profile-title-icon logout-profile"
                  icon={faSignOutAlt}
                />
                <button
                  id="btn-lognout"
                  className="btn-logout"
                  onClick={handleClickToLogout}
                >
                  Đăng Xuất
                </button>
              </div>
            </div>
          </Col>
          <Col
            className="dashboard-right"
            xxl={19}
            xl={19}
            lg={19}
            md={19}
            sm={19}
          >
            {/* hố sơ */}
            <div className="div-parent-change-info-user active">
              <div className="dashboard-right-top">
                <h3 className="dashboard-right-top-title">Hồ Sơ Của Tôi</h3>
                <span className="dashboard-right-top-content">
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </span>
              </div>
              <Row className="div-children-change-info-user" gutter={[8, 8]}>
                <Col xxl={18} xl={18} lg={18} md={18} sm={18}>
                  <table className="table-left-dashboard">
                    <tr className="tr-dashboard-info">
                      <td className="td-dashboard-info">Tên Đăng Nhập</td>
                      <td className="td-info-user">{infoUser.loginName}</td>
                    </tr>
                    <tr className="tr-dashboard-info">
                      <td className="td-dashboard-info">Tên</td>
                      <td className="td-info-user">
                        <input
                          className="input-info-user"
                          type="text"
                          value={infoUser.name}
                          onChange={handleChangeName}
                          placeholder="Họ tên"
                        />
                      </td>
                    </tr>
                    <tr className="tr-dashboard-info">
                      <td className="td-dashboard-info">Biệt Danh</td>
                      <td className="td-info-user">
                        <input
                          className="input-info-user"
                          type="text"
                          value={infoUser.nickName}
                          placeholder="Biệt Danh"
                          onChange={handleChangeNickName}
                        />
                      </td>
                    </tr>
                    <tr className="tr-dashboard-info">
                      <td className="td-dashboard-info">Email</td>
                      <td className="td-info-user">
                        <input
                          id="email"
                          className="input-info-user"
                          type="email"
                          value={infoUser.email}
                          placeholder="Email"
                          onChange={handleChangeEmail}
                          disabled
                        />
                        <small>Error message</small>
                        <button className="btn-fix" onClick={handleClickToFix}>
                          Sửa
                        </button>
                        <button
                          className="btn-save"
                          onClick={handleClickToSave}
                        >
                          Lưu
                        </button>
                      </td>
                    </tr>
                    <tr className="tr-dashboard-info">
                      <td className="td-dashboard-info">Số Điện Thoại</td>
                      <td className="td-info-user">
                        <input
                          id="phoneNumber"
                          className="input-info-user"
                          type="text"
                          value={infoUser.phoneNumber}
                          placeholder="Số điện thoại"
                          onChange={handleChangePhone}
                          disabled
                        />
                        <small>Error message</small>
                        <button className="btn-fix" onClick={handleClickToFix}>
                          Sửa
                        </button>
                        <button
                          className="btn-save"
                          onClick={handleClickToSave}
                        >
                          Lưu
                        </button>
                      </td>
                    </tr>
                    <tr className="tr-dashboard-info">
                      <td className="td-dashboard-info">Giới Tính</td>
                      <td className="td-info-user">
                        <button
                          className={
                            infoUser.gender === "Nam"
                              ? "option-gender active"
                              : "option-gender"
                          }
                        >
                          Nam
                          <input
                            className="select-gender"
                            type="radio"
                            value="Nam"
                            name="noinhanhang"
                            id="gender-nam"
                            checked={infoUser.gender === "Nam" ? true : false}
                            onClick={handleClickSelectGender}
                          />
                        </button>
                        <button
                          className={
                            infoUser.gender === "Nu"
                              ? "option-gender active"
                              : "option-gender"
                          }
                        >
                          Nữ
                          <input
                            className="select-gender"
                            type="radio"
                            name="noinhanhang"
                            value="Nu"
                            id="gender-nu"
                            checked={infoUser.gender === "Nu" ? true : false}
                            onClick={handleClickSelectGender}
                          />
                        </button>
                        <button
                          className={
                            infoUser.gender === "khac"
                              ? "option-gender active"
                              : "option-gender"
                          }
                        >
                          Khác
                          <input
                            className="select-gender"
                            type="radio"
                            name="noinhanhang"
                            value="khac"
                            id="gender-khac"
                            checked={infoUser.gender === "khac" ? true : false}
                            onClick={handleClickSelectGender}
                          />
                        </button>
                      </td>
                    </tr>
                    <tr className="tr-dashboard-info">
                      <td className="td-dashboard-info">Ngày Sinh</td>
                      <td>
                        <td className="td-birthDay">
                          <button onClick={handleShowSelectBirthday}>
                            {infoUser.birthDay.day
                              ? infoUser.birthDay.day
                              : "Ngày"}
                          </button>
                          <tr className="tr-birthday">
                            <li onClick={handleClickToSelectDay} value="1">
                              01
                            </li>
                            <li onClick={handleClickToSelectDay} value="2">
                              02
                            </li>
                            <li onClick={handleClickToSelectDay} value="3">
                              03
                            </li>
                            <li onClick={handleClickToSelectDay} value="4">
                              04
                            </li>
                            <li onClick={handleClickToSelectDay} value="5">
                              05
                            </li>
                            <li onClick={handleClickToSelectDay} value="6">
                              06
                            </li>
                            <li onClick={handleClickToSelectDay} value="7">
                              07
                            </li>
                            <li onClick={handleClickToSelectDay} value="8">
                              08
                            </li>
                            <li onClick={handleClickToSelectDay} value="9">
                              09
                            </li>
                            <li onClick={handleClickToSelectDay} value="10">
                              10
                            </li>
                            <li onClick={handleClickToSelectDay} value="11">
                              11
                            </li>
                            <li onClick={handleClickToSelectDay} value="12">
                              12
                            </li>
                            <li onClick={handleClickToSelectDay} value="13">
                              13
                            </li>
                            <li onClick={handleClickToSelectDay} value="14">
                              14
                            </li>
                            <li onClick={handleClickToSelectDay} value="15">
                              15
                            </li>
                            <li onClick={handleClickToSelectDay} value="16">
                              16
                            </li>
                            <li onClick={handleClickToSelectDay} value="17">
                              17
                            </li>
                            <li onClick={handleClickToSelectDay} value="18">
                              18
                            </li>
                            <li onClick={handleClickToSelectDay} value="19">
                              19
                            </li>
                            <li onClick={handleClickToSelectDay} value="20">
                              20
                            </li>
                            <li onClick={handleClickToSelectDay} value="21">
                              21
                            </li>
                            <li onClick={handleClickToSelectDay} value="22">
                              22
                            </li>
                            <li onClick={handleClickToSelectDay} value="23">
                              23
                            </li>
                            <li onClick={handleClickToSelectDay} value="24">
                              24
                            </li>
                            <li onClick={handleClickToSelectDay} value="25">
                              25
                            </li>
                            <li onClick={handleClickToSelectDay} value="26">
                              26
                            </li>
                            <li onClick={handleClickToSelectDay} value="27">
                              27
                            </li>
                            <li onClick={handleClickToSelectDay} value="28">
                              28
                            </li>
                            <li onClick={handleClickToSelectDay} value="29">
                              29
                            </li>
                            <li onClick={handleClickToSelectDay} value="30">
                              30
                            </li>
                            <li onClick={handleClickToSelectDay} value="31">
                              31
                            </li>
                          </tr>
                        </td>
                        <td className="td-birthDay">
                          <button onClick={handleShowSelectBirthday}>
                            {infoUser.birthDay.month
                              ? infoUser.birthDay.month
                              : "Tháng"}
                          </button>
                          <tr className="tr-birthday">
                            <li onClick={handleClickToSelectMonth} value="1">
                              01
                            </li>
                            <li onClick={handleClickToSelectMonth} value="2">
                              02
                            </li>
                            <li onClick={handleClickToSelectMonth} value="3">
                              03
                            </li>
                            <li onClick={handleClickToSelectMonth} value="4">
                              04
                            </li>
                            <li onClick={handleClickToSelectMonth} value="5">
                              05
                            </li>
                            <li onClick={handleClickToSelectMonth} value="6">
                              06
                            </li>
                            <li onClick={handleClickToSelectMonth} value="7">
                              07
                            </li>
                            <li onClick={handleClickToSelectMonth} value="8">
                              08
                            </li>
                            <li onClick={handleClickToSelectMonth} value="9">
                              09
                            </li>
                            <li onClick={handleClickToSelectMonth} value="10">
                              10
                            </li>
                            <li onClick={handleClickToSelectMonth} value="11">
                              11
                            </li>
                            <li onClick={handleClickToSelectMonth} value="12">
                              12
                            </li>
                          </tr>
                        </td>
                        <td className="td-birthDay">
                          <button onClick={handleShowSelectBirthday}>
                            {infoUser.birthDay.year
                              ? infoUser.birthDay.year
                              : "Năm"}
                          </button>
                          <tr className="tr-birthday">
                            <li onClick={handleClickToSelectYear} value="2021">
                              2021
                            </li>

                            <li onClick={handleClickToSelectYear} value="2020">
                              2020
                            </li>

                            <li onClick={handleClickToSelectYear} value="2019">
                              2019
                            </li>

                            <li onClick={handleClickToSelectYear} value="2018">
                              2018
                            </li>

                            <li onClick={handleClickToSelectYear} value="2017">
                              2017
                            </li>

                            <li onClick={handleClickToSelectYear} value="2016">
                              2016
                            </li>

                            <li onClick={handleClickToSelectYear} value="2015">
                              2015
                            </li>

                            <li onClick={handleClickToSelectYear} value="2014">
                              2014
                            </li>

                            <li onClick={handleClickToSelectYear} value="2013">
                              2013
                            </li>

                            <li onClick={handleClickToSelectYear} value="2012">
                              2012
                            </li>

                            <li onClick={handleClickToSelectYear} value="2011">
                              2011
                            </li>

                            <li onClick={handleClickToSelectYear} value="2010">
                              2010
                            </li>

                            <li onClick={handleClickToSelectYear} value="2009">
                              2009
                            </li>

                            <li onClick={handleClickToSelectYear} value="2008">
                              2008
                            </li>

                            <li onClick={handleClickToSelectYear} value="2007">
                              2007
                            </li>

                            <li onClick={handleClickToSelectYear} value="2006">
                              2006
                            </li>

                            <li onClick={handleClickToSelectYear} value="2005">
                              2005
                            </li>

                            <li onClick={handleClickToSelectYear} value="2004">
                              2004
                            </li>

                            <li onClick={handleClickToSelectYear} value="2003">
                              2003
                            </li>

                            <li onClick={handleClickToSelectYear} value="2002">
                              2002
                            </li>

                            <li onClick={handleClickToSelectYear} value="2001">
                              2001
                            </li>

                            <li onClick={handleClickToSelectYear} value="2000">
                              2000
                            </li>

                            <li onClick={handleClickToSelectYear} value="1999">
                              1999
                            </li>

                            <li onClick={handleClickToSelectYear} value="1998">
                              1998
                            </li>

                            <li onClick={handleClickToSelectYear} value="1997">
                              1997
                            </li>
                            <li onClick={handleClickToSelectYear} value="1996">
                              1996
                            </li>
                            <li onClick={handleClickToSelectYear} value="1995">
                              1995
                            </li>

                            <li onClick={handleClickToSelectYear} value="1994">
                              1994
                            </li>

                            <li onClick={handleClickToSelectYear} value="1993">
                              1993
                            </li>

                            <li onClick={handleClickToSelectYear} value="1992">
                              1992
                            </li>

                            <li onClick={handleClickToSelectYear} value="1991">
                              1991
                            </li>

                            <li onClick={handleClickToSelectYear} value="1990">
                              1990
                            </li>

                            <li onClick={handleClickToSelectYear} value="1989">
                              1989
                            </li>

                            <li onClick={handleClickToSelectYear} value="1988">
                              1988
                            </li>

                            <li onClick={handleClickToSelectYear} value="1987">
                              1987
                            </li>

                            <li onClick={handleClickToSelectYear} value="1986">
                              1986
                            </li>

                            <li onClick={handleClickToSelectYear} value="1985">
                              1985
                            </li>

                            <li onClick={handleClickToSelectYear} value="1984">
                              1984
                            </li>

                            <li onClick={handleClickToSelectYear} value="1983">
                              1983
                            </li>

                            <li onClick={handleClickToSelectYear} value="1982">
                              1982
                            </li>

                            <li onClick={handleClickToSelectYear} value="1981">
                              1981
                            </li>

                            <li onClick={handleClickToSelectYear} value="1980">
                              1980
                            </li>

                            <li onClick={handleClickToSelectYear} value="1979">
                              1979
                            </li>

                            <li onClick={handleClickToSelectYear} value="1978">
                              1978
                            </li>

                            <li onClick={handleClickToSelectYear} value="1977">
                              1977
                            </li>

                            <li onClick={handleClickToSelectYear} value="1976">
                              1976
                            </li>

                            <li onClick={handleClickToSelectYear} value="1975">
                              1975
                            </li>

                            <li onClick={handleClickToSelectYear} value="1974">
                              1974
                            </li>

                            <li onClick={handleClickToSelectYear} value="1973">
                              1973
                            </li>

                            <li onClick={handleClickToSelectYear} value="1972">
                              1972
                            </li>

                            <li onClick={handleClickToSelectYear} value="1971">
                              1971
                            </li>

                            <li onClick={handleClickToSelectYear} value="1970">
                              1970
                            </li>

                            <li onClick={handleClickToSelectYear} value="1969">
                              1969
                            </li>

                            <li onClick={handleClickToSelectYear} value="1968">
                              1968
                            </li>

                            <li onClick={handleClickToSelectYear} value="1967">
                              1967
                            </li>

                            <li onClick={handleClickToSelectYear} value="1966">
                              1966
                            </li>

                            <li onClick={handleClickToSelectYear} value="1965">
                              1965
                            </li>

                            <li onClick={handleClickToSelectYear} value="1964">
                              1964
                            </li>

                            <li onClick={handleClickToSelectYear} value="1963">
                              1963
                            </li>

                            <li onClick={handleClickToSelectYear} value="1962">
                              1962
                            </li>

                            <li onClick={handleClickToSelectYear} value="1961">
                              1961
                            </li>

                            <li onClick={handleClickToSelectYear} value="1960">
                              1960
                            </li>

                            <li onClick={handleClickToSelectYear} value="1959">
                              1959
                            </li>

                            <li onClick={handleClickToSelectYear} value="1958">
                              1958
                            </li>

                            <li onClick={handleClickToSelectYear} value="1957">
                              1957
                            </li>

                            <li onClick={handleClickToSelectYear} value="1956">
                              1956
                            </li>

                            <li onClick={handleClickToSelectYear} value="1955">
                              1955
                            </li>

                            <li onClick={handleClickToSelectYear} value="1954">
                              1954
                            </li>

                            <li onClick={handleClickToSelectYear} value="1953">
                              1953
                            </li>

                            <li onClick={handleClickToSelectYear} value="1952">
                              1952
                            </li>

                            <li onClick={handleClickToSelectYear} value="1951">
                              1951
                            </li>

                            <li onClick={handleClickToSelectYear} value="1950">
                              1950
                            </li>

                            <li onClick={handleClickToSelectYear} value="1949">
                              1949
                            </li>

                            <li onClick={handleClickToSelectYear} value="1948">
                              1948
                            </li>

                            <li onClick={handleClickToSelectYear} value="1947">
                              1947
                            </li>

                            <li onClick={handleClickToSelectYear} value="1946">
                              1946
                            </li>

                            <li onClick={handleClickToSelectYear} value="1945">
                              1945
                            </li>

                            <li onClick={handleClickToSelectYear} value="1944">
                              1944
                            </li>

                            <li onClick={handleClickToSelectYear} value="1943">
                              1943
                            </li>

                            <li onClick={handleClickToSelectYear} value="1942">
                              1942
                            </li>

                            <li onClick={handleClickToSelectYear} value="1941">
                              1941
                            </li>

                            <li onClick={handleClickToSelectYear} value="1940">
                              1940
                            </li>

                            <li onClick={handleClickToSelectYear} value="1939">
                              1939
                            </li>

                            <li onClick={handleClickToSelectYear} value="1938">
                              1938
                            </li>

                            <li onClick={handleClickToSelectYear} value="1937">
                              1937
                            </li>

                            <li onClick={handleClickToSelectYear} value="1936">
                              1936
                            </li>

                            <li onClick={handleClickToSelectYear} value="1935">
                              1935
                            </li>

                            <li onClick={handleClickToSelectYear} value="1934">
                              1934
                            </li>

                            <li onClick={handleClickToSelectYear} value="1933">
                              1933
                            </li>

                            <li onClick={handleClickToSelectYear} value="1932">
                              1932
                            </li>

                            <li onClick={handleClickToSelectYear} value="1931">
                              1931
                            </li>

                            <li onClick={handleClickToSelectYear} value="1930">
                              1930
                            </li>

                            <li onClick={handleClickToSelectYear} value="1929">
                              1929
                            </li>

                            <li onClick={handleClickToSelectYear} value="1928">
                              1928
                            </li>

                            <li onClick={handleClickToSelectYear} value="1927">
                              1927
                            </li>

                            <li onClick={handleClickToSelectYear} value="1926">
                              1926
                            </li>

                            <li onClick={handleClickToSelectYear} value="1925">
                              1925
                            </li>

                            <li onClick={handleClickToSelectYear} value="1924">
                              1924
                            </li>

                            <li onClick={handleClickToSelectYear} value="1923">
                              1923
                            </li>

                            <li onClick={handleClickToSelectYear} value="1922">
                              1922
                            </li>

                            <li onClick={handleClickToSelectYear} value="1921">
                              1921
                            </li>

                            <li onClick={handleClickToSelectYear} value="1920">
                              1920
                            </li>

                            <li onClick={handleClickToSelectYear} value="1919">
                              1919
                            </li>

                            <li onClick={handleClickToSelectYear} value="1918">
                              1918
                            </li>

                            <li onClick={handleClickToSelectYear} value="1917">
                              1917
                            </li>

                            <li onClick={handleClickToSelectYear} value="1916">
                              1916
                            </li>

                            <li onClick={handleClickToSelectYear} value="1915">
                              1915
                            </li>

                            <li onClick={handleClickToSelectYear} value="1914">
                              1914
                            </li>

                            <li onClick={handleClickToSelectYear} value="1913">
                              1913
                            </li>

                            <li onClick={handleClickToSelectYear} value="1912">
                              1912
                            </li>

                            <li onClick={handleClickToSelectYear} value="1911">
                              1911
                            </li>

                            <li onClick={handleClickToSelectYear} value="1910">
                              1910
                            </li>

                            <li onClick={handleClickToSelectYear} value="1909">
                              1909
                            </li>

                            <li onClick={handleClickToSelectYear} value="1908">
                              1908
                            </li>

                            <li onClick={handleClickToSelectYear} value="1907">
                              1907
                            </li>

                            <li onClick={handleClickToSelectYear} value="1906">
                              1906
                            </li>

                            <li onClick={handleClickToSelectYear} value="1905">
                              1905
                            </li>

                            <li onClick={handleClickToSelectYear} value="1904">
                              1904
                            </li>

                            <li onClick={handleClickToSelectYear} value="1903">
                              1903
                            </li>

                            <li onClick={handleClickToSelectYear} value="1902">
                              1902
                            </li>

                            <li onClick={handleClickToSelectYear} value="1901">
                              1901
                            </li>

                            <li onClick={handleClickToSelectYear} value="1900">
                              1900
                            </li>
                          </tr>
                        </td>
                      </td>
                    </tr>
                  </table>
                  <div className="message-for-user-when-change-info">
                    <span className="message-for-user-when-change-info-succes">
                      Bạn đã cập nhật thông tin thành công
                    </span>
                    <span className="message-for-user-when-change-info-failed">
                      Hãy hoàn thành nhập thông tin!
                    </span>
                  </div>
                </Col>
                <Col xxl={6} xl={6} lg={6} md={6} sm={16}>
                  <div className="block-rigth-userInfo">
                    <button
                      className="btn-save-all-change-info"
                      onClick={handleClickToSaveAllChangeInfo}
                    >
                      SAVE
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
            {/* địa chỉ */}
            <RenderFormAddAddress />
            {/* mật khẩu */}
            <RenderChangePassword />
            {/* bill */}
            <BillOFUser bills={bills} />
            {/* history bill */}
            <HistoryBill />
          </Col>
        </Row>
      </div>
    </body>
  );
}

export default RenderDashBoard;
