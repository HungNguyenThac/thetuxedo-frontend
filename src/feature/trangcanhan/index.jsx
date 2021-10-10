import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setInfoUser } from "../../actions/infoUser";
import { hideLoading, showLoading } from "../../actions/loading";
import userApi from "../../api/userApi";
import { getCookie } from "../../shareFunction/checkCookies";
import RenderDashBoard from "./components/renderDashBoard";
import "./style.scss";

const checkInputUpdateInfo = () => {
  let phoneNumber = document.getElementById("phonenumber");
  let password = document.getElementById("password1");
  let password2 = document.getElementById("password2");
  let phonenumber = phoneNumber.value.trim();
  let passwordValue = password.value.trim();
  let password2Value = password2.value.trim();

  if (phonenumber === "") {
    setErrorForSignUP(phoneNumber, "Vui lòng nhập số điện thoại");
  } else if (
    phonenumber.length < 10 ||
    phonenumber.startsWith("0") === false ||
    isNaN(Number(phonenumber)) === true
  ) {
    setErrorForSignUP(phoneNumber, "không đúng định dạng số điện thoại");
  } else {
    setSuccessForSignUP(phoneNumber);
  }

  if (passwordValue === "") {
    setErrorForSignUP(password, "Vui lòng nhập mật khẩu");
  } else {
    setSuccessForSignUP(password);
  }

  if (password2Value === "") {
    setErrorForSignUP(password2, "vui lòng nhập mật khẩu");
  } else if (passwordValue !== password2Value) {
    setErrorForSignUP(password2, "Mật khẩu không trùng khớp");
  } else {
    setSuccessForSignUP(password2);
  }
};

const setErrorForSignUP = (input, message) => {
  let formControl = input.parentElement;
  let small = formControl.querySelector("small");
  formControl.className = "form-signUp-parent error";
  small.innerText = message;
  small.style.display = "block";
};

const setSuccessForSignUP = (input) => {
  let formControl = input.parentElement;
  formControl.className = "form-signUp-parent success";
};

//----------------------------------------------props
function TrangCaNhan() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const handleClickToUpdate = (e) => {
    e.preventDefault();
    checkInputUpdateInfo();
    SendRequestUpdateInfo();
  };

  const SendRequestUpdateInfo = async () => {
    let formSignup = document.querySelectorAll(".form-signUp-parent.success");
    let phoneNumber = document.getElementById("phonenumber");
    let password = document.getElementById("password1");
    let phonenumber = phoneNumber.value.trim();
    let passwordValue = password.value.trim();
    if (formSignup.length === 3) {
      try {
        let response = await userApi.postAddInfoUser(
          phonenumber,
          passwordValue
        );
        const { status, user } = response;
        if (status === 200) {
          dispatch(setInfoUser(user));
          let element = document.querySelector(".modal-moreInformation");
          element.style.display = "none";
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const cookies = getCookie("user");
    let isSubscribe = true;
    const checkCookies = async () => {
      if (cookies.length >= 1) {
        showLoading();
        try {
          const response = await userApi.postCheckInfoUser();
          const { status, code } = response;
          if (isSubscribe && status === 200 && code === 9527) {
            setShowModal(true);
            hideLoading();
          } else if (isSubscribe && status === 400) {
            history.push("/login");
            hideLoading();
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        history.push("/login");
      }
    };
    checkCookies();
    return () => (isSubscribe = false);
  }, [dispatch, history]);

  return (
    <div className="container">
      {showModal && (
        <div className="modal-moreInformation">
          <div className="modal-moreInformation_overlay">
            <div className="update-info-user">
              <div className="update-title">
                <span>Bổ Sung Thông Tin</span>
              </div>
              <form className="form-input-update" action="">
                <div className="form-signUp-parent">
                  <input
                    className="block-input"
                    id="phonenumber"
                    name="phoneNumber"
                    placeholder="Sô điện thoại"
                    type="text"
                  />
                  <small>Error message</small>
                </div>
                <div className="form-signUp-parent">
                  <input
                    className="block-input"
                    id="password1"
                    name="password1"
                    placeholder="Mật khẩu"
                    type="password"
                  />
                  <small>Error message</small>
                </div>
                <div className="form-signUp-parent">
                  <input
                    className="block-input"
                    id="password2"
                    name="password2"
                    placeholder="Xác nhận mật khẩu"
                    type="password"
                  />
                  <small>Error message</small>
                </div>
                <button className="block-input" onClick={handleClickToUpdate}>
                  Cập Nhật
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <RenderDashBoard />
    </div>
  );
}

export default TrangCaNhan;
