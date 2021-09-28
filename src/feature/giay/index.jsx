import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../actions/loading";
import BannerGiayTay from "./components/banner";
import RenderGiayTay from "./components/renderGiayTay";

GiayTay.propTypes = {};

function GiayTay(props) {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [filters, setFilters] = useState({
    _limit: 12,
    _start: 0,
    gia_gte: 0,
    _sort: "tenSP:DESC",
  });

  useEffect(() => {
    dispatch(showLoading(true));
    let isSubscribe = true;
    async function getData() {
      try {
        const pagination = queryString.stringify(filters);
        let responseItems = await axios({
          method: "GET",
          url: `https://thetuxedo.herokuapp.com/products?phanLoai_containss=giaytay&${pagination}`,
        });
        let responseCount = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products/count?phanLoai_contains=giaytay",
        });
        if (isSubscribe && responseItems.status === 200) {
          setListItem(responseItems.data);
        }
        if (isSubscribe && responseCount.status === 200) {
          setTotalItem(responseCount.data);
        }
        if (
          isSubscribe &&
          responseItems.status === 200 &&
          responseCount.status === 200
        ) {
          dispatch(hideLoading(false));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    return () => (isSubscribe = false);
  }, [filters]);

  function handlePageChange1(Page) {
    const newFilters = {
      ...filters,
      _start: (Page - 1) * 12,
    };
    setFilters(newFilters);
  }

  function handlePageChange2(newPage) {
    const newFilters = {
      ...filters,
      _start: (newPage - 1) * 12,
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
    let newFilter = {
      ...filters,
      _start: 0,
      _sort: value,
    };
    setFilters(newFilter);
  }

  return (
    <div className="container">
      <BannerGiayTay />
      <RenderGiayTay
        totalItem={totalItem}
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
