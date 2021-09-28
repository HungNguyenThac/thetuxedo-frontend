import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../actions/loading";
import BannerMainPage from "./components/banner";
import BannerSecond from "./components/bannerSecond";
import ListItemStart from "./components/listItemStar";
import "./mainpage.scss";

MainPage.propTypes = {};
function MainPage() {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    dispatch(showLoading(true));
    let isSubscribe = true;
    async function getData() {
      try {
        let responseItems = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=Handmade",
        });
        const { status, data } = responseItems;
        if (isSubscribe && status === 200) {
          setListItem(data);
          dispatch(hideLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    return () => (isSubscribe = false);
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
