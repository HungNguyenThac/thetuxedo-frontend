import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ao.scss";
import "../../img/ao1.jpg";
import MinusOutlined from "@ant-design/icons";
import axios from "axios";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

AoPage.propTypes = {};

function AoPage(props) {
  let [listUserao, setListUserao] = useState([]);
  useEffect(() => {
    async function blocksau() {
      try {
        let response = await axios({
          method: "GET",
          url: "http://localhost:1337/san-phams",
        });
        console.log(response);

        if (response.status === 200) {
          setListUserao(response.data);
        }
      } catch (error) {
        // console.log("lỗi")
      }
    }
    blocksau();
  }, []);
  console.log(listUserao, 33);
  return (
    <div className="dislay-flex">
      <div className="total">
        {listUserao.length
          ? listUserao.map((userao, index) => {
              return (
                <div className="border-shirt">
                  <div className="border-img">
                    <img src={userao.anhBia} alt="" className="img-shirt" />
                  </div>
                  <h2 className="tex-h2-shirt">{userao.tenSP}</h2>
                  <span className="span-shirt">{/* <MinusOutlined /> */}</span>
                  <h3 className="h3-shirt-text">{userao.gia}vnd</h3>
                  <div className="border-shopping">
                    <p className="p-center">
                      <ShoppingCartIcon className="icon-shirt"/>
                      Thêm vào giỏ</p>
                    <div className="display-block"></div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default AoPage;
