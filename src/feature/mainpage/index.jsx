import axios from "axios";
import React, { useEffect, useState } from "react";
import BannerMainPage from "./components/banner";
import BannerSecond from "./components/bannerSecond";
import ListItemStart from "./components/listItemStar";
import "./mainpage.scss";

MainPage.propTypes = {};
function MainPage() {
  const [listItem, setListItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribe = true;
    async function getData() {
      try {
        let responseItems = await axios({
          method: "GET",
          url: "https://strapi-thetuxedo.herokuapp.com/products?phanLoai_containss=Handmade",
        });
        const { status, data } = responseItems;
        if (isSubscribe && status === 200) {
          setListItem(data);
          setLoading(false);
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
      <ListItemStart loading={loading} listItem={listItem} />
    </div>
  );
}

export default MainPage;
