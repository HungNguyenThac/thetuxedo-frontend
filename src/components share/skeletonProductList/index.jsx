import Skeleton from "@mui/material/Skeleton";
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

SkeletonProductList.propTypes = {
  quantity: PropTypes.number,
};

SkeletonProductList.defaultProps = {
  quantity: 12,
};

function SkeletonProductList(props) {
  const { quantity } = props;
  return (
    <ul className="ul-item">
      <Row gutter={[8, 8]}>
        {Array.from(new Array(quantity)).map((x, index) => {
          return (
            <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={24}>
              <li key={index}>
                <Skeleton variant="rectangular" width="100%" height={208} />
                <Skeleton />
                <Skeleton width="60%" />
              </li>
            </Col>
          );
        })}
      </Row>
    </ul>
  );
}

export default SkeletonProductList;
