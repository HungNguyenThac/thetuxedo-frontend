import { yupResolver } from "@hookform/resolvers/yup";
import firebase from "firebase";
import PropTypes from "prop-types";
import React, { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as yup from "yup";
import { postBillToReducer } from "../../../../actions/billUser";
import { setInfoUser } from "../../../../actions/infoUser";
import { addItemToCartFormDataUser } from "../../../../actions/itemCart";
import accountApi from "../../../../api/accountApi";
import InputField from "../../../../components share/form-control/inputField";
import { setCookie } from "../../../../shareFunction/setcookies";
import "./style.scss";

RenderFormLogin.propTypes = {
  changeToForgetPassword: PropTypes.func,
  changeToSignUp: PropTypes.func,
  wrongLoginName: PropTypes.bool,
  wrongPassword: PropTypes.bool,
};

RenderFormLogin.defaultProps = {
  changeToForgetPassword: function () {},
  changeToSignUp: function () {},
  wrongLoginName: false,
  wrongPassword: false,
};

function RenderFormLogin(props) {
  const { changeToForgetPassword, changeToSignUp } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [wrongLoginName, setWrongLoginName] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/login",
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
        let failed = document.querySelector(".notification__failedLogin");

        try {
          let response = await accountApi.PostLoginWithSocialNetwork(
            loginName,
            name,
            email,
            phoneNumber,
            avatar
          );
          if (response.status === 200) {
            setCookie("user", response.token, 1);
            dispatch(setInfoUser(response.user));
            let bill = postBillToReducer(response.user.bill);
            dispatch(bill);
            if (response.user.cart.length !== 0) {
              dispatch(addItemToCartFormDataUser(response.user.cart));
            }
            history.push("/dashboard");
          } else if (response.status === 400) {
            history.push("/login");
            failed.innerText = "Thất bại, vui lòng đăng nhập lại";
          }
        } catch (error) {
          console.log(error.message);
          failed.innerText = "Thất bại, vui lòng đăng nhập lại";
        }
      }
      createUserWGG();
    }
  });

  const schema = yup.object().shape({
    loginName: yup.string().required("Tên đăng nhập không thể bỏ trống."),
    password: yup.string().required("Mật khẩu không thể bỏ trống."),
  });

  const form = useForm({
    defaultValues: {
      loginName: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    formState: { errors },
    reset,
  } = form;

  const handleSubmit = async (values) => {
    let elmentLoginName = document.querySelector("#loginName");
    let elementPassword = document.querySelector("#loginPassword");
    let elemmentFailed = document.querySelector(".notification__failedLogin");
    try {
      const { loginName, password } = values;
      const response = await accountApi.PostLogin(loginName, password);
      const { user, token, code, mess, status } = response;
      if (status === 200) {
        dispatch(setInfoUser(user));
        setCookie("user", token, 1);
        reset();
        if (user.cart.length !== 0) {
          dispatch(addItemToCartFormDataUser(user.cart));
        }
        dispatch(postBillToReducer(user.bill));
        history.push("/dashboard");
      } else if (status === 400) {
        if (code === 305) {
          handleSetError(elmentLoginName, mess);
          setWrongLoginName(true);
          setWrongPassword(true);
        } else if (code === 306) {
          handleSetError(elementPassword, mess);
          setWrongLoginName(false);
          setWrongPassword(true);
        }
      }
    } catch (error) {
      console.log(error.message);
      elemmentFailed.style.display = "block";
    }
  };

  function handleSetError(param, mess) {
    let formControl = param.parentElement;
    formControl.className = "form__parent error";
    let small = formControl.querySelector("small");
    small.innerText = mess;
    small.style.display = "block";
  }

  const handleChangeToForgetPassword = () => {
    if (!changeToForgetPassword) return;
    changeToForgetPassword();
  };

  const handleChangeToSignUp = () => {
    if (!changeToSignUp) return;
    changeToSignUp();
  };

  function listenChangeformState() {
    setWrongLoginName(false);
    setWrongPassword(false);
  }

  return (
    <div className="form-login-children">
      <div className="form-login_title">
        <span>Đăng Nhập</span>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="form-input">
        <div
          className={
            errors.loginName || wrongLoginName
              ? "form__parent error"
              : "form__parent"
          }
        >
          <InputField
            name="loginName"
            id="loginName"
            placeholder="Tên tài khoản hoặc Email"
            form={form}
            listenChangeformState={listenChangeformState}
          />
          <small>{errors.loginName?.message}</small>
        </div>
        <div
          className={
            errors.password || wrongPassword
              ? "form__parent error"
              : "form__parent"
          }
        >
          <InputField
            name="password"
            id="loginPassword"
            placeholder="Mật khẩu"
            type="password"
            form={form}
            listenChangeformState={listenChangeformState}
          />
          <small>{errors.password?.message}</small>
        </div>
        <div className="notification__failedLogin">
          Thất bại, một lỗi đã xảy ra
        </div>
        <button
          className="block-input"
          onClick={form.handleSubmit(handleSubmit)}
        >
          Đăng Nhập
        </button>
      </form>
      <div className="question-in-login">
        <span onClick={handleChangeToForgetPassword}>Quên mật khẩu?</span>
        <span onClick={handleChangeToSignUp}>Đăng Ký?</span>
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
  );
}

export default RenderFormLogin;
