import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import accountApi from "../../../../api/accountApi";
import InputField from "../../../../components share/form-control/inputField";
import "./style.scss";

RenderFormForgotPassword.propTypes = {
  changeToLogin: PropTypes.func,
  changeToSignUp: PropTypes.func,
  openModal: PropTypes.func,
};

RenderFormForgotPassword.defaultProps = {
  changeToLogin: function () {},
  changeToSignUp: function () {},
  openModal: function () {},
};

function RenderFormForgotPassword(props) {
  const { changeToLogin, changeToSignUp, openModal } = props;
  const [wrongLoginName, setWrongLoginName] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);

  const schema = yup.object().shape({
    loginName: yup.string().required("Tên đăng nhập không thể bỏ trống."),
    email: yup
      .string()
      .required("Email không thể bỏ trống.")
      .email("Không đúng định dạng email."),
  });

  const form = useForm({
    defaultValues: {
      loginName: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    formState: { errors },
    reset,
  } = form;

  const handleSubmit = async (values) => {
    let elementForgotLoginName = document.querySelector("#forgotLoginName");
    let elementForgotEmail = document.querySelector("#fotgotEmail");
    let elementFailed = document.querySelector(
      ".notification__failedForgotPassword"
    );
    try {
      const { loginName, email } = values;
      const response = await accountApi.PostForgotPassword(loginName, email);
      const { status, code, mess } = response;
      if (status === 200) {
        reset();
        setWrongLoginName(false);
        setWrongEmail(false);
        if (!openModal) return;
        openModal();
      } else if (status === 400) {
        if (code === 303) {
          handleSetError(elementForgotLoginName, mess);
          setWrongLoginName(true);
          setWrongEmail(true);
        } else if (code === 304) {
          handleSetError(elementForgotEmail, mess);
          setWrongLoginName(false);
          setWrongEmail(true);
        } else if (code === 305) {
          elementFailed.style.display = "block";
        }
      }
    } catch (error) {
      console.log(error.message);
      elementFailed.style.display = "block";
    }
  };

  function handleSetError(param, mess) {
    let formControl = param.parentElement;
    formControl.className = "form__parent error";
    let small = formControl.querySelector("small");
    small.innerText = mess;
    small.style.display = "block";
  }

  const handleChangeToSignUp = () => {
    if (!changeToSignUp) return;
    changeToSignUp();
    let elementSucces = document.querySelector(
      ".notification__successForgotPassword"
    );
    elementSucces.style.display = "none";
    let elementFailed = document.querySelector(
      ".notification__failedForgotPassword"
    );
    elementFailed.style.display = "none";
  };

  const handleChangeToLogin = () => {
    if (!changeToLogin) return;
    changeToLogin();
    let elementSucces = document.querySelector(
      ".notification__successForgotPassword"
    );
    elementSucces.style.display = "none";
    let elementFailed = document.querySelector(
      ".notification__failedForgotPassword"
    );
    elementFailed.style.display = "none";
  };

  const listenChangeformState = () => {
    setWrongLoginName(false);
    setWrongEmail(false);
  };
  return (
    <div className="form-login-children">
      <div className="form-login_title">
        <span>Lấy Lại Mật Khẩu</span>
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
            placeholder="Tên tài khoản"
            form={form}
            id="forgotLoginName"
            listenChangeformState={listenChangeformState}
          />
          <small>{errors.loginName?.message}</small>
        </div>

        <div
          className={
            errors.email || wrongEmail ? "form__parent error" : "form__parent"
          }
        >
          <InputField
            name="email"
            placeholder="Email"
            id="fotgotEmail"
            form={form}
            listenChangeformState={listenChangeformState}
          />
          <small>{errors.email?.message}</small>
        </div>
        <div className="notification__successForgotPassword">
          Thành công, vui lòng kiểm tra Email của bạn!
        </div>
        <div className="notification__failedForgotPassword">
          Thất bại, một lỗi đã xảy ra!
        </div>
        <button
          className="block-input"
          onClick={form.handleSubmit(handleSubmit)}
        >
          Gửi Yêu Cầu
        </button>
      </form>
      <div className="question-in-login">
        <span onClick={handleChangeToSignUp}>Đăng Ký?</span>
        <span onClick={handleChangeToLogin}>Đăng Nhập?</span>
      </div>
    </div>
  );
}

export default RenderFormForgotPassword;
