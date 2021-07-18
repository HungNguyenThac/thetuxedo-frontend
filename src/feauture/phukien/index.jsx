import React from "react";
import "./phukien.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import BannerPhuKien from "./components/banner";
import RenderPhuKien from "./components/renderPhuKien";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../actions/loading";

function VestCollection(props) {
  const dispatch = useDispatch();
  const [listThatLung, setListThatLung] = useState([]);
  const [listCaVat, setListCaVat] = useState([]);
  const [listNoCaiCo, setListNoCaiCo] = useState([]);
  const [listKhanCaiAo, setListKhanCaiAo] = useState([]);
  const [listGhimCaiAo, setListGhimCaiAo] = useState([]);
  const [listComboPhuKien, setListComboPhuKien] = useState([]);

  useEffect(() => {
    dispatch(showLoading(true));
    async function getDataPhuKien() {
      try {
        let responseDataThatLung = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=thatlung",
        });
        let responseDataCaVat = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=cavat",
        });
        let responseDataNoCaiCo = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=nocaico",
        });
        let responseDataKhanCaiAo = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=khancaiao",
        });
        let responseDataGhimCaiAo = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=ghimcaiao",
        });
        let responseComboPhuKien = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=combophukien",
        });

        if (responseDataThatLung.status === 200) {
          setListComboPhuKien(responseDataThatLung.data);
        }

        if (responseDataCaVat.status === 200) {
          setListGhimCaiAo(responseDataCaVat.data);
        }

        if (responseDataNoCaiCo.status === 200) {
          setListKhanCaiAo(responseDataNoCaiCo.data);
        }

        if (responseDataKhanCaiAo.status === 200) {
          setListNoCaiCo(responseDataKhanCaiAo.data);
        }

        if (responseDataGhimCaiAo.status === 200) {
          setListCaVat(responseDataGhimCaiAo.data);
        }

        if (responseComboPhuKien.status === 200) {
          setListThatLung(responseComboPhuKien.data);
        }
        if (
          responseDataThatLung.status === 200 &&
          responseDataCaVat.status === 200 &&
          responseDataNoCaiCo.status === 200 &&
          responseDataKhanCaiAo.status === 200 &&
          responseDataGhimCaiAo.status === 200 &&
          responseComboPhuKien.status === 200
        ) {
          dispatch(hideLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataPhuKien();
    return () => {
      getDataPhuKien();
    };
  }, []);

  // vest Cong so

  return (
    <div className="container">
      <BannerPhuKien />
      <RenderPhuKien
        listComboPhuKien={listComboPhuKien}
        listKhanCaiAo={listKhanCaiAo}
        listCaVat={listCaVat}
        listGhimCaiAo={listGhimCaiAo}
        listNoCaiCo={listNoCaiCo}
        listThatLung={listThatLung}
      />
    </div>
  );
}

export default VestCollection;
