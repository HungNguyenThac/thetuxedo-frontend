import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../actions/loading";
import BannerDetail from "./components/bannerDetail";
import DetailTop from "./components/detailTop";
import ProductDetail from "./components/productDetails";
import "./detail.scss";

ItemDetail.propTypes = {};

function ItemDetail() {
  const dispatch = useDispatch();
  const [itemDetail, setItemDetail] = useState({});
  const [idSize, setIdSize] = useState("");
  const item = useSelector((state) => state.itemDetail);
  const param = useParams();

  useEffect(() => {
    let isSubscribe = true;
    dispatch(showLoading());
    async function getItem() {
      try {
        let response = await axios({
          method: "GET",
          url: `https://thetuxedo.herokuapp.com/products/${param.param}`,
        });
        const { status, data } = response;
        if (isSubscribe && status === 200) {
          setItemDetail(data);
        }
        if (isSubscribe && status === 200) {
          dispatch(hideLoading());
        }
      } catch (error) {
        console.log(error);
      }
    }
    getItem();
    return () => (isSubscribe = false);
  }, [item]);

  function handleSizeSelected(size) {
    setIdSize(size.id);
  }

  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      const element = document.querySelector(".window__zoom");
      element.style.display = "none";
    }
  });

  return (
    <div>
      <BannerDetail itemDetail={itemDetail} />
      <div className="detail--page">
        <div className="grid">
          <div className="body-detail">
            <DetailTop
              itemDetail={itemDetail}
              activeSize={handleSizeSelected}
              idSize={idSize}
            />
            <hr className="hr-title-page" />
            <ProductDetail itemDetail={itemDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
