import React from "react";
import BackDrop from "./BackDrop";
import ReactDOM from "react-dom";

const Modal = ({ children, show, onCloseHandler = () => {} }) => {
  if (show) {
    return ReactDOM.createPortal(
      <div
        className="modal fade show"
        id="bootstrapBasicModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
        onClick={onCloseHandler}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="modal-content">{children}</div>
        </div>
        <BackDrop showBackDrop={show} onBackDropClick={onCloseHandler} />
      </div>,
      document.getElementById("modal")
    );
  }
  return "";
};

const Header = ({ onCloseHandler = () => {}, children }) => {
  return (
    <div className="modal-header">
      <h6 className="modal-title" id="exampleModalLabel">
        {children}
      </h6>
      <button
        className="btn btn-close p-1 ms-auto"
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={onCloseHandler}
      ></button>
    </div>
  );
};

const Body = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

const Footer = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
};

export default Object.assign(Modal, {
  Header,
  Body,
  Footer,
});
