import React from "react";
import PropTypes from "prop-types";
import "./listSanpham.scss";
import { Link } from "react-router-dom";

ListSanPham.propTypes = {};

function ListSanPham(props) {
  return (
    <div className="list-sanpham">
      <ul className="list-sanpham_ul">
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/feature/vestcollection">
            <span className="list-sanpham_item_content first38 after38">
              Bộ Sưu Tập Vest
            </span>
          </Link>
        </li>
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/feature/aosomi">
            <span className="list-sanpham_item_content first38 after38">
              Áo Sơ Mi
            </span>
          </Link>
        </li>
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/feature/quanau">
            <span className="list-sanpham_item_content first38 after38">
              Quần Âu
            </span>
          </Link>
        </li>
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/feature/giaytay">
            <span className="list-sanpham_item_content first38 after38">
              Giày Tây
            </span>
          </Link>
        </li>
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/feature/phukien">
            <span className="list-sanpham_item_content first38 after38">
              Phụ Kiện
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ListSanPham;
