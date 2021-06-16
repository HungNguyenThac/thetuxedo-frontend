import React from "react";
import PropTypes from "prop-types";
import "./bannerCartPage.scss";

BannerCartPage.propTypes = {
  backgroundBannerURL: PropTypes.string,
  titleBanner: PropTypes.string,
};

BannerCartPage.defaultProps = {
  backgroundBannerURL: "",
  titleBanner: "",
};

function BannerCartPage(props) {
  const { backgroundBannerURL, titleBanner } = props;
  const title = titleBanner ? titleBanner : "GIỎ HÀNG CỦA BẠN";
  const background = backgroundBannerURL
    ? backgroundBannerURL
    : "https://lh3.googleusercontent.com/oDn_Z5LLFXToE_Ky1-6W0ULi2RkARh9_CH286zcs16oEj5prHXds1hC07Cihv1p2JcxElS6FtulzLsQz2arrkw9yd2h8aIi7RMuM5NNkk7qCsbuhoG3HLyMtXXXyZZeAzZioUGmKThQQqmZv72Uiz_N8pz1unX9RQLNu6nqZfQvMbQTm4qGt8yOpa6t6QSNygOMlqae1N8LptfDxCjptMr3KEzzVV2dz_CPHzF2NgwyE5s3cYA296ePWLl_CQfsdJqhUbvzZelt6Kuq55NbCU3VUAeNqNuSXMnXt9XM0dcJQ5BZlcDVL1XCITPNmklZCxprEG2MRGrTQ4KTD0_hy806seSZb5IXeg3KscHDUD-0Qonw2VofMesz1aC1N26_QDe9Wh9RuGwJFOuv7bide_gFHbjYZhU0iCen1n6_2LBvLxFnc_YGtVZeslLHgEJ8C44roB5hyq9udZypbwJyHmGLL8lqveSv0Lot8OZI9g5TMWO_wClL5wtiQWArHWGxCDhVK3SwjdG9F2SFPL97FuW0IpdyLX8ngSByRaxtwHrYUB7z3CHnyRVvdF1vvnry7-VXesrW1LNUX6wTinWs5R3wRaFUNtbij5WDDaF43kGpZXDM0zzDvB79jOnuwShJd85JYD5xfL1ZWefbXanEWwg2ISYU9-LRMWis2tkYosey3rXU10CcQ72_wPQoDCHMU9frTffwXIU00EvzUBDA63Tw=w1910-h471-no?authuser=0";

  return (
    <div className="banner">
      <img className="banner_img" src={background} alt="banner" />
      <h1 className="banner__title1">{title}</h1>
    </div>
  );
}

export default BannerCartPage;
