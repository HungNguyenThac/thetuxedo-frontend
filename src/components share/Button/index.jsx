import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

ButtonShare.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  subString: PropTypes.string,
  handleClick: PropTypes.func,
};

ButtonShare.defaultProps = {
  backgroundColor: "",
  title: "",
  subString: "",
  handleClick: null,
};

function ButtonShare(props) {
  const { backgroundColor, title, subString, handleClick } = props;
  const background = backgroundColor ? backgroundColor : "black";
  const [color, setColor] = useState(background);
  const titleButton = title ? title : "";
  const sub = subString ? subString : "Giao hàng tận nơi toàn quốc";

  function handleClickTo() {
    if (!handleClick) return;
    handleClick();
  }

  function handleHoverElement() {
    setColor("rgb(206, 25, 25)");
  }

  function handleMouseOver() {
    const backgroundColor =
      document.querySelector(".button--share").style.backgroundColor;
    if (backgroundColor !== "black") {
      setColor("black");
    }
  }
  return (
    <div>
      {subString ? (
        <button
          className="button--share"
          style={{ backgroundColor: color, border: color }}
          onClick={handleClickTo}
          onMouseEnter={handleHoverElement}
          onMouseLeave={handleMouseOver}
        >
          <span className="button-add-item-cart_title">{titleButton}</span>
          <span className="button-add-item-cart_sub">{sub}</span>
        </button>
      ) : (
        <button
          className="button--share"
          style={{ backgroundColor: color, border: color }}
          onClick={handleClickTo}
          onMouseEnter={handleHoverElement}
          onMouseLeave={handleMouseOver}
        >
          <span className="button-add-item-cart_title">{titleButton}</span>
        </button>
      )}
    </div>
  );
}

export default ButtonShare;
