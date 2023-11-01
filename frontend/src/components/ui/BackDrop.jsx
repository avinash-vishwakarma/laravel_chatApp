import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const BackDrop = ({ showBackDrop, onBackDropClick = () => {} }) => {
  useEffect(() => {
    console.log("show backdrop", showBackDrop);
  }, [showBackDrop]);

  if (showBackDrop) {
    return ReactDOM.createPortal(
      <div
        className="offcanvas-backdrop fade show"
        onClick={onBackDropClick}
      ></div>,
      document.querySelector("body")
    );
  }
  return "";
};

export default BackDrop;
