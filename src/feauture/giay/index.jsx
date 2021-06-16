import React from "react";
import PropTypes from "prop-types";
import "./giayTay.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import RenderGiayTay from "./components/renderGiayTay";
import BannerGiayTay from "./components/banner";
GiayTay.propTypes = {};

function GiayTay(props) {
  const [listItem, setListItem] = useState([]);
  const [filters, setFilters] = useState({
    _limit: 12,
    _start: 0,
    gia_gte: 0,
    _sort: "name:DESC",
  });
  useEffect(() => {
    async function getData() {
      try {
        const pagination = queryString.stringify(filters);
        let response = await axios({
          method: "GET",
          url: `http://localhost:1337/products?phanLoai_containss=giaytay&${pagination}`,
        });
        console.log(response);
        if (response.status === 200) {
          setListItem(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [filters]);

  function handlePageChange1(Page) {
    const newFilters = {
      ...filters,
      _start: (Page - 1) * 9,
    };
    setFilters(newFilters);
  }

  function handlePageChange2(newPage) {
    const newFilters = {
      ...filters,
      _start: (newPage - 1) * 9,
    };
    setFilters(newFilters);
  }

  function handleFilter(value) {
    const arrayFilter = value.split("-");
    const gtPrice = arrayFilter[0];
    const ltPrice = arrayFilter[1];
    let newFilter = {
      ...filters,
      _start: 0,
      gia_gte: gtPrice,
      gia_lte: ltPrice,
    };
    setFilters(newFilter);
  }

  function handleSort(value) {
    console.log(value);
    let newFilter = {
      ...filters,
      _start: 0,
      _sort: value,
    };
    setFilters(newFilter);
  }

  return (
    <div>
      <BannerGiayTay />
      <RenderGiayTay
        items={listItem}
        pagination={filters}
        onPageChange1={handlePageChange1}
        onPageChange2={handlePageChange2}
        onSelectFilter={handleFilter}
        onSelectSort={handleSort}
      />
    </div>
  );
}

export default GiayTay;
