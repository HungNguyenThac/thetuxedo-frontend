import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import accountApi from "../../../../api/accountApi";
import InputField from "../../../../components share/form-control/inputField";
import "./style.scss";

RenderFormChangePassword.propTypes = {
  changeModal: PropTypes.func,
};

RenderFormChangePassword.defaultProps = {
  changeModal: function () {},
};

function RenderFormChangePassword(props) {
  const [wrongCodeVerify, setWrongCodeVerify] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const { changeModal } = props;

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email không thể bỏ trống.")
      .email("Không đúng định dạng email."),
    password: yup.string().required("Mật khẩu không thể bỏ trống."),
    retypePassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu.")
      .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp."),
    codeVerify: yup
      .string()
      .required("Vui lòng nhập mã xác nhận.")
      .min(8, "Mã xác nhận có 8 ký tự.")
      .max(8, "Mã xác nhận có 8 ký tự."),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      retypePassword: "",
      codeVerify: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    formState: { errors },
    reset,
  } = form;

  const handleSubmit = async (values) => {
    let elementEmail = document.querySelector("#emailChangePassword");
    let elementVerify = document.querySelector("#codeVerify");
    let elementSucces = document.querySelector(
      ".notification__successChangePassword"
    );
    let elementFailed = document.querySelector(
      ".notification__failedChangePassword"
    );
    try {
      const { email, password, codeVerify } = values;
      const response = await accountApi.PostChangePasswords(
        email,
        password,
        codeVerify
      );
      const { status, code, mess } = response;
      if (status === 200) {
        reset();
        elementSucces.style.display = "block";
        setWrongCodeVerify(false);
        setWrongEmail(false);
      }
      if (status === 400) {
        if (code === 401) {
          handleSetError(elementEmail, mess);
          setWrongCodeVerify(false);
          setWrongEmail(true);
        } else if (code === 402) {
          handleSetError(elementVerify, mess);
          setWrongCodeVerify(true);
          setWrongEmail(false);
        } else if (code === 403) {
          handleSetError(elementVerify, mess);
          setWrongCodeVerify(true);
          setWrongEmail(false);
        }
      }
    } catch (error) {
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

  function listenChangeformState() {
    setWrongCodeVerify(false);
    setWrongEmail(false);
  }

  function handleClickToCloseModalChangePassword() {
    if (!changeModal) {
      return;
    }
    reset();
    changeModal();
  }

  return (
    <div className="form-changePassword">
      <div className="form-login-children">
        <FontAwesomeIcon
          className="icon-close__model"
          icon={faTimes}
          onClick={handleClickToCloseModalChangePassword}
        />
        <div className="form-login_title">
          <span>Đổi mật khẩu</span>
          <br />
          <small className="small">Mã xác nhận đã gửi về Mail của bạn!</small>
        </div>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="form-input">
          <div
            className={
              errors.email || wrongEmail ? "form__parent error" : "form__parent"
            }
          >
            <InputField
              name="email"
              placeholder="Email của bạn"
              id="emailChangePassword"
              form={form}
            />
            <small>{errors.email?.message}</small>
          </div>

          <div
            className={errors.password ? "form__parent error" : "form__parent"}
          >
            <InputField
              name="password"
              type="password"
              placeholder="Mật khẩu mới"
              form={form}
              listenChangeformState={listenChangeformState}
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
              form={form}
              type="password"
            />
            <small>{errors.retypePassword?.message}</small>
          </div>

          <div
            className={
              errors.codeVerify || wrongCodeVerify
                ? "form__parent error"
                : "form__parent"
            }
          >
            <InputField
              name="codeVerify"
              placeholder="Mã xác thực"
              form={form}
              id="codeVerify"
              listenChangeformState={listenChangeformState}
            />
            <small>{errors.codeVerify?.message}</small>
          </div>
          <div className="notification__successChangePassword">
            Đổi mật khẩu thành công!
          </div>
          <div className="notification__failedChangePassword">
            Thất bại, một lỗi đã xảy ra!
          </div>
          <button
            className="block-input"
            onClick={form.handleSubmit(handleSubmit)}
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default RenderFormChangePassword;
