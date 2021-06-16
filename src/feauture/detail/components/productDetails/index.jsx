import React from "react";
import PropTypes from "prop-types";
import "./productDetail.scss";

ProductDetail.propTypes = {
  itemDetail: PropTypes.object,
};

ProductDetail.defaultProps = {
  itemDetail: {},
};

function ProductDetail(props) {
  const { itemDetail } = props;
  const { boardSize } = itemDetail;
  return (
    <div className="detailPage-bottom">
      <span className="detailPage-bottom_title">CHI TIẾT SẢN PHẨM</span>
      <img className="detailPage-bottom_img" src={boardSize} alt="boardSize" />
    </div>
  );
}

export default ProductDetail;
