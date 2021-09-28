import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import accountApi from "../../../../api/accountApi";
import InputField from "../../../../components share/form-control/inputField";
import "./style.scss";

RenderFormSignUp.propTypes = {
  changeToLogin: PropTypes.func,
  changeToForgetPassword: PropTypes.func,
};

RenderFormSignUp.defaultProps = {
  changeToLogin: null,
  changeToForgetPassword: null,
};

function RenderFormSignUp(props) {
  const [wrongLoginName, setWrongLoginName] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPhoneNumber, setWrongPhoneNumber] = useState(false);
  const { changeToLogin, changeToForgetPassword } = props;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    loginName: yup.string().required("Tên đăng nhập không thể bỏ trống."),
    email: yup
      .string()
      .required("Email không thể bỏ trống.")
      .email("Không đúng định dạng email."),
    phoneNumber: yup
      .string()
      .required("Số điện thoại không thể bỏ trống.")
      .matches(phoneRegExp, "Không đúng định dạng số điện thoại.")
      .min(10, "Không đúng định dạng số điện thoại.")
      .max(11, "Không đúng định dạng số điện thoại."),
    password: yup.string().required("Mật khẩu không thể bỏ trống."),
    retypePassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu.")
      .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp."),
  });

  const form = useForm({
    defaultValues: {
      loginName: "",
      email: "",
      password: "",
      phoneNumber: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    formState: { errors },
    reset,
  } = form;

  const handleSubmit = async (values) => {
    let elementLoginName = document.querySelector("#loginNameSignup");
    let elementEmail = document.querySelector("#emailSignup");
    let elementPhoneNumber = document.querySelector("#phoneNumberSignup");
    let elementSucces = document.querySelector(".notification__successSignUp");
    let elementFailed = document.querySelector(".notification__failedSignUp");

    try {
      const { loginName, email, phoneNumber, password } = values;
      const response = await accountApi.PostSignUp(
        loginName,
        email,
        phoneNumber,
        password
      );
      const { mess, code, status } = response;
      if (status === 200) {
        reset();
        setWrongPhoneNumber(false);
        setWrongLoginName(false);
        setWrongEmail(false);
        elementSucces.style.display = "block";
      } else if (status === 400) {
        if (code === 300) {
          handleSetError(elementLoginName, mess);
          setWrongLoginName(true);
          setWrongEmail(false);
          setWrongPhoneNumber(false);
        } else if (code === 301) {
          handleSetError(elementEmail, mess);
          setWrongEmail(true);
          setWrongLoginName(false);
          setWrongPhoneNumber(false);
        } else if (code === 302) {
          handleSetError(elementPhoneNumber, mess);
          setWrongPhoneNumber(true);
          setWrongLoginName(false);
          setWrongEmail(false);
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

  const handleChangeToForgetPassword = () => {
    if (!changeToForgetPassword) return;
    changeToForgetPassword();
  };

  const handleChangeToLogin = () => {
    if (!changeToLogin) return;
    changeToLogin();
  };

  function listenChangeformState() {
    setWrongEmail(false);
    setWrongLoginName(false);
    setWrongPhoneNumber(false);
  }

  return (
    <div className="form-login-children">
      <div className="form-login_title">
        <span>Đăng Ký</span>
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
            id="loginNameSignup"
            form={form}
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
            id="emailSignup"
            form={form}
            listenChangeformState={listenChangeformState}
          />
          <small>{errors.email?.message}</small>
        </div>

        <div
          className={
            errors.phoneNumber || wrongPhoneNumber
              ? "form__parent error"
              : "form__parent"
          }
        >
          <InputField
            name="phoneNumber"
            placeholder="Số điện thoại"
            id="phoneNumberSignup"
            form={form}
            listenChangeformState={listenChangeformState}
          />
          <small>{errors.phoneNumber?.message}</small>
        </div>

        <div
          className={errors.password ? "form__parent error" : "form__parent"}
        >
          <InputField
            name="password"
            placeholder="Mật khẩu"
            type="password"
            form={form}
          />
          <small>{errors.password?.message}</small>
        </div>

        <div
          className={
            errors.retypePassword ? "form__parent error" : "form__parent"
          }
        >
          <InputField
            name="retypePassword"
            placeholder="Nhập lại mật khẩu"
            type="password"
            form={form}
          />
          <small>{errors.retypePassword?.message}</small>
        </div>
        <div className="notification__successSignUp">
          Tạo tài khoản thành công
        </div>
        <div className="notification__failedSignUp">
          Thất bại, một lỗi đã xảy ra
        </div>
        <button
          className="block-input"
          onClick={form.handleSubmit(handleSubmit)}
        >
          Đăng Ký
        </button>
      </form>
      <div className="question-in-login">
        <span onClick={handleChangeToForgetPassword}>Quên mật khẩu?</span>
        <span onClick={handleChangeToLogin}>Đăng Nhập?</span>
      </div>
    </div>
  );
}

export default RenderFormSignUp;
