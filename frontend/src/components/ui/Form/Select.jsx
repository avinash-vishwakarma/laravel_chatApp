import React from "react";

const Select = ({ options, title = false, selected, name }) => {
  return (
    <div class="form-group">
      {title && (
        <label class="form-label" for={name}>
          {title}
        </label>
      )}
      <select class="form-select" id={name} name={name} defaultValue={selected}>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
