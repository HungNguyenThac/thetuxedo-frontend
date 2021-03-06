import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addItemToDetail } from "../../../actions/itemDetail";
import SkeletonProductList from "../../skeletonProductList/index";
import RenderPagination from "../pagination";
import "./style.scss";

RenderProductList.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange1: PropTypes.func,
  onPageChange2: PropTypes.func,
  onSelectFilter: PropTypes.func,
  onSelectSort: PropTypes.func,
  totalItem: PropTypes.number,
  loading: PropTypes.bool,
};

RenderProductList.defaultProps = {
  items: [],
  pagination: {},
  onPageChange1: null,
  onPageChange2: null,
  onSelectFilter: null,
  onSelectSort: null,
  totalItem: null,
  loading: true,
};

function RenderProductList(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    items,
    pagination,
    onSelectFilter,
    onSelectSort,
    onPageChange1,
    onPageChange2,
    totalItem,
    loading,
  } = props;

  const [idActive, setIdActive] = useState("");
  function handlePageChange1(Page) {
    if (onPageChange1) {
      onPageChange1(Page.number);
    }
    setIdActive(Page.id);
  }

  function handlePageChange2(newPage) {
    if (onPageChange2) {
      onPageChange2(newPage);
    }
  }

  function handleSelectFilter(e) {
    let value = e.target.value;
    if (onSelectFilter) {
      onSelectFilter(value);
      window.scrollTo(0, 472);
    }
  }

  function handleSelectSort(e) {
    let value = e.target.value;
    if (onSelectSort) {
      onSelectSort(value);
      window.scrollTo(0, 472);
    }
  }

  function handleClickSendItem(item) {
    const action = addItemToDetail(item);
    dispatch(action);
    history.push(`/${item.phanLoai}/detail/${item.id}`);
    window.scrollTo(0, 186);
  }

  return (
    <body className="Body">
      <div className="grid">
        <div className="body-top">
          <Col
            xxl={{ span: 8 }}
            xl={{ span: 8 }}
            lg={{ span: 8 }}
            md={{ span: 10 }}
            sm={{ span: 12 }}
          >
            <form className="body-top_form-left" action="">
              <label className="label-top_left" htmlFor="">
                Bộ Lọc:
              </label>
              <select
                className="select-option_left"
                autofocus="autofocus"
                name="boloc"
                id=""
                onChange={handleSelectFilter}
              >
                <option defaultValue value="1">
                  Tất Cả
                </option>
                <option value="0-500000">Nhỏ hơn 500.000đ</option>
                <option value="500000-1000000">Từ 500.000đ - 1.000.000đ</option>
                <option value="1000000-2000000">
                  Từ 1.000.000đ - 2.000.000đ
                </option>
                <option value="2000000-2500000">
                  Từ 2.000.000đ - 2.500.000đ
                </option>
                <option value="2500000-4000000">
                  Từ 2.500.000đ - 4.000.000đ
                </option>
                <option value="4000000">Lớn hơn 4.000.000đ</option>
              </select>
            </form>
          </Col>
          <Col
            xxl={{ span: 8, offset: 8 }}
            xl={{ span: 8, offset: 8 }}
            lg={{ span: 8, offset: 8 }}
            md={{ span: 10, offset: 4 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
          >
            <form className="body-top_form-right" action="">
              <label className="label-top_right" htmlFor="">
                Sắp Xếp:
              </label>
              <select
                className="select-option_right"
                autofocus="autofocus"
                name="sapxep"
                id=""
                onChange={handleSelectSort}
              >
                <option value="gia:ASC">Sản Phẩm Bán Chạy</option>
                <option defaultValue value="tenSP:DESC">
                  Theo Bảng Chữ Cái Từ A-Z
                </option>
                <option value="tenSP:ASC">Theo Bảng Chữ Cái Từ Z-A</option>
                <option value="gia:ASC">Giá Từ Thấp Đến Cao</option>
                <option value="gia:DESC">Giá Từ Cao Đến Thấp</option>
                <option value="createdAt:DESC">Mới Nhất</option>
                <option value="createdAt:ASC">Cũ Nhất</option>
              </select>
            </form>
          </Col>
        </div>
        <div className="body-bottom">
          {loading ? (
            <SkeletonProductList />
          ) : (
            <ul className="ul-item">
              <Row gutter={[8, 8]}>
                {items.map((item) => {
                  // tạo dấu . trong giá tiền
                  let Gia = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item?.gia);

                  // tạo dấu . trong giảm giá tiền
                  let giamGiaString = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item?.giamGia);

                  //tạo % giảm giá
                  const phanTram = Math.round(
                    (100 - (item?.giamGia / item?.gia) * 100).toFixed(2)
                  );

                  return (
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
                      <li
                        className="item item-link"
                        key={item.id}
                        onClick={() => handleClickSendItem(item)}
                      >
                        <div className="item-main">
                          <div className="item-main_div-img">
                            <img
                              className="item-main_img"
                              src={item.anhBia}
                              alt="ảnh bìa"
                            />
                            {item.giamGia ? (
                              <div className="notification-sale">
                                <span className="notification-sale_content">
                                  <span>{phanTram}%</span>
                                </span>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="item-detail">
                            <div className="item-detail_flex">
                              <div className="item-detail_name">
                                {item.tenSP}
                              </div>
                              {item.giamGia ? (
                                <div className="item-detail_price">
                                  <span className="item-detail_price-sale">
                                    {giamGiaString}
                                  </span>
                                  <div>
                                    <span className="item-detail_price-real_sale">
                                      {Gia}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <p className="item-detail_price-real">{Gia}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    </Col>
                  );
                })}
              </Row>
            </ul>
          )}
          <RenderPagination
            onPageChange1={handlePageChange1}
            onPageChange2={handlePageChange2}
            activeID={idActive}
            pagination={pagination}
            totalItem={totalItem}
          />
        </div>
      </div>
    </body>
  );
}

export default RenderProductList;
