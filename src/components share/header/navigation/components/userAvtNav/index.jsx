import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { postBillToReducer } from "../../../../../actions/billUser";
import { dispatchHistory } from "../../../../../actions/history";
import { addItemToCartFormDataUser } from "../../../../../actions/itemCart";
import userApi from "../../../../../api/userApi";
import "./userAvtNav.scss";

function UserAvarterNavigation() {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.GetInfoUser.infoUser);

  function handleWindowScollTo() {
    window.scrollTo(0, 0);
    getDataUserForDispatch();
  }

  const getDataUserForDispatch = async () => {
    const responseDataUser = await userApi.getDataUser();
    const { status, user } = responseDataUser;
    if (status === 200) {
      dispatch(addItemToCartFormDataUser(user.cart));
      dispatch(postBillToReducer(user.bill));
      dispatch(dispatchHistory(user.history));
    }
  };

  return infoUser.avatar ? (
    <NavLink
      exact
      className="link__right-icon"
      to="/dashboard"
      activeClassName="scale-avatar_when-focus"
      onClick={handleWindowScollTo}
    >
      <div className="avatar-user">
        <img className="avatar-user_img" src={infoUser.avatar} alt="avatar" />
      </div>
    </NavLink>
  ) : (
    <NavLink
      exact
      className="link__right-icon"
      to="/login"
      activeClassName="first68-3 after68-3"
    >
      <span className="gach-chan_right2 first86 after86">
        <FontAwesomeIcon className="icon-navigation_scale" icon={faUserTie} />
      </span>
    </NavLink>
  );
}

export default UserAvarterNavigation;
