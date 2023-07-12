import React from "react";
import axios from "axios";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Popconfirm} from 'antd';
import {serverURI, defaultConfig} from "../../consts/consts";
import { toast } from "react-toastify";

export default function ListGroup({
  dataList,
  id,
  currentItem,
  onChosenItem,
  manageUsers,
  label,
  getAllUsers
}) {
  const handleRemoveUser = async (userId) => {
    try {
      await axios.post(
        serverURI + "/api/User/RemoveUser/" + userId,
        defaultConfig
      );
      toast.success("User removed");
      getAllUsers()
    }catch(ex) {
      toast.error(ex + ' Error with remove comment')
    }
  }
  return (
    <div className="list-group-container">
      <span className="list-group-title">{label}</span>
        {dataList.length ? dataList.map((item) => (
          <>
          <Button type="primary" ghost className={`${item.id === currentItem.id && "list-group-item-selected"} list-group`} onClick={() => onChosenItem(item)}>
            <Avatar
                key={id} 
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.id}`}
                size="large" 
                icon={<UserOutlined />} 
            />
            <span className="list-group-item-name">{item.userName}</span>
          </Button>
          {manageUsers && 
            <Popconfirm
            title="Delete the User"
            description="Are you sure to delete this User?"
            onConfirm={() => {handleRemoveUser(item.id)}}
            okText="Yes"
            cancelText="No"
          >
            <Button className="list-group-delete-user" type="primary" danger>
              x
            </Button>
            </Popconfirm>
            }
          </>
        )) : ""}
    </div>
  );
}
