import React from "react";
import { Link } from "react-router-dom";
import ListSanPham from "../listSanpham";
import UserItemSelect from "../user-item-for-menu";
import "./ulListItem.scss";

MenuList.propTypes = {};

function MenuList() {
  // const handleClickSearch = () => {
  //   const search = document.querySelectorAll(".SearchForm")[1];
  //   console.log(19, search);
  //   search.classList.toggle("active");
  // };
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
          <Link className="Menu-list_item_link" to="/uudai">
            <span className="Menu-list_item_content first after">
              Giá Ưu Đãi
            </span>
          </Link>
        </li>
        <li className="Menu-list_item">
          <Link className="Menu-list_item_link" to="/connectwithus">
            <span className="Menu-list_item_content first after">Liên Hệ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuList;
