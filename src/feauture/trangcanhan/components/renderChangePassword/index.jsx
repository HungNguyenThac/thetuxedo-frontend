import React from "react";
import "./renserChangePassword.scss";
import { Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../../../../shareFunction/checkCookies";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setInfoUser } from "../../../../actions/infoUser";
import { useState } from "react";

function RenderChangePassword(props) {
  const [check, setCheck] = useState("");
  const [check1, setCheck1] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();

  function handleChangeValueInputPassword(e) {
    let value = e.target.value;
    setCheck1(value);
    setPassword(value);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForSignUP(e.target, "Vui lòng nhập mật khẩu");
    } else if (number < 6) {
      setErrorForSignUP(e.target, "Mật khẩu tối thiểu có 6 ký tự");
    } else {
      element.className = "td-password-user success";
    }
  }

  function handleChangeValueInputPassword2(e) {
    let value = e.target.value;
    setCheck1(value);
    setPassword2(value);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForSignUP(e.target, "Vui lòng nhập mật khẩu");
    } else if (number < 6) {
      setErrorForSignUP(e.target, "Mật khẩu tối thiểu có 6 ký tự");
    } else {
      element.className = "td-password-user success";
    }
  }

  function handleInputOldPassword(e) {
    let value = e.target.value;
    setCheck(value);
    setOldPassword(value);
    let element = e.target.parentElement;
    let number = value.trim().length;
    if (number === 0) {
      setErrorForSignUP(e.target, "Vui lòng nhập mật khẩu");
    } else {
      element.className = "td-password-user success";
    }
  }

  function handleClickInputToChangePassword(e) {
    let value = e.target.value;
    if (value.length === 0) {
      setErrorForSignUP(e.target, "Vui lòng nhập mật khẩu");
    }
  }

  function handleClickToResetValueInput() {
    setOldPassword("");
    setPassword("");
    setPassword2("");
  }
  function handleClickToActivePassword() {
    let elements = document.querySelectorAll(".td-password-user.error");
    checkInputSignUP();
    if (elements.length < 1) {
      if (JSON.stringify(check) !== JSON.stringify(check1)) {
        sendRequestCheckAndUpdatePassword();
      }
    }
  }

  function checkInputSignUP() {
    let oldPassword = document.getElementById("oldPassword");
    let password = document.getElementById("password");
    let password2 = document.getElementById("confirmPassword");
    let oldPasswordValue = oldPassword.value.trim();
    let passwordValue = password.value.trim();
    let password2Value = password2.value.trim();

    if (oldPasswordValue === "") {
      setErrorForSignUP(oldPassword, "Vui lòng nhập mật khẩu");
    } else {
      setSuccessForSignUP(oldPassword);
    }

    if (passwordValue === "") {
      setErrorForSignUP(password, "Vui lòng nhập mật khẩu");
    } else {
      setSuccessForSignUP(password);
    }

    if (password2Value === "") {
      setErrorForSignUP(password2, "Vui lòng nhập mật khẩu");
    } else if (passwordValue !== password2Value) {
      setErrorForSignUP(password, "");
      setErrorForSignUP(password2, "Mật khẩu không trùng khớp");
    } else {
      setSuccessForSignUP(password2);
    }
  }

  function setErrorForSignUP(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector("small");
    formControl.className = "td-password-user error";
    small.innerText = message;
    small.style.display = "block";
  }

  function setSuccessForSignUP(input) {
    let formControl = input.parentElement;
    formControl.className = "td-password-user success";
  }

  const sendRequestCheckAndUpdatePassword = async () => {
    let oldPassword = document.getElementById("oldPassword");
    let password = document.getElementById("password");
    let notification = document.querySelector(
      ".notification-for-save-password"
    );
    let oldPasswordValue = oldPassword.value.trim();
    let passwordValue = password.value.trim();
    try {
      const cookies = getCookie("user");
      let response = await axios({
        method: "PUT",
        url: "http://localhost:9527/user/changePassword",
        headers: { Authorization: cookies },
        data: {
          oldPasswordValue,
          passwordValue,
        },
      });
      console.log(112, response);
      if (response.data.status === 200) {
        notification.style.display = "block";
        dispatch(setInfoUser(response.data.user));
      } else if (response.data.status === 400) {
        notification.innerText = response.data.mess;
        notification.style.color = "red";
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
    <div className="div-parent-change-password-user">
      <div className="dashboard-right-top">
        <h3 className="dashboard-right-top-title">Mật khẩu của tôi</h3>
        <span className="dashboard-right-top-content">
          Quản lý mật khẩu giúp bạn bảo mật thông tin
        </span>
      </div>
      <Col
        className="div-children-change-password-user"
        xxl={18}
        xl={18}
        lg={18}
        md={18}
        sm={18}
      >
        <table className="table-change-password">
          <tr className="tr-change-password-info">
            <td className="td-change-password-info">Mật khẩu hiện tại:</td>
            <td className="td-password-user">
              <input
                className="input-password-user"
                type="password"
                placeholder="..."
                id="oldPassword"
                value={oldPassword}
                onChange={handleInputOldPassword}
                onClick={handleClickInputToChangePassword}
              />
              <small>Error message</small>
            </td>
          </tr>
          <tr className="tr-change-password-info">
            <td className="td-change-password-info">Mật khẩu mới:</td>
            <td className="td-password-user">
              <input
                id="password"
                className="input-password-user"
                type="password"
                value={password}
                onChange={handleChangeValueInputPassword}
                onClick={handleClickInputToChangePassword}
                placeholder="..."
              />
              <small>Error message</small>
            </td>
          </tr>
          <tr className="tr-change-password-info">
            <td className="td-change-password-info">Nhập lại mật khẩu:</td>
            <td className="td-password-user">
              <input
                id="confirmPassword"
                className="input-password-user"
                type="password"
                value={password2}
                onChange={handleChangeValueInputPassword2}
                onClick={handleClickInputToChangePassword}
                placeholder="..."
              />
              <small>Error message</small>
            </td>
          </tr>
          <tr className="tr-change-password-info">
            <td></td>
            <td className="td-to-confirm-password">
              <button
                className="btn-for-reload-all-password"
                onClick={handleClickToResetValueInput}
              >
                <FontAwesomeIcon icon={faSync} />
              </button>
              <button
                className="btn-for-accept-all-password"
                onClick={handleClickToActivePassword}
              >
                Xác nhận
              </button>
            </td>
          </tr>
        </table>
        <span className="notification-for-save-password">
          Bạn đã đổi mật khẩu thành công
        </span>
      </Col>
    </div>
  );
}

export default RenderChangePassword;
