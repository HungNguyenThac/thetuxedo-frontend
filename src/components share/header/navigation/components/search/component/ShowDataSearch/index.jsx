import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { addItemToDetail } from "../../../../../../../actions/itemDetail";
import "./showdatasearch.scss";

ListDataSearch.propTypes = {
  items: PropTypes.array,
};

ListDataSearch.defaultProps = {
  items: [],
};

function ListDataSearch(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { items } = props;

  function andleClickAddItemToDetailPage(item) {
    const action = addItemToDetail(item);
    dispatch(action);
    history.push(`/${item.phanLoai}/detail/${item.id}`);
    window.scrollTo(0, 186);
  }
  return (
    <ul className="list--data">
      {items.map((item) => {
        return (
          <li
            key={item._id}
            onClick={() => andleClickAddItemToDetailPage(item)}
          >
            <div className="list--data__li">
              <div className="list--data__li__img">
                <img className="image--search" src={item.anhBia} alt="" />
              </div>
              <div className="list--data__li__content">
                <span className="content--data__search">{item.tenSP}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ListDataSearch;
