import React from "react";
import { Link } from "react-router-dom";
import "./listSanpham.scss";

ListSanPham.propTypes = {};

function ListSanPham() {
  return (
    <div className="list-sanpham">
      <ul className="list-sanpham_ul">
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/vestcollection">
            <span className="list-sanpham_item_content first38 after38">
              Bộ Sưu Tập Vest
            </span>
          </Link>
        </li>
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/aosomi">
            <span className="list-sanpham_item_content first38 after38">
              Áo Sơ Mi
            </span>
          </Link>
        </li>
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/quanau">
            <span className="list-sanpham_item_content first38 after38">
              Quần Âu
            </span>
          </Link>
        </li>
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/giaytay">
            <span className="list-sanpham_item_content first38 after38">
              Giày Tây
            </span>
          </Link>
        </li>
        <li className="list-sanpham_item">
          <Link className="list-sanpham_item_link" to="/phukien">
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
