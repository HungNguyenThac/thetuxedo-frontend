import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo/logo1.png";
import RenderFormChangePassword from "./components/changePassword";
import RenderFormForgotPassword from "./components/renderForgotPassword";
import RenderFormSignUp from "./components/renderFormSignUp";
import RenderFormLogin from "./components/renderFromLogin";
import "./style.scss";

TrangDangNhap.propTypes = {};

function TrangDangNhap() {
  const MODE = {
    login: "login",
    register: "register",
    forgot: "forgot",
  };

  const [mode, setMode] = useState(MODE.login);
  const [modalChangePassword, setModalChangePassword] = useState(false);
  const bodyLogin = useRef();

  const changeToForgetPassword = () => {
    setMode(MODE.forgot);
  };

  const changeToSignUp = () => {
    setMode(MODE.register);
  };

  const changeToLogin = () => {
    setMode(MODE.login);
  };

  const openModal = () => {
    setModalChangePassword(true);
  };

  const closeModal = () => {
    setModalChangePassword(false);
  };

  const displayNoneModel = (e) => {
    if (e.keyCode === 27) {
      setModalChangePassword(false);
    }
  };

  useEffect(() => {
    const bodyLoginCurrent = bodyLogin.current;
    bodyLoginCurrent.addEventListener("keydown", (e) => displayNoneModel(e));
    return bodyLoginCurrent.removeEventListener("keydown", displayNoneModel);
  }, []);

  return (
    <div className="container">
      <div className="Body-login" ref={bodyLogin}>
        <div className="grid-login">
          <Row>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <div className="login-left">
                <img className="login-left_img" src={logo} alt="" />
              </div>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <div className="login-right">
                {mode === MODE.login && (
                  <div className="form-login">
                    <RenderFormLogin
                      changeToForgetPassword={changeToForgetPassword}
                      changeToSignUp={changeToSignUp}
                    />
                  </div>
                )}
                {mode === MODE.register && (
                  <div className="form-signUp">
                    <RenderFormSignUp
                      changeToForgetPassword={changeToForgetPassword}
                      changeToLogin={changeToLogin}
                    />
                  </div>
                )}
                {mode === MODE.forgot && (
                  <div className="form-forgetPassword">
                    <RenderFormForgotPassword
                      changeToLogin={changeToLogin}
                      changeToSignUp={changeToSignUp}
                      openModal={openModal}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          {modalChangePassword && (
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
                  <RenderFormChangePassword changeModal={closeModal} />
                </Col>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrangDangNhap;
