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
  const { items } = props;
  console.log(18, items);
  const dispatch = useDispatch();
  function handleClickAddItemToCart(item) {
    let itemDispatch = addItemToDetail(item);
    dispatch(itemDispatch);
  }
  return (
    <ul className="list--data2">
      {items.map((item) => {
        return (
          <li key={item._id} onClick={() => handleClickAddItemToCart(item)}>
            <Link to="/about">
              <div className="list--data2__li">
                <div className="list--data2__li__img">
                  <img className="image--search2" src={item.anhBia} alt="" />
                </div>
                <div className="list--data__li__content2">
                  <p className="content--data__search2">{item.tenSP}</p>
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
