import React from "react";

export default function Input({
  label,
  type,
  id,
  value,
  onChange,
  error,
  inputTextArea,
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {inputTextArea ? (
        <textarea
          type={type}
          value={value}
          onChange={onChange}
          className="form-control"
          id={id}
          placeholder={label}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="form-control"
          id={id}
          placeholder={label}
        />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
