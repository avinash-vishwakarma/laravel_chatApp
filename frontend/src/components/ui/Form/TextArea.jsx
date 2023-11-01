import React, { useState } from "react";
const TextArea = ({
  title,
  name,
  cols = "30",
  rows = "10",
  placeholder,
  value,
}) => {
  const [textValue, setTextValue] = useState(value || "");
  const textChangeHandler = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div className="form-group mb-3">
      {title && (
        <label className="form-label" htmlFor={name}>
          {title}
        </label>
      )}
      <textarea
        className="form-control"
        id={name}
        name={name}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        onChange={textChangeHandler}
        value={textValue}
      ></textarea>
    </div>
  );
};

export default TextArea;
