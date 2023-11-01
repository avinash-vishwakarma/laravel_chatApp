import React, { useEffect, useState } from "react";

const Alert = ({ error, success }) => {
  // check for the error
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (error?.response?.data.message || success) {
      setShowAlert(true);
    }
  }, [error, success]);

  if (showAlert) {
    return (
      <div
        className={`alert custom-alert-1 alert-${
          success ? "success" : "danger"
        } alert-dismissible fade show`}
        role="alert"
      >
        <i className="bi bi-x-circle"></i>
        {error?.response?.data.message || success}
        <button
          className="btn btn-close position-relative p-1 ms-auto"
          type="button"
          onClick={setShowAlert.bind(null, false)}
        ></button>
      </div>
    );
  }

  return null;
};

export default Alert;
