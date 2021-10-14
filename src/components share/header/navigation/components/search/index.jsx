import React, { useEffect, useState } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";
import ListDataSearch from "./component/ShowDataSearch";
import InputSearch from "./component/inputSearch";
import "./search.scss";

Search.propTypes = {};

function Search(props) {
  const [listItem, setListItem] = useState([]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchPostList() {
      try {
        const queryString1 = queryString.stringify(filter);
        const postListURL = `https://strapi-thetuxedo.herokuapp.com/products/search?${queryString1}`;
        const response = await fetch(postListURL);
        const postListJSON = await response.json();
        setListItem(postListJSON);
      } catch (error) {
        console.log("Failed to fetch from URL: ", error.message);
      }
    }
    fetchPostList();
  }, [filter]);

  function handleFilterChange(formValues) {
    setFilter({
      tenSP: formValues.searchTerm,
    });
  }
  return (
    <div className="SearchForm">
      <InputSearch onSubmit={handleFilterChange} />
      <hr className="hr-search" />
      <ListDataSearch items={listItem} />
    </div>
  );
}

export default Search;
