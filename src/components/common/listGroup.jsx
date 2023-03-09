import React from "react";

export default function ListGroup({
  dataList,
  id,
  currentItem,
  onChosenItem,
  label,
  name,
}) {
  const classes = "list-group-item m-2 ";
  return (
    <div>
      <h3 className="m-2">{label}</h3>
      <ul className="list-group">
        {dataList.map((item) => (
          <li
            key={item[id]}
            className={item !== currentItem ? classes : classes + "active"}
            onClick={() => onChosenItem(item)}
          >
            {item[name]}
          </li>
        ))}
      </ul>
    </div>
  );
}
