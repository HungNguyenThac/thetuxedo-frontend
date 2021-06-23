import React from "react";
import "./vestCollecion.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import RenderVestCollection from "./components/renderVestCollection";
import BannerVestCollectiion from "./components/banner";
import queryString from "query-string";

function VestCollection(props) {
  //vestCuoi
  const [listVestCuoi, setListVestCuoi] = useState([]);
  const [totalVestCuoi, setTotalVestCuoi] = useState(0);

  const [filtersVestCuoi, setFiltersVestCuoi] = useState({
    _limit: 12,
    _start: 0,
    gia_gte: 0,
    _sort: "tenSP:DESC",
  });

  useEffect(() => {
    async function getDataVestCuoi() {
      try {
        var paginationVetsCuoi = queryString.stringify(filtersVestCuoi);
        let responseItems = await axios({
          method: "GET",
          url: `https://thetuxedo.herokuapp.com/products?phanLoai_containss=vestcuoi&${paginationVetsCuoi}`,
        });
        let responseCount = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products/count?phanLoai_contains=vestcuoi",
        });
        if (responseItems.status === 200) {
          setListVestCuoi(responseItems.data);
        }
        if (responseCount.status === 200) {
          setTotalVestCuoi(responseCount.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataVestCuoi();
    return () => getDataVestCuoi();
  }, [filtersVestCuoi]);

  function handlePageChangeVestCuoi1(Page) {
    const newFilters = {
      ...filtersVestCuoi,
      _start: (Page - 1) * 12,
    };
    setFiltersVestCuoi(newFilters);
  }

  function handlePageChangeVestCuoi2(newPage) {
    const newFilters = {
      ...filtersVestCuoi,
      _start: (newPage - 1) * 12,
    };
    setFiltersVestCuoi(newFilters);
  }

  function handleFilterVestCuoi(value) {
    const arrayFilter = value.split("-");
    const gtPrice = arrayFilter[0];
    const ltPrice = arrayFilter[1];
    let newFilter = {
      ...filtersVestCuoi,
      _start: 0,
      gia_gte: gtPrice,
      gia_lte: ltPrice,
    };
    setFiltersVestCuoi(newFilter);
  }

  function handleSortVestCuoi(value) {
    let newFilter = {
      ...filtersVestCuoi,
      _start: 0,
      _sort: value,
    };
    setFiltersVestCuoi(newFilter);
  }

  //vest da hoi
  const [listVestDaHoi, setListVestDaHoi] = useState([]);
  const [totalVestDaHoi, setTotalVestDaHoi] = useState(0);
  const [filtersVestDaHoi, setFiltersVestDaHoi] = useState({
    _limit: 12,
    _start: 0,
    gia_gte: 0,
    _sort: "tenSP:DESC",
  });
  useEffect(() => {
    async function getDataVestDaHoi() {
      try {
        const paginationVestDaHoi = queryString.stringify(filtersVestDaHoi);
        let responseItems = await axios({
          method: "GET",
          url: `https://thetuxedo.herokuapp.com/products?phanLoai_containss=vestdahoi&${paginationVestDaHoi}`,
        });
        let responseCount = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products/count?phanLoai_contains=vestdahoi",
        });
        if (responseItems.status === 200) {
          setListVestDaHoi(responseItems.data);
        }
        if (responseCount.status === 200) {
          setTotalVestDaHoi(responseCount.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataVestDaHoi();
    return () => getDataVestDaHoi();
  }, [filtersVestDaHoi]);

  function handlePageChangeDaHoi1(Page) {
    const newFilters = {
      ...filtersVestDaHoi,
      _start: (Page - 1) * 12,
    };
    setFiltersVestDaHoi(newFilters);
  }

  function handlePageChangeDaHoi2(newPage) {
    const newFilters = {
      ...filtersVestDaHoi,
      _start: (newPage - 1) * 12,
    };
    setFiltersVestDaHoi(newFilters);
  }

  function handleFilterVestDaHoi(value) {
    const arrayFilter = value.split("-");
    const gtPrice = arrayFilter[0];
    const ltPrice = arrayFilter[1];
    let newFilter = {
      ...filtersVestDaHoi,
      _start: 0,
      gia_gte: gtPrice,
      gia_lte: ltPrice,
    };
    setFiltersVestDaHoi(newFilter);
  }

  function handleSortVestDaHoi(value) {
    let newFilter = {
      ...filtersVestDaHoi,
      _start: 0,
      _sort: value,
    };
    setFiltersVestDaHoi(newFilter);
  }

  // vest Cong so
  const [listVestCongSo, setListVestCongSo] = useState([]);
  const [totalVestCongSo, setTotalVestCongSo] = useState(0);
  const [filtersVestCongSo, setFiltersVestCongSo] = useState({
    _limit: 12,
    _start: 0,
    gia_gte: 0,
    _sort: "tenSP:DESC",
  });

  useEffect(() => {
    async function getDataVestCongSo() {
      try {
        const paginationVestCongSo = queryString.stringify(filtersVestCongSo);
        let responseItems = await axios({
          method: "GET",
          url: `https://thetuxedo.herokuapp.com/products?phanLoai_containss=vestcongso&${paginationVestCongSo}`,
        });
        let responseCount = await axios({
          method: "GET",
          url: "https://thetuxedo.herokuapp.com/products/count?phanLoai_contains=vestcongso",
        });
        if (responseItems.status === 200) {
          setListVestCongSo(responseItems.data);
        }
        if (responseCount.status === 200) {
          setTotalVestCongSo(responseCount.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataVestCongSo();
    return () => getDataVestCongSo();
  }, [filtersVestCongSo]);

  function handlePageChangeVestCongSo1(Page) {
    const newFilters = {
      ...filtersVestCongSo,
      _start: (Page - 1) * 12,
    };
    setFiltersVestCongSo(newFilters);
  }

  function handlePageChangeVestCongSo2(newPage) {
    const newFilters = {
      ...filtersVestCongSo,
      _start: (newPage - 1) * 12,
    };
    setFiltersVestCongSo(newFilters);
  }

  function handleFilterVestCongSo(value) {
    const arrayFilter = value.split("-");
    const gtPrice = arrayFilter[0];
    const ltPrice = arrayFilter[1];
    let newFilter = {
      ...filtersVestCongSo,
      _start: 0,
      gia_gte: gtPrice,
      gia_lte: ltPrice,
    };
    setFiltersVestCongSo(newFilter);
  }

  function handleSortCongSo(value) {
    let newFilter = {
      ...filtersVestCongSo,
      _start: 0,
      _sort: value,
    };
    setFiltersVestCongSo(newFilter);
  }

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
