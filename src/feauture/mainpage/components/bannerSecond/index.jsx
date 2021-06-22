import React from "react";
import PropTypes from "prop-types";
import "./bannerSecond.scss";
import { Col, Row } from "antd";
import banner1 from "../../../../assets/banner/banner11.jpeg";
import banner2 from "../../../../assets/banner/banner12.png";
import { Link } from "react-router-dom";

BannerSecond.propTypes = {};

function BannerSecond(props) {
  return (
    <div>
      <div className="banner-top">
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <img className="banner-top_left" src={banner1} alt="" />
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <div className="banner-top_right">
              <h2 className="banner-top_right-title">
                Kỳ 1 - Biểu tượng logo The Tuxedo
              </h2>
              <p className="banner-top_right-content">
                Logo không chỉ là biểu tượng của công ty mà những gì cô đọng
                nhất để khách hàng nhớ tới. Mỗi biểu tượng đều mang một ý nghĩa
                to lớn ẩn sau. Với tất cả sứ mệnh, niềm tin của một tổ chức đặt
                vẻn vẹn trong đó. Các thương hiệu lớn trên thế giới, có thể chi
                rất nhiều tiền hàng triệu đô chỉ để tạo nên một biểu tượng, một
                logo độc đáo cho riêng mình, hay chỉ để sửa một nét ngạch rất
                nhỏ trên logo để cho xứng tầm đẳng cấp của thương hiệu....
              </p>
              <Link>
                <span className="banner-top_right-detail title after">
                  Xem thêm
                </span>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
      <div className="banner-top lon-hon-576">
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <div className="banner-top_right">
              <h2 className="banner-top_right-title">
                SUIT - "Di sản" của người đàn ông qua các thời kỳ
              </h2>
              <p className="banner-top_right-content">
                Đối với ngành thời trang nói chung hay người đàn ông nói riêng,
                di sản của nhân loại được thể hiện qua bộ Suit. Dù trải qua các
                thời kỳ, Suit vẫn giữ những nét đẹp sang trọng của riêng nó và
                luôn gắn liền với hình ảnh của người đàn ông lịch thiệp, thành
                đạt. Điều đó, liên quan rất nhiều đến quá trình hình thành nên
                bộ Suit trong lịch sử...
              </p>
              <Link>
                <span className="banner-top_right-detail title after">
                  Xem thêm
                </span>
              </Link>
            </div>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <img className="banner-top_left" src={banner2} alt="" />
          </Col>
        </Row>
      </div>
      <div className="banner-top nho-hon-576">
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <img className="banner-top_left" src={banner2} alt="" />
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <div className="banner-top_right">
              <h2 className="banner-top_right-title">
                SUIT - "Di sản" của người đàn ông qua các thời kỳ
              </h2>
              <p className="banner-top_right-content">
                Đối với ngành thời trang nói chung hay người đàn ông nói riêng,
                di sản của nhân loại được thể hiện qua bộ Suit. Dù trải qua các
                thời kỳ, Suit vẫn giữ những nét đẹp sang trọng của riêng nó và
                luôn gắn liền với hình ảnh của người đàn ông lịch thiệp, thành
                đạt. Điều đó, liên quan rất nhiều đến quá trình hình thành nên
                bộ Suit trong lịch sử...
              </p>
              <Link>
                <span className="banner-top_right-detail title after">
                  Xem thêm
                </span>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BannerSecond;
