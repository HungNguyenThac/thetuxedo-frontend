import React from "react";
import PropTypes from "prop-types";
import "./showdatasearch.scss";
import { Link } from "react-router-dom";
import { addItemToDetail } from "../../../../../../../actions/itemDetail";
import { useDispatch } from "react-redux";

ListDataSearch.propTypes = {
  items: PropTypes.array,
};

ListDataSearch.defaultProps = {
  items: [],
};

function ListDataSearch(props) {
  const dispatch = useDispatch();
  const { items } = props;
  function andleClickAddItemToDetailPage(item) {
    let itemDispatch = addItemToDetail(item);
    dispatch(itemDispatch);
  }
  return (
    <ul className="list--data">
      {items.map((item) => {
        return (
          <li
            key={item._id}
            onClick={() => andleClickAddItemToDetailPage(item)}
          >
            <Link to="/feature/detail">
              <div className="list--data__li">
                <div className="list--data__li__img">
                  <img className="image--search" src={item.anhBia} alt="" />
                </div>
                <div className="list--data__li__content">
                  <span className="content--data__search">{item.tenSP}</span>
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
