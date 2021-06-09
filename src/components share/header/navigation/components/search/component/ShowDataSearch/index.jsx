import React from "react";
import PropTypes from "prop-types";
import "./showdatasearch.scss";
import { Link } from "react-router-dom";

ListDataSearch.propTypes = {
  items: PropTypes.array,
};

ListDataSearch.defaultProps = {
  items: [],
};

function ListDataSearch(props) {
  const { items } = props;
  return (
    <ul className="list--data">
      {items.map((item) => {
        return (
          <li key={item._id}>
            <Link to="/about">
              <div className="list--data__li">
                <div className="list--data__li__img">
                  <img className="image--search" src={item.anhBia} alt="" />
                </div>
                <div className="list--data__li__content">
                  <p className="content--data__search">{item.tenSP}</p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ListDataSearch;
