import React, { useEffect, useRef, useState } from "react";

function randomcColor(currentColor) {
  const COLOR_LIST = ["#FFE3A3", "black"];

  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * 2);
  }
  //   console.log(COLOR_LIST[newIndex]);
  return COLOR_LIST[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState("black");
  const colorRef = useRef("black");

  //Change color every 1 second
  useEffect(() => {
    const colorInterval = setInterval(() => {
      // console.log("First color: ", color);
      // console.log("Change color:", colorRef.current);
      const newColor = randomcColor(colorRef.current);
      setColor(newColor);
      colorRef.current = newColor;
    }, 1500);
    return () => {
      clearInterval(colorInterval);
    };
  }, []);
  return color;
}

export default useMagicColor;
