import { Col, Row } from "antd";
import axios from "axios";
import firebase from "firebase";
import PropTypes from "prop-types";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postBillToReducer } from "../../../../actions/billUser";
import { setInfoUser } from "../../../../actions/infoUser";
import { addItemToCartFormDataUser } from "../../../../actions/itemCart";
import userApi from "../../../../api/userApi";
import logo from "../../../../assets/logo/logo1.png";
import { isEmail } from "../../../../shareFunction/isEmail";
import { setCookie } from "../../../../shareFunction/setcookies";
import "./renderFormDangNhap.scss";

RenderFormDangNhap.propTypes = {
  onSummit: PropTypes.func,
};

RenderFormDangNhap.defaultProps = {
  onSummit: null,
};

function checkInputLogIn() {
  // trim to remove the whitespaces
  let username = document.getElementById("username-login");
  let password = document.getElementById("password-login");
  let usernameValue = username.value.trim();
  let passwordValue = password.value.trim();

  if (usernameValue === "") {
    setErrorForLogIN(username, "Vui lòng nhập tên đăng nhập");
  } else {
    setSuccessForLogIN(username);
  }

  if (passwordValue === "") {
    setErrorForLogIN(password, "Vui lòng nhập mật khẩu");
  } else {
    setSuccessForLogIN(password);
  }
}

function setErrorForLogIN(input, message) {
  let formControl = input.parentElement;
  let small = formControl.querySelector("small");
  formControl.className = "form-login-parent error";
  small.innerText = message;
  small.style.display = "block";
}

function setSuccessForLogIN(input) {
  let formControl = input.parentElement;
  formControl.className = "form-login-parent success";
}

// check input forget password
function checkInputForgetPassword() {
  // trim to remove the whitespaces
  var username = document.getElementById("username-forgetPassword");
  var email = document.getElementById("Email-forgetPassword");
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();

  if (usernameValue === "") {
    setErrorForForgetPassword(username, "Vui lòng nhập tên đăng nhập");
  } else {
    setSuccessForForgetPassword(username);
  }

  if (emailValue === "") {
    setErrorForForgetPassword(email, "Vui lòng nhập Email");
  } else if (!isEmail(emailValue)) {
    setErrorForForgetPassword(email, "Không đúng định dạng Email");
  } else {
    setSuccessForForgetPassword(email);
  }
}

function setErrorForForgetPassword(input, message) {
  let formControl = input.parentElement;
  let small = formControl.querySelector("small");
  formControl.className = "form-forgetPassword-parent error";
  small.innerText = message;
  small.style.display = "block";
}

function setSuccessForForgetPassword(input) {
  let formControl = input.parentElement;
  formControl.className = "form-forgetPassword-parent success";
}

