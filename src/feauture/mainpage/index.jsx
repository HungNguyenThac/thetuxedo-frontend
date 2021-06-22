import React from "react";
import PropTypes from "prop-types";
import "./mainpage.scss";
import BannerMainPage from "./components/banner";
import BannerSecond from "./components/bannerSecond";
import ListItemStart from "./components/listItemStar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

MainPage.propTypes = {};
function MainPage(props) {
  const [listItem, setListItem] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        let responseItems = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=Handmade",
        });
        if (responseItems.status === 200) {
          setListItem(responseItems.data);
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
