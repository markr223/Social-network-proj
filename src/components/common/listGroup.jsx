import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';

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
          <Button type="primary" ghost className={`${item.id === currentItem.id && "list-group-item-selected"} list-group`} onClick={() => onChosenItem(item)}>
            <Avatar
                key={id} 
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.id}`}
                size="large" 
                icon={<UserOutlined />} 
            />
            <span className="list-group-item-name">{item.userName}</span>
          </Button>
        )) : ""}
    </div>
  );
}
