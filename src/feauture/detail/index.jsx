import React from "react";
import PropTypes from "prop-types";
import "./detail.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import BannerDetail from "./components/bannerDetail";
import DetailTop from "./components/detailTop";
import ProductDetail from "./components/productDetails";

ItemDetail.propTypes = {};

function ItemDetail(props) {
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
    async function getItem() {
      try {
        let response = await axios({
          url: `http://localhost:1337/products/${id}`,
          method: "GET",
        });

        if (response.status === 200) {
          localStorage.setItem("itemDetail", response.data.id);
          setItemDetail(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getItem();
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