//check input signUP
function checkInputSignUP() {
  // trim to remove the whitespaces
  let username = document.getElementById("username");
  let email = document.getElementById("Email");
  let phoneNumber = document.getElementById("phonenumber");
  let password = document.getElementById("password1");
  let password2 = document.getElementById("password2");
  let usernameValue = username.value.trim();
  let emailValue = email.value.trim();
  let phonenumber = phoneNumber.value.trim();
  let passwordValue = password.value.trim();
  let password2Value = password2.value.trim();

  if (usernameValue === "") {
    setErrorForSignUP(username, "Vui lòng nhập tên đăng nhập");
  } else {
    setSuccessForSignUP(username);
  }

  if (phonenumber === "") {
    setErrorForSignUP(phoneNumber, "Vui lòng nhập số điện thoại");
  } else if (
    phonenumber.length < 10 ||
    phonenumber.length > 11 ||
    phonenumber.startsWith("0") === false ||
    isNaN(Number(phonenumber)) === true
  ) {
    setErrorForSignUP(phoneNumber, "không đúng định dạng số điện thoại");
  } else {
    setSuccessForSignUP(phoneNumber);
  }

  if (emailValue === "") {
    setErrorForSignUP(email, "Vui lòng nhập Email");
  } else if (!isEmail(emailValue)) {
    setErrorForSignUP(email, "Không đúng định dạng Email");
  } else {
    setSuccessForSignUP(email);
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

function handleChangeModalForgetPassword() {
  let elementLogin = document.querySelector(".form-login");
  elementLogin.style.display = "none";
  let elementSignUp = document.querySelector(".form-signUp");
  elementSignUp.style.display = "none";
  let elementForgetPassword = document.querySelector(".form-forgetPassword");
  elementForgetPassword.style.display = "block";
}

function handleChangeModalSignUP() {
  let elementLogin = document.querySelector(".form-login");
  elementLogin.style.display = "none";
  let elementForgetPassword = document.querySelector(".form-forgetPassword");
  elementForgetPassword.style.display = "none";
  let elementSignUp = document.querySelector(".form-signUp");
  elementSignUp.style.display = "block";
}

function handleClickToLogin() {
  let elementForgetPassword = document.querySelector(".form-forgetPassword");
  elementForgetPassword.style.display = "none";
  let elementSignUp = document.querySelector(".form-signUp");
  elementSignUp.style.display = "none";
  let elementLogin = document.querySelector(".form-login");
  elementLogin.style.display = "block";
}

//------------------------------------------function HOOK REACT------------------------------
function RenderFormDangNhap(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/feature/login",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
    }
    if (user) {
      async function createUserWGG() {
        let name = user.displayName;
        let email = user.email;
        let loginName = email.slice(0, email.lastIndexOf("@"));
        let phoneNumber = user.phoneNumber;
        let avatar = user.photoURL;
        try {
          let response = await userApi.loginWithGG({
            loginName,
            name,
            email,
            phoneNumber,
            avatar,
          });
          console.log(224, response);
          if (response.status === 200) {
            setCookie("user", response.token, 1);
            dispatch(setInfoUser(response.user));
            let bill = postBillToReducer(response.user.bill);
            dispatch(bill);
            if (response.user.cart.length !== 0) {
              dispatch(addItemToCartFormDataUser(response.user.cart));
            }
            history.push("/feature/dashboard");
          } else if (response.status === 400) {
            history.push("/feature/login");
            let failed = document.querySelector(".notification-login-failed");
            failed.innerText = "Một lỗi đã xảy ra";
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      createUserWGG();
    }
  });

  //đăng nhập
  function handleClickToLogIn(e) {
    e.preventDefault();
    checkInputLogIn();
    SendRequestLogin();
  }

  const SendRequestLogin = async () => {
    let formLogin = document.querySelectorAll(".form-login-parent.success");
    let failed = document.querySelector(".notification-login-failed");
    let username = document.getElementById("username-login");
    let password = document.getElementById("password-login");
    let usernameValue = username.value.trim();
    let passwordlValue = password.value.trim();
    if (formLogin.length === 2) {
      try {
        let response = await axios.post("http://localhost:9527/user/login", {
          usernameValue,
          passwordlValue,
        });
        if (response.data.status === 200) {
          dispatch(setInfoUser(response.data.user));
          setCookie("user", response.data.token, 1);
          if (response.data.user.cart.length !== 0) {
            dispatch(addItemToCartFormDataUser(response.data.user.cart));
          }
          let bill = postBillToReducer(response.data.user.bill);
          dispatch(bill);
          history.push("/feature/dashboard");
        } else if (response.data.status === 400) {
          failed.innerText = response.data.mess;
          failed.style.display = "block";
          if (response.data.element === 305) {
            setErrorForLogIN2(username);
            setErrorForLogIN2(password);
          } else if (response.data.element === 306) {
            setErrorForLogIN2(password);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      failed.style.display = "none";
    }
  };

  function setErrorForLogIN2(param) {
    let formControl = param.parentElement;
    formControl.className = "form-login-parent error";
    let small = formControl.querySelector("small");
    small.style.display = "none";
  }

  //đăng ký
  function handleClickToSignUp(e) {
    e.preventDefault();
    checkInputSignUP();
    SendRequestSignUP();
  }
  const SendRequestSignUP = async () => {
    let formSignup = document.querySelectorAll(".form-signUp-parent.success");
    let succes = document.querySelector(".notification-signUp-succes");
    let failed = document.querySelector(".notification-signUp-failed");
    let username = document.getElementById("username");
    let email = document.getElementById("Email");
    let phoneNumber = document.getElementById("phonenumber");
    let password = document.getElementById("password1");
    let userNameValue = username.value.trim();
    let emailValue = email.value.trim();
    let phonenumber = phoneNumber.value.trim();
    let passwordValue = password.value.trim();

    if (formSignup.length === 5) {
      try {
        let response = await axios.post("http://localhost:9527/user/signup", {
          userNameValue,
          emailValue,
          phonenumber,
          passwordValue,
        });
        if (response.data.status === 200) {
          succes.innerText = response.data.mess;
          succes.style.display = "block";
          failed.style.display = "none";
        } else if (response.data.status === 400) {
          failed.innerText = response.data.mess;
          failed.style.display = "block";
          succes.style.display = "none";
          if (response.data.element === 300) {
            setErrorForSignUP2(username);
          } else if (response.data.element === 301) {
            setErrorForSignUP2(email);
          } else if (response.data.element === 302) {
            setErrorForSignUP2(phoneNumber);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      succes.style.display = "none";
      failed.style.display = "none";
    }
  };
  function setErrorForSignUP2(param) {
    let formControl = param.parentElement;
    formControl.className = "form-signUp-parent error";
    let small = formControl.querySelector("small");
    small.style.display = "none";
  }

  //lấy lại mật khẩu
  function handleClickToGetPassword(e) {
    e.preventDefault();
    checkInputForgetPassword();
    SendRequestForgetPassword();
  }
  const SendRequestForgetPassword = async () => {
    let formForget = document.querySelectorAll(
      ".form-forgetPassword-parent.success"
    );
    let succes = document.querySelector(".notification-forgetPassword-succes");
    let failed = document.querySelector(".notification-forgetPassword-failed");
    let username = document.getElementById("username-forgetPassword");
    let email = document.getElementById("Email-forgetPassword");
    let usernameValue = username.value.trim();
    let emailValue = email.value.trim();
    if (formForget.length === 2) {
      try {
        let response = await axios.post("http://localhost:9527/user/password", {
          usernameValue,
          emailValue,
        });
        if (response.data.status === 200) {
          succes.innerText = response.data.mess;
          succes.style.display = "block";
          failed.style.display = "none";
        } else if (response.data.status === 400) {
          failed.innerText = response.data.mess;
          failed.style.display = "block";
          succes.style.display = "none";
          if (response.data.element === 303) {
            setErrorForForgetPassword2(username);
            setErrorForForgetPassword2(email);
          } else if (response.data.element === 304) {
            setErrorForForgetPassword2(email);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      succes.style.display = "none";
      failed.style.display = "none";
    }
  };

  function setErrorForForgetPassword2(param) {
    let formControl = param.parentElement;
    formControl.className = "form-signUp-parent error";
    let small = formControl.querySelector("small");
    small.style.display = "none";
  }

  return (
    <body className="Body-login">
      <div className="grid-login">
        <div>
          <Row>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <div className="login-left">
                <img className="login-left_img" src={logo} alt="" />
              </div>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              {/* đăng nhập */}
              <div className="login-right">
                <div className="form-login">
                  <div className="form-login-children">
                    <div className="form-login_title">
                      <span>Đăng Nhập</span>
                    </div>
                    <form className="form-input" action="">
                      <div className="form-login-parent">
                        <input
                          className="block-input"
                          id="username-login"
                          name="userName"
                          placeholder="Tên tài khoản hoặc Email"
                          type="text"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="form-login-parent">
                        <input
                          className="block-input"
                          id="password-login"
                          name="passWord"
                          placeholder="Mật khẩu"
                          type="password"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="notification-login-failed"></div>
                      <button
                        className="block-input"
                        onClick={handleClickToLogIn}
                      >
                        Đăng Nhập
                      </button>
                    </form>
                    <div className="question-in-login">
                      <span onClick={handleChangeModalForgetPassword}>
                        Quên mật khẩu?
                      </span>
                      <span onClick={handleChangeModalSignUP}>Đăng Ký?</span>
                    </div>
                    <div className="select-login">
                      <span></span>
                      <p>HOẶC</p>
                      <span></span>
                    </div>
                    <div className="login-with">
                      <StyledFirebaseAuth
                        uiCallback={(ui) => ui.disableAutoSignIn()}
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                      />
                    </div>
                  </div>
                </div>
                {/* dang ky */}
                <div className="form-signUp">
                  <div className="form-login-children">
                    <div className="form-login_title">
                      <span>Đăng Ký</span>
                    </div>
                    <form className="form-input" action="">
                      <div className="form-signUp-parent">
                        <input
                          className="block-input"
                          id="username"
                          name="userName"
                          placeholder="Tên tài khoản"
                          type="text"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="form-signUp-parent">
                        <input
                          className="block-input"
                          id="Email"
                          name="Email"
                          placeholder="Email"
                          type="text"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="form-signUp-parent">
                        <input
                          className="block-input"
                          id="phonenumber"
                          name="userName"
                          placeholder="Số điện thoại"
                          type="text"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="form-signUp-parent">
                        <input
                          className="block-input"
                          id="password1"
                          name="passWord"
                          placeholder="Mật khẩu"
                          type="password"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="form-signUp-parent">
                        <input
                          className="block-input"
                          id="password2"
                          name="passWord"
                          placeholder="Xác nhận mật khẩu"
                          type="password"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="notification-signUp-succes"></div>
                      <div className="notification-signUp-failed"></div>
                      <button
                        className="block-input"
                        onClick={handleClickToSignUp}
                      >
                        Đăng Ký
                      </button>
                    </form>
                    <div className="question-in-singUp">
                      <span onClick={handleChangeModalForgetPassword}>
                        Quên mật khẩu?
                      </span>
                      <span onClick={handleClickToLogin}>Đăng Nhập?</span>
                    </div>
                  </div>
                </div>
                {/* quên mật khẩu */}
                <div className="form-forgetPassword">
                  <div className="form-login-children">
                    <div className="form-login_title">
                      <span>Lấy lại mật khẩu</span>
                    </div>
                    <form className="form-input" action="">
                      <div className="form-forgetPassword-parent">
                        <input
                          className="block-input"
                          id="username-forgetPassword"
                          name="userName"
                          placeholder="Tên tài khoản"
                          type="text"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="form-forgetPassword-parent">
                        <input
                          className="block-input"
                          id="Email-forgetPassword"
                          name="Email"
                          placeholder="Email"
                          type="text"
                        />
                        <small>Error message</small>
                      </div>
                      <div className="notification-forgetPassword-succes"></div>
                      <div className="notification-forgetPassword-failed"></div>
                      <button
                        className="block-input"
                        onClick={handleClickToGetPassword}
                      >
                        Lấy lại mật khẩu
                      </button>
                    </form>
                    <div className="question-in-singUp">
                      <span onClick={handleClickToLogin}>Đăng Nhập?</span>
                      <span onClick={handleChangeModalSignUP}>Đăng Ký?</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </body>
  );
}

export default RenderFormDangNhap;
