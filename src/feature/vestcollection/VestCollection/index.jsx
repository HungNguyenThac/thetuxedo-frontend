import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../actions/loading";
import BannerVestCollectiion from "./components/banner";
import RenderVestCollection from "./components/renderVestCollection";

function VestCollection(props) {
  const dispatch = useDispatch();
  const [listVestCuoi, setListVestCuoi] = useState([]);
  const [listVestDaHoi, setListVestDaHoi] = useState([]);
  const [listVestCongSo, setListVestCongSo] = useState([]);
  useEffect(() => {
    dispatch(showLoading(true));
    async function getDataVest() {
      try {
        let responseVestDaHoi = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=vestdahoi",
        });
        let responseVestCongSo = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=vestcongso",
        });
        let responseVestCuoi = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=vestcuoi",
        });

        if (responseVestDaHoi.status === 200) {
          setListVestCuoi(responseVestDaHoi.data);
        }
        if (responseVestCongSo.status === 200) {
          setListVestDaHoi(responseVestCongSo.data);
        }
        if (responseVestCuoi.status === 200) {
          setListVestCongSo(responseVestCuoi.data);
        }
        if (
          responseVestDaHoi.status === 200 &&
          responseVestCongSo.status === 200 &&
          responseVestCuoi.status === 200
        ) {
          dispatch(hideLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataVest();
    return () => getDataVest();
  }, []);

  return (
    <div className="container">
      <BannerVestCollectiion />
      <RenderVestCollection
        listVestCuoi={listVestCuoi}
        listVestDaHoi={listVestDaHoi}
        listVestCongSo={listVestCongSo}
      />
    </div>
  );
}

export default VestCollection;
