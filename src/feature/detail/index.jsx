import React from "react";
import PropTypes from "prop-types";
import "./detail.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import BannerDetail from "./components/bannerDetail";
import DetailTop from "./components/detailTop";
import ProductDetail from "./components/productDetails";
import { hideLoading, showLoading } from "../../actions/loading";

ItemDetail.propTypes = {};

function ItemDetail(props) {
  const dispatch = useDispatch();
  const [itemDetail, setItemDetail] = useState({});
  const [idSize, setIdSize] = useState("");
  const item = useSelector((state) => state.itemDetail.itemDetail);
  let id = "";
  if (item[0] !== undefined) {
    id = item[0].id;
  } else {
    id = localStorage.getItem("itemDetail");
  }
  useEffect(() => {
    dispatch(showLoading(true));
    async function getItem() {
      try {
        let response = await axios({
          method: "GET",
          url: `https://thetuxedo.herokuapp.com/products/${id}`,
        });

        if (response.status === 200) {
          localStorage.setItem("itemDetail", response.data.id);
          setItemDetail(response.data);
        }
        if (response.status === 200 && response.status === 200) {
          dispatch(hideLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getItem();
    return () => getItem();
  }, [item]);

  function handleSizeSelected(size) {
    setIdSize(size.id);
  }
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
