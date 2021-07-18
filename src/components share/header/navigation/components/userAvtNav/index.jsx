import React from "react";
import "./userAvtNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function UserAvarterNavigation(props) {
  const { infoUser } = useSelector((state) => state.GetInfoUser);
  return infoUser.avatar ? (
    <NavLink
      exact
      className="link__right-icon"
      to="/feature/dashboard"
      activeClassName="scale-avatar_when-focus"
    >
      <div className="avatar-user">
        <img className="avatar-user_img" src={infoUser.avatar} alt="avatar" />
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
