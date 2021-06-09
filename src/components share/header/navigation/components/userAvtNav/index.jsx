import React from "react";
import PropTypes from "prop-types";
import "./userAvtNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
UserAvarterNavigation.propTypes = {};

function UserAvarterNavigation(props) {
  // const { avatarUser } = props;
  const avatarUser = true;
  return avatarUser ? (
    <NavLink
      exact
      className="link__right-icon"
      to="/feature/userpage"
      activeClassName="scale-avatar_when-focus"
    >
      <div className="avatar-user">
        <img
          className="avatar-user_img"
          src="https://anhdep123.com/wp-content/uploads/2021/02/hinh-nen-gai-xinh-full-hd-cho-dien-thoai.jpg"
          alt="avatar"
        />
      </div>
    </NavLink>
  ) : (
    <NavLink
      exact
      className="link__right-icon"
      to="/feature/login"
      activeClassName="first68-3 after68-3"
    >
      <span className="gach-chan_right2 first86 after86">
        <FontAwesomeIcon className="icon-navigation_scale" icon={faUserTie} />
      </span>
    </NavLink>
  );
}

export default UserAvarterNavigation;
