import React from "react";
import PropTypes from "prop-types";
import "./pagination.scss";
import uuid from "uuid/dist/v4";

PaginationHanmade.propTypes = {
  onPageChange1: PropTypes.func,
  onPageChange2: PropTypes.func,
  activeID: PropTypes.string,
  pagination: PropTypes.object,
};

PaginationHanmade.defaultProps = {
  onPageChange1: null,
  onPageChange2: null,
  activeID: "",
  pagination: {},
};

const limitItems = 12;
const totalItems = 30;
const totalPages = Math.ceil(totalItems / limitItems);
const arrayPages = [];
for (let i = 1; i <= totalPages; i++) {
  const object = {
    id: uuid(),
    number: i,
  };
  arrayPages.push(object);
}

function PaginationHanmade(props) {
  const { onPageChange1, onPageChange2, activeID, pagination } = props;

  const { _start, _limit } = pagination;
  const _page = _start / _limit + 1;

  function handleClickPage(page) {
    if (onPageChange1) {
      onPageChange1(page);
    }
  }

  function handleClickButtonChangePage(newPage) {
    if (onPageChange2) {
      onPageChange2(newPage);
    }
  }
  const prevStyle = _page <= 1 ? { display: "none" } : { display: "block" };
  const nextStyle =
    _page >= totalPages ? { display: "none" } : { display: "block" };
  return (
    <div className="bottom-pagination">
      <button
        style={prevStyle}
        onClick={() => handleClickButtonChangePage(_page - 1)}
        className="button-pagination"
      >
        Prev
      </button>
      <ul className="pagination">
        {arrayPages.map((page) => {
          return (
            <li
              key={page.id}
              className={
                page.id === activeID || page.number === _page
                  ? "pagination-number active"
                  : "pagination-number"
              }
              onClick={() => {
                handleClickPage(page);
              }}
            >
              {page.number}
            </li>
          );
        })}
      </ul>
      <button
        style={nextStyle}
        onClick={() => handleClickButtonChangePage(_page + 1)}
        className="button-pagination"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationHanmade;
