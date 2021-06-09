import React from "react";
import PropTypes from "prop-types";
import "./userItem.scss";
import { Link } from "react-router-dom";

UserItemSelect.propTypes = {
  userUrlAvt: PropTypes.string,
  userName: PropTypes.string,
};

UserItemSelect.defaultProps = {
  userUrlAvt: "",
  userName: "",
};

function UserItemSelect(props) {
  // const { userUrlAvt, userName, userId } = props;
  const userUrlAvt = true;
  const userName = "Thạc Hưng Nguyễn hello anh em nhé";

  return userUrlAvt && userName ? (
    <Link className="Menu-list_item_link" to="/feature/userpage">
      <div className="user-profile">
        <div className="user-profile_left">
          <img className="user-profile_avt" src={userUrlAvt} alt="" />
        </div>
        <div className="user-profile_right">
          <span className="user-profile_Name first9 after9">{userName}</span>
        </div>
      </div>
    </Link>
  ) : (
    <Link className="Menu-list_item_link" to="/feature/login">
      <span className="Menu-list_item_content first after">Đăng Nhập</span>
    </Link>
  );
}

export default UserItemSelect;
