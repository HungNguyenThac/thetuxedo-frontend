import React from "react";
import PropTypes from "prop-types";
import "./bannerFooter.scss";
import banner from "../../assets/banner/banner7.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import logo from "../../assets/logo/logo.png";
import MailIcon from "@material-ui/icons/Mail";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
Footer.propTypes = {
  backgroundBannerURL: PropTypes.string,
  itemDetail: PropTypes.object,
};

Footer.defaultProps = {
  backgroundBannerURL: "",
  itemDetail: {},
};

function Footer(props) {
  const { backgroundBannerURL, itemDetail } = props;
  const { tenSP } = itemDetail;

  const title = tenSP ? tenSP : "CẢM ƠN QUÝ KHÁCH ĐÃ GHÉ THĂM";
  const background = backgroundBannerURL ? backgroundBannerURL : banner;
  return (
    <div className="footer">
      <div className="banner-footer">
        <img className="banner-footer_img" src={background} alt="banner" />
        <div className="footer-content">
          <Row>
            <Col
              xxl={{ span: 6, offset: 0 }}
              xl={{ span: 6, offset: 0 }}
              lg={{ span: 6, offset: 0 }}
              md={{ span: 6, offset: 0 }}
              sm={{ span: 6, offset: 0 }}
              xs={{ span: 12, offset: 0 }}
            >
              <div className="footer-logo">
                <Link className="footer-logo-title" exact to="/">
                  <span className="footer-logo-contents">THE TUXEDO</span>
                </Link>
                <div className="display-flex-row">
                  <div className="footer-logo_bottom">
                    <PhoneForwardedIcon className="footer-icon" />
                    <span>0965882467</span>
                  </div>
                  <div className="footer-logo_bottom">
                    <MailIcon className="footer-icon" />
                    <span>nthachung@gmail.com</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              xxl={6}
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={17}
              className="footer-display-none"
            >
              <div className="footer-marginTop">
                <span className="footer-title">DỊCH VỤ KHÁCH HÀNG</span>
                <div className="footer-block-link">
                  <span className="footer-title-content">News</span>
                  <Link className="footer-title-content" to="/feature/uudai">
                    <span className="footer-title-content">Khuyễn mãi</span>
                  </Link>
                  <span className="footer-title-content">
                    Tuxedo và Báo chí
                  </span>
                  <span className="footer-title-content">Ưu Đãi đối tác</span>
                  <span className="footer-title-content">
                    Sao Việt và Khách hàng
                  </span>
                  <span className="footer-title-content">The Tuxedo video</span>
                </div>
              </div>
            </Col>
            <Col
              xxl={6}
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={17}
              className="footer-display-none"
            >
              <div className="footer-marginTop">
                <span className="footer-title">NHÓM SẢN PHẨM</span>
                <div className="footer-block-link">
                  <Link
                    className="footer-title-content"
                    to="/feature/vestcollection"
                  >
                    <span className="footer-title-content">
                      BST Suit The Tuxedo
                    </span>
                  </Link>
                  <Link className="footer-title-content" to="/feature/aosomi">
                    <span className="footer-title-content">Sơ Mi Nam</span>
                  </Link>
                  <Link className="footer-title-content" to="/feature/quanau">
                    <span className="footer-title-content">Quần Âu</span>
                  </Link>
                  <Link className="footer-title-content" to="/feature/giaytay">
                    <span className="footer-title-content">Giày Tây</span>
                  </Link>
                  <Link className="footer-title-content" to="/feature/phukien">
                    <span className="footer-title-content">Phụ Kiện</span>
                  </Link>
                </div>
              </div>
            </Col>
            <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={12}>
              <div className="footer-marginTop">
                <div className="flex-direaction-column">
                  <span className="footer-title">KẾT NỐI VỚI CHÚNG TÔI</span>
                  <div className="just-tificontent-center">
                    <a href="https://www.facebook.com/HgNguyen19.4.96/">
                      <FacebookIcon fontSize="medium" className="footer-icon" />
                    </a>
                    <a href="https://www.instagram.com/hgnguyen19.4.96/">
                      <InstagramIcon
                        fontSize="medium"
                        className="footer-icon"
                      />
                    </a>
                    <a href="https://www.facebook.com/HgNguyen19.4.96/">
                      <TwitterIcon fontSize="medium" className="footer-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Footer;
