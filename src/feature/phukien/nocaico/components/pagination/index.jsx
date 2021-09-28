import PropTypes from "prop-types";
import React from "react";
import uuid from "uuid/dist/v4";
import "./pagination.scss";

PaginationHanmade.propTypes = {
  onPageChange1: PropTypes.func,
  onPageChange2: PropTypes.func,
  activeID: PropTypes.string,
  pagination: PropTypes.object,
  totalItem: PropTypes.number,
};

PaginationHanmade.defaultProps = {
  onPageChange1: null,
  onPageChange2: null,
  activeID: "",
  pagination: {},
  totalItem: null,
};

function makeArrayPages(totalPages) {
  let arrayPages = [];
  for (let i = 1; i <= totalPages; i++) {
    const object = {
      id: uuid(),
      number: i,
    };
    arrayPages.push(object);
  }
  return arrayPages;
}

function PaginationHanmade(props) {
  const { onPageChange1, totalItem, onPageChange2, activeID, pagination } =
    props;

  const { _start, _limit } = pagination;

  const totalPages = Math.ceil(totalItem / _limit);

  const arrayPages = makeArrayPages(totalPages);

  const _page = _start / _limit + 1;

  function handleClickPage(page) {
    if (onPageChange1) {
      onPageChange1(page);
      window.scrollTo(0, 472);
    }
  }

  function handleClickButtonChangePage(newPage) {
    if (onPageChange2) {
      onPageChange2(newPage);
      window.scrollTo(0, 472);
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
