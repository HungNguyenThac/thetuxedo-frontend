import React, { useEffect } from "react";
import "./trangcanhan.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import RenderDashBoard from "./components/renderDashBoard";
import { useDispatch, useSelector } from "react-redux";
import { setInfoUser } from "../../actions/infoUser";
import { getCookie } from "../../shareFunction/checkCookies";
import { postBillToReducer } from "../../actions/billUser";
import { dispatchHistory } from "../../actions/history";

function checkInputUpdateInfo() {
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
}

function setErrorForSignUP(input, message) {
  let formControl = input.parentElement;
  let small = formControl.querySelector("small");
  formControl.className = "form-signUp-parent error";
  small.innerText = message;
  small.style.display = "block";
}

function setSuccessForSignUP(input) {
  let formControl = input.parentElement;
  formControl.className = "form-signUp-parent success";
}
//----------------------------------------------props
function TrangCaNhan(props) {
  const cartForUser = useSelector((state) => state.itemCart.itemCart);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleClickToUpdate(e) {
    e.preventDefault();
    checkInputUpdateInfo();
    SendRequestUpdateInfo();
  }

  const SendRequestUpdateInfo = async () => {
    let formSignup = document.querySelectorAll(".form-signUp-parent.success");
    let phoneNumber = document.getElementById("phonenumber");
    let password = document.getElementById("password1");
    let phonenumber = phoneNumber.value.trim();
    let passwordValue = password.value.trim();
    if (formSignup.length === 3) {
      try {
        const cookies = getCookie("user");
        let response = await axios({
          method: "POST",
          url: "http://localhost:9527/user/addinfor",
          headers: { Authorization: cookies },
          data: {
            phonenumber,
            passwordValue,
          },
        });
        if (response.data.status === 200) {
          dispatch(setInfoUser(response.data.data));
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
    async function checkCookies() {
      if (cookies.length !== 0) {
        try {
          let response = await axios({
            method: "POST",
            url: "http://localhost:9527/user/dashboard",
            headers: { Authorization: cookies },
          });
          let upCart = await axios({
            method: "PUT",
            url: "http://localhost:9527/user/addcart",
            headers: { Authorization: cookies },
            data: {
              cartForUser: { cartForUser },
            },
          });
          if (upCart.data.status === 200) {
            let bill = postBillToReducer(upCart.data.user.bill);
            dispatch(bill);
            let history = dispatchHistory(upCart.data.user.history);
            dispatch(history);
          }
          if (response.data.status === 200 && response.data.element === 9527) {
            let element = document.querySelector(".modal-moreInformation");
            element.style.display = "block";
          } else if (response.data.status === 400) {
            history.push("/feature/login");
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        history.push("/feature/login");
      }
    }
    checkCookies();
    return () => {
      checkCookies();
    };
  }, []);

  return (
    <div className="container">
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
      <RenderDashBoard />
    </div>
  );
}

export default TrangCaNhan;
