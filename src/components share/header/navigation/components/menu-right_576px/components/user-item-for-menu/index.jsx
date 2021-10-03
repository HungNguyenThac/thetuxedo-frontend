import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./userItem.scss";

UserItemSelect.propTypes = {
  userUrlAvt: PropTypes.string,
  userName: PropTypes.string,
};

UserItemSelect.defaultProps = {
  userUrlAvt: "",
  userName: "",
};

function UserItemSelect() {
  const infoUser = useSelector((state) => state.GetInfoUser);

  return infoUser.avatar ? (
    <Link className="Menu-list_item_link" to="/userpage">
      <div className="user-profile">
        <div className="user-profile_left">
          <img className="user-profile_avt" src={infoUser.avatar} alt="" />
        </div>
        <div className="user-profile_right">
          <span className="user-profile_Name first9 after9">
            {infoUser.loginName}
          </span>
        </div>
      </div>
    </Link>
  ) : (
    <Link className="Menu-list_item_link" to="/login">
      <FontAwesomeIcon className="mini-icon-user-not-login" icon={faUserTie} />
      <span className="Menu-list_item_content first after">Đăng Nhập</span>
    </Link>
  );
}

export default UserItemSelect;
