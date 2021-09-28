import { Col, Row } from "antd";
import React, { useEffect } from "react";
import logo from "../../assets/logo/logo1.png";
import RenderFormChangePassword from "./components/changePassword";
import RenderFormForgotPassword from "./components/renderForgotPassword";
import RenderFormSignUp from "./components/renderFormSignUp";
import RenderFormLogin from "./components/renderFromLogin";
import "./style.scss";

TrangDangNhap.propTypes = {};

function TrangDangNhap() {
  function changeToForgetPassword() {
    let elementLogin = document.querySelector(".form-login");
    elementLogin.style.display = "none";
    let elementSignUp = document.querySelector(".form-signUp");
    elementSignUp.style.display = "none";
    let elementForgetPassword = document.querySelector(".form-forgetPassword");
    elementForgetPassword.style.display = "block";
  }

  function changeToSignUp() {
    let elementLogin = document.querySelector(".form-login");
    elementLogin.style.display = "none";
    let elementForgetPassword = document.querySelector(".form-forgetPassword");
    elementForgetPassword.style.display = "none";
    let elementSignUp = document.querySelector(".form-signUp");
    elementSignUp.style.display = "block";
  }

  function changeToLogin() {
    let elementForgetPassword = document.querySelector(".form-forgetPassword");
    elementForgetPassword.style.display = "none";
    let elementSignUp = document.querySelector(".form-signUp");
    elementSignUp.style.display = "none";
    let elementLogin = document.querySelector(".form-login");
    elementLogin.style.display = "block";
  }

  function openModal() {
    let elementModal = document.querySelector(".modal-changePassword");
    elementModal.style.display = "block";
  }

  const changeModal = () => {
    let elementModal = document.querySelector(".modal-changePassword");
    elementModal.style.display = "none";
  };

  function displayNoneModel(e) {
    if (e.keyCode === 27) {
      const element = document.querySelector(".modal-changePassword");
      element.style.display = "none";
    }
  }

  useEffect(() => {
    const bodyLogin = document.querySelector(".Body-login");
    bodyLogin.addEventListener("keydown", (e) => displayNoneModel(e));
    return bodyLogin.removeEventListener("keydown", displayNoneModel);
  }, []);

  return (
    <div className="container">
      <div className="Body-login">
        <div className="grid-login">
          <Row>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <div className="login-left">
                <img className="login-left_img" src={logo} alt="" />
              </div>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <div className="login-right">
                <div className="form-login">
                  <RenderFormLogin
                    changeToForgetPassword={changeToForgetPassword}
                    changeToSignUp={changeToSignUp}
                  />
                </div>
                <div className="form-signUp">
                  <RenderFormSignUp
                    changeToForgetPassword={changeToForgetPassword}
                    changeToLogin={changeToLogin}
                  />
                </div>
                <div className="form-forgetPassword">
                  <RenderFormForgotPassword
                    changeToLogin={changeToLogin}
                    changeToSignUp={changeToSignUp}
                    openModal={openModal}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <div className="modal-changePassword">
            <div className="modal-changePassword_overlay">
              <Col
                xxl={{ span: 8, offset: 4 }}
                xl={{ span: 8, offset: 4 }}
                lg={{ span: 8, offset: 4 }}
                md={{ span: 8, offset: 4 }}
                sm={{ span: 8, offset: 4 }}
                xs={24}
              >
                <RenderFormChangePassword changeModal={changeModal} />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrangDangNhap;
