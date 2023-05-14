import React from "react";
import { Input } from 'antd';

 const inputForm = (props) => {
  const {  
    label,
    type,
    id,
    value,
    onChange,
    error
  } = props;
  return (
    <div className="form-group">
        <Input
          type={type}
          value={value}
          onChange={onChange}
          className="form-control"
          id={id}
          placeholder={label}
        />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default inputForm;