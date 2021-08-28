import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../actions/loading";
import BannerComboPhuKien from "./components/banner";
import RenderComboPhuKien from "./components/renderCombo";

function ComboPhuKien(props) {
  const dispatch = useDispatch();
  const [comboPhuKien, setcomboPhuKien] = useState([]);

  useEffect(() => {
    dispatch(showLoading(true));
    async function getDataPhuKien() {
      try {
        let responseComboPhuKien = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products?phanLoai_containss=combophukien",
        });
        if (responseComboPhuKien.status === 200) {
          setcomboPhuKien(responseComboPhuKien.data);
          dispatch(hideLoading(false));
        } else {
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

  return (
    <div className="container">
      <BannerComboPhuKien />
      <RenderComboPhuKien comboPhuKien={comboPhuKien} />
    </div>
  );
}

export default ComboPhuKien;
