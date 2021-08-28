import React from "react";
import "./mainpage.scss";
import BannerMainPage from "./components/banner";
import BannerSecond from "./components/bannerSecond";
import ListItemStart from "./components/listItemStar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../actions/loading";

MainPage.propTypes = {};
function MainPage(props) {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState([]);
  useEffect(() => {
    if (listItem.length === 0) {
      let value = showLoading(true);
      dispatch(value);
    }
    async function getData() {
      try {
        let responseItems = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=Handmade",
        });
        if (responseItems.status === 200) {
          setListItem(responseItems.data);
          let value = hideLoading(false);
          dispatch(value);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <BannerMainPage />
      <BannerSecond />
      <ListItemStart listItem={listItem} />
    </div>
  );
}

export default MainPage;
