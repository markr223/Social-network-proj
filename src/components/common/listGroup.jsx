import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

export default function ListGroup({
  dataList,
  id,
  currentItem,
  onChosenItem,
  label,
}) {
  return (
    <div className="list-group-container">
      <span className="list-group-title">{label}</span>
        {dataList.length ? dataList.map((item) => (
          <ul className="list-group">
            <Avatar
                key={id} 
                className={item !== currentItem ? "list-group-item-unselected" : "list-group-item-selected"}
                size="large" 
                icon={<UserOutlined />} 
                onClick={() => onChosenItem(item)}
            />
            <span className="list-group-item-name">{item.userName}</span>
          </ul>
        )) : ""}
    </div>
  );
}
