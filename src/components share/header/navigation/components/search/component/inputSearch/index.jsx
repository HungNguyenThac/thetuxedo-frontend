import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./inputSearch.scss";

InputSearch.propTypes = {
  onSubmit: PropTypes.func,
};

InputSearch.defaultProps = {
  onSubmit: null,
};

function InputSearch(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    if (!onSubmit) {
      return;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 300);
  }

  return (
    <form className="form--search">
      <input
        className="input__search"
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </form>
  );
}

export default InputSearch;
