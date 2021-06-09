import React from "react";
import PropTypes from "prop-types";
import "./ulListItem.scss";
import UserItemSelect from "../user-item-for-menu";
import ListSanPham from "../listSanpham";
import { Link } from "react-router-dom";
import Search from "../../../search";

MenuList.propTypes = {};

function MenuList(props) {
  const handleClickSearch = () => {
    const search = document.querySelectorAll(".SearchForm")[1];
    console.log(19, search);
    search.classList.toggle("active");
  };
  return (
    <div className="Menu-list">
      <ul className="Menu-list_ul">
        <li className="Menu-list_item">
          <UserItemSelect />
        </li>
        <li className="Menu-list_item">
          <Link className="Menu-list_item_link" to="/">
            <span className="Menu-list_item_content first after">
              Trang Chủ
            </span>
          </Link>
        </li>
        <li className="Menu-list_item position-relative">
          <span className="Menu-list_item_content first after">Sản Phẩm</span>
          <ListSanPham />
        </li>
        <li className="Menu-list_item">
          <Link className="Menu-list_item_link" to="/feature/uudai">
            <span className="Menu-list_item_content first after">
              Giá Ưu Đãi
            </span>
          </Link>
        </li>
        <li className="Menu-list_item">
          <Link className="Menu-list_item_link" to="/feature/connectwithus">
            <span className="Menu-list_item_content first after">Liên Hệ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuList;
